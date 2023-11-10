const resolvePlugin = require('./resolver/resolvePlugin');
const resolveServer = require('./resolver/resolveServer')
const resolveDevSever = require('./resolver/resolveDevServer.js')
const {resolveLocalLibMap} = require('./resolver/resolveLocalLibMap.js')
const {isMultiEntry, isWebpack5, ZZ_PLUGIN_NAME, isDevelopment} = require("./utils/index");


class WebpackPortCollector {
  constructor(options) {
    resolvePlugin(options);
    this.options = options || {};
  }

  apply(compiler) {
    //提前配置变量
    isDevelopment(compiler.options)
    isWebpack5(compiler)
    isMultiEntry(compiler.options)

    const hooks = compiler.hooks;
    hooks.environment.tap(ZZ_PLUGIN_NAME, async () => {
      resolveDevSever(compiler, this.iotions.filename)
      await resolveServer()
    });

    hooks.done.tapPromise(ZZ_PLUGIN_NAME, function (stats) {
      return resolveLocalLibMap(stats)
    });
  }
}

module.exports = WebpackPortCollector;
