import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

function getCrumbItem(path, menuMap, subMap) {
  debugger
  const pathArray = path.split('/').filter(item => Boolean(item));
  const crumbArr = [];
    return pathArray.map((item, index) => {
      let a = '';
        if (menuMap[item]) {
            a = {
                key: item,
                text: menuMap[item],
                path: index === 0 ? './' : pathArray.slice(1, index + 1).join('/'),
            };
            console.log(index, a);
        }
        return a;
    });
  return crumbArr;
}

// eslint-disable-next-line
export default class Crumb extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { history } = nextProps;
    if (history.location.pathname !== this.path) {
      return true;
    }
    return false;
  }

  render() {
    const { history, mainMap, subMap } = this.props;
    this.path = history.location.pathname;
    const items = getCrumbItem(this.path, mainMap, subMap);

    return (
        <Breadcrumb className="breadCrumb">
            {
                items.map((item, index) => (
                    <Breadcrumb.Item key={item.key}>
                         {item.path && index !== 0 && index !== items.length -1 ?
                            <Link to={item.path}>{item.text}</Link> :
                            item.text
                        }
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    );
  }
}

Crumb.propTypes = {
  history: PropTypes.any.isRequired,
  mainMap: PropTypes.object.isRequired,
  subMap: PropTypes.object,
};
