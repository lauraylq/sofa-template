process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// eslint-disable-next-line
const express = require('express');
const webpack = require('webpack');
const path = require('path');

// eslint-disable-next-line
const proxy = require('http-proxy-middleware');
// eslint-disable-next-line
const webpackHotMiddleware = require('webpack-hot-middleware');
// eslint-disable-next-line
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../config/webpack.dev.config');

const app = express();

app.use('/test', proxy({ target: 'http://gz-loc-development00.gz.sftcwl.com:7300/mock/5be14fcfa9b82994f6c1ec9c/sofa', changeOrigin: true }));

const compiler = webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  logLevel: 'warn',
  publicPath: '/',
  silent: true,
  stats: 'errors-only',
});

const middleware = webpackDevMiddleware(compiler, devServerOptions);
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

const fs = middleware.fileSystem;

app.get('*', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

app.listen(8081, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8081');
});
