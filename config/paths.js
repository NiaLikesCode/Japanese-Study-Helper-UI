'use strict';

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appSrc: resolveApp('src'),
    appHtml: resolveApp('src/index.html'),
    appBuild: resolveApp('dist'),
    appNodeModules: resolveApp('node_modules'),
    appIndexJs: resolveApp('src/index.js')
};