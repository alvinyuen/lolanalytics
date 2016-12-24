'use strict';

var path = require('path');
var logMiddleware = require('volleyball');

var rootPath = path.join(__dirname, '../../');
var indexPath = path.join(rootPath, './client/index.html');
// var faviconPath = path.join(rootPath, './public/favicon.ico');
// var env = require(path.join(rootPath, './server/env'));

const config = require(path.join(rootPath, './env.json'));

module.exports = function (app) {
  app.set('projectRoot', rootPath);
  app.set('indexHTMLPath', indexPath);
  app.set('riotApiKey', config.riotApiKey);
};