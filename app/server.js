/*global */
/**
 *
 * //flow
 */

"use strict";

require('css-modules-require-hook/preset');

const {router: api, routePrefix: apiRoutePrefix} = require('~/app/api');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const EnvEnum = require('~/app/lib/EnvEnum');
const express = require('express');
const {createEngine: createReactViewsEngine} = require('express-react-views');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const uuid = require('node-uuid');
const {router: web, routePrefix: webRoutePrefix} = require('~/app/web');

const ENV = process.env.NODE_ENV;
const app = express();

// middleware
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// logging
(() => {
  const logDirectory = path.join(__dirname, 'log');
  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  const getFileName = () => {
    const envString = ENV === EnvEnum.PROD ? '' : '.' + ENV;
    return envString + '.access.log';
  };

  // create a rotating write stream
  const accessLogStream = rfs(getFileName, {
    compress: true,
    interval: '1d', // rotate daily
    // interval: '10s', // rotate every 10 seconds (for testing)
    path: logDirectory,
    rotate: 14,
  });

  morgan.token('id', req => req.id);

  // add the token
  app.use((req, res, next) => {
    req.id = uuid.v4();
    next();
  });

  // setup the log format and create the logger
  const logFormat = ENV === !EnvEnum.DEV
    ? ':id :remote-addr - :remote-user [:date[clf]] ":method :url ' +
    'HTTP/:http-version" :status :res[content-length] ":referrer" ' +
    '":user-agent"'
    : ':id :method :url :status :response-time ms - :res[content-length]';
  app.use(morgan(logFormat, {stream: accessLogStream}));
})();
// HELMET FOR SECURITY

// view engines
const viewExtension = ENV !== EnvEnum.DEV ? 'js' : 'jsx';
app.set('views', __dirname + '/web/views');
app.set('view engine', viewExtension);
app.engine(viewExtension, createReactViewsEngine({
  beautify: false,
  transformViews: true,
}));

// static assets
if (ENV === EnvEnum.DEV) {
  console.log('adding DEV only meta assets');
  app.use('/meta/coverage', express.static(__dirname + '/../reports/coverage/lcov-report'));

  console.log('serving js from Webpack middleware');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('~/webpack.config')(ENV, {mode: 'development'});
  webpackConfig.mode = 'development';
  app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use('/img', express.static(__dirname + '/../app/static_src/img'));
} else {
  app.use(express.static(__dirname + '/../static'));
}

// sub apps
app.use(apiRoutePrefix, api);
app.use(webRoutePrefix, web);

// export
module.exports = function(port = 3000, afterOpen) {
  return app.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    if (ENV !== EnvEnum.TEST) {
      console.info(`running ${ENV} on port ${port}`);
    }
    if (typeof afterOpen === 'function') {
      afterOpen();
    }
  });
}
