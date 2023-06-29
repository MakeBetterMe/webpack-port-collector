<div align="center">
  <h1>webpack-port-collector</h1>
  <p>Plugin that collects projects started with webpack</p>
</div>

<h2 align="center">Install</h2>

```bash
  npm i --save-dev webpack-port-collector
```

```bash
  yarn add --dev webpack-port-collector
```

This is a [webpack](http://webpack.js.org/) plugin that collects projects started with webpack on your computer.Here are some scenarios that come to mind:
1. You can monitor the started project in the cli project, which is convenient for starting, pausing, or restarting.
2. If you are debugging many atomic components and the components are scattered in different projects, you can use this plugin for unified management.
3. Welcome to propose more scenarios in issuse to make the plugin more general


<h2 align="center">Usage</h2>
**webpack.config.js**
```js
const WebpackPortCollector = require('webpack-port-collector')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
     new WebpackPortCollector()
  ]
}
```

<h2 align="center">Options</h2>

| <div style="width:400px">key</div> | <div style="width:400px">desc</div>    |
|------------------------------------|:---------------------------------------|
| projectName                        | the project name that had been started |

![avatar](https://image.soudlink.com/web/1688028396001.png)
After starting the project, you will see the log of this plug-in. The two important ports exposed are websocket port and http port. The usage is as follows:
1. The ports in the example below are output on plugin startup
2. You can get a list of all webpack projects started locally via the http port
   ![avatar](https://image.soudlink.com/web/1688028406257.png)


3. You can get a list of locally started projects in real time by listening to the websocket,When a project is started or terminated, websocket will send a message
   ![avatar](https://image.soudlink.com/web/1688028415034.png)


