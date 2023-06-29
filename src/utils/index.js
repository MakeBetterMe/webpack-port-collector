const path = require('path');
const homeOrTemp = require('home-or-tmp');
const fs = require("fs-extra");
const log = require('../utils/log');
const fswin = require('fswin');
const find = require("find-process");
const lodash = require('lodash');

let ZZ_PROJECT_NAME = null
let IS_DEVELOPMENT = null
const ZZ_PLUGIN_NAME = 'WebpackPortCollector'
const WPM_UNIQUE_CHILD_PROCESS_ID = 'WPM_UNIQUE_CHILD_PROCESS_ID'
let IS_WEBPACK5 = null
let ZZ_DEV_SERVER_URL = null
let IS_MULTIENTRY = null

function isWebpack5(compiler) {
  if (IS_WEBPACK5 == null && compiler && compiler.webpack) {
    log.info(`compiler.webpack.version->${compiler.webpack.version}`)
    IS_WEBPACK5 = compiler.webpack && compiler.webpack.version >= '5';
  }
  return IS_WEBPACK5 || false
}

//缓存包名
function setPkgName(name) {
  ZZ_PROJECT_NAME = name
}

function getPkgName() {
  return ZZ_PROJECT_NAME
}


//判断是不是windows
function isWin() {
  return /^win/i.test(process.platform);
}

//检测是不是开发模式
function isDevelopment(options) {
  if (IS_DEVELOPMENT === null && options){
    if (!options.mode){
      log.error('Please specify the webpack mode, the development environment is development...')
      process.exit()
    }
    IS_DEVELOPMENT = options.mode === 'development'
  }
  return IS_DEVELOPMENT || false
}

//找到目前开启server的进程
async function findExistServerProcess() {
  const list = await find('name', 'node')
  if (list.length > 0) {
    const found = list.find(o => {
      return o.cmd.includes(WPM_UNIQUE_CHILD_PROCESS_ID)
    })
    if (found) {
      log.info('The project debug child_process is exist...')
      log.info(`The project running child_process_id is ${found.pid}`)
      return found
    }
  }
  return null
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

function getWpmLocalConfigsFilePath() {
  const rootPath = getWpmInHomeDirPath()
  return path.resolve(rootPath, './configs.json')
}

function getValueInRootConfigs(key) {
  const configs = require(getWpmLocalConfigsFilePath())
  return configs[key]
}

//开发环境下目前的url，方便拼接地址给维佳的面板
function setDevServerUrl(url) {
  ZZ_DEV_SERVER_URL = url
}

function getDevServerUrl() {
  return ZZ_DEV_SERVER_URL
}

function isMultiEntry(options) {
  if (isWebpack5()){
    if (IS_MULTIENTRY == null && options) {
      IS_MULTIENTRY = Object.keys(options.entry).length > 1
    }
  }else{ //webpack版本小于5
    if (IS_MULTIENTRY == null && options) {
      if (lodash.isArray(options.entry)){//数组形式也是单入口
        IS_MULTIENTRY = false
      }else if (lodash.isPlainObject(options.entry) && Object.keys(options.entry).length > 1){
        IS_MULTIENTRY = true
      }
    }
  }
  return IS_MULTIENTRY || false
}

module.exports = {
  ZZ_PLUGIN_NAME,
  setPkgName,
  getWpmInHomeDirPath,
  isDevelopment,
  findExistServerProcess,
  WPM_UNIQUE_CHILD_PROCESS_ID,
  getPkgName,
  getValueInRootConfigs,
  isWebpack5,
  getDevServerUrl,
  isMultiEntry
}
