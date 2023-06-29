const fs = require('fs-extra')
const path = require("path");
const log = require('../utils/log')
const {setPkgName} = require('../utils/index')
const {getWpmInHomeDirPath} = require("../utils/index");

let projectName = null

function resolvePlugin(options = {}) {
  //先把脚本依赖的本地目录生成下
  getWpmInHomeDirPath()
  if (options.projectName){
    projectName = options.projectName
  }else{
    const jsonPath = path.resolve(process.cwd(),'package.json')
    if (fs.pathExistsSync(jsonPath)){
      projectName = require(jsonPath).name
    }
  }
  if (projectName == null){
    throw 'No available project name was detected, please set the project name parameter in the WebpackPortCollector plugin options, the field is projectName'
  }else{
    setPkgName(projectName)
    log.info(`The detected project are named:${projectName}`)
  }
}


module.exports = resolvePlugin
