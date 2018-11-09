import { DEFAULT_LOCALE } from 'utils/constants';
import store from '../index';
import { translationMessages } from '../i18n';

let lang = DEFAULT_LOCALE;
setTimeout(() => {
  const state = store.getState();
  lang = state.get('global').get('lang');
  store.subscribe(() => {
    lang = state.get('global').get('lang');
  });
}, 3000);
function getText(key) {
  return translationMessages[lang][`sofa.config.${key}`];
}
const menu = [
  {
    key: 'homePage',
    icon: 'home',
    text: getText('homePage'),
  },
  {
    key: 'system',
    text: getText('system'),
    icon: 'setting',
    children: [
      {
        key: 'userManage',
        text: '用户管理',
      },
      {
        key: 'print',
        text: '打印示例',
      },
    ],
  },
  {
    key: 'example',
    text: getText('example'),
    icon: 'setting',
    children: [
      {
        key: 'toolbarTableModal',
        text: getText('toolbarTableModal'),
      },
      {
        key: 'print',
        text: '打印示例',
      },
    ],
  },
];
function getMap(menuData) {
  let obj = {};
  menuData.forEach((element) => {
    obj[element.key] = element.key;
    if (element.children) {
      const subMap = getMap(element.children);
      obj = Object.assign({}, obj, subMap);
    }
  });
  return obj;
}
export const menuMap = getMap(menu);
export default menu;
