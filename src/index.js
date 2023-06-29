const resolvePlugin = require('./resolver/resolvePlugin');

class WebpackPortCollector {
  constructor(options) {
    resolvePlugin(options);
    this.options = options || {};
  }
  apply(){

  }
}
