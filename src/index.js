const resolvePlugin = require('./resolver/resolvePlugin');
const resolveServer = require('./resolver/resolveServer')
const {resolveLocalLibMap} = require('./resolver/resolveLocalLibMap.js')
const {ZZ_PLUGIN_NAME} = require("./utils/index");

class WebpackPortCollector {
  constructor(options) {
    resolvePlugin(options);
    this.options = options || {};
  }
  apply(compiler){
    const hooks = compiler.hooks;
    hooks.environment.tap(ZZ_PLUGIN_NAME, async function () {
      await resolveServer()
    });

    hooks.done.tapPromise(ZZ_PLUGIN_NAME, function (stats) {
      return resolveLocalLibMap(stats)
    });
  }
}

module.exports = WebpackPortCollector;
