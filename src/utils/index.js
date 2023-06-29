const path = require('path');
const homeOrTemp = require('home-or-tmp');
const fs = require("fs-extra");
const log = require('../utils/log')
const fswin = require('fswin')
const lodash = require('lodash')

let WPM_PKG_NAME = null

//缓存包名
function setPkgName(name) {
  WPM_PKG_NAME = name
}

//在电脑的用户目录下，创建一个.wpm隐藏文件夹备用
function getWpmInHomeDirPath() {
  let rootPath = path.resolve(homeOrTemp, '.wpm/')
  fs.ensureDirSync(rootPath)
  if (isWin()) {
    log.info('The platform is windows')
    fswin.setAttributesSync(rootPath, {IS_HIDDEN: true});
  }
  let configFilePath = path.resolve(rootPath, 'configs.json')
  if (fs.pathExistsSync(configFilePath) === false) {
    fs.ensureFileSync(configFilePath)
    fs.writeJsonSync(configFilePath, {})
  }
  return rootPath
}


//判断是不是windows
function isWin() {
  return /^win/i.test(process.platform);
}
