# webpack-port-collector
Plugin that collects projects started with webpack
## Install
```
npm i --save-dev webpack-port-collector
```
```
yarn add --dev webpack-port-collector
```
This is a [webpack](http://webpack.js.org/) plugin that collects projects started with webpack on your computer.Here are some scenarios that come to mind:

1. You can monitor the started project in the cli project, which is convenient for starting, pausing, or restarting.
2. If you are debugging many atomic components and the components are scattered in different projects, you can use this plugin for unified management.
3. Welcome to propose more scenarios in issuse to make the plugin more general
## Usage
**webpack.config.js**
```
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
## Options
| **key** | **desc** |
| --- | --- |
| projectName | the project name that had been started |

![image.png](https://cdn.nlark.com/yuque/0/2023/png/413251/1688028790318-dcb8aa65-0f18-4636-97cd-eb873b4e422d.png#averageHue=%230b0d14&clientId=u54d494a3-e6a1-4&from=paste&id=u90331f88&originHeight=741&originWidth=997&originalType=url&ratio=2&rotation=0&showTitle=false&size=805599&status=done&style=none&taskId=u3e123db9-02fe-4020-8420-9f47fb4f629&title=) After starting the project, you will see the log of this plug-in. The two important ports exposed are websocket port and http port. The usage is as follows:

1. The ports in the example below are output on plugin startup
2. You can get a list of all webpack projects started locally via the http port ![image.png](https://cdn.nlark.com/yuque/0/2023/png/413251/1688028789630-e28c1c27-78c2-47a8-8b09-caccfd923c3a.png#averageHue=%23cdcdd2&clientId=u54d494a3-e6a1-4&from=paste&id=u19fcd592&originHeight=318&originWidth=818&originalType=url&ratio=2&rotation=0&showTitle=false&size=53052&status=done&style=none&taskId=u5b5522a4-1fe9-48eb-b1bd-466f83401e7&title=)
3. You can get a list of locally started projects in real time by listening to the websocket,When a project is started or terminated, websocket will send a message ![image.png](https://cdn.nlark.com/yuque/0/2023/png/413251/1688028789697-94414979-6f84-4c25-8a60-3202b2436c19.png#averageHue=%23d6d7db&clientId=u54d494a3-e6a1-4&from=paste&id=u1477d0da&originHeight=853&originWidth=1312&originalType=url&ratio=2&rotation=0&showTitle=false&size=153819&status=done&style=none&taskId=uac4d3e4a-60d0-42ae-91d4-6a3bdf4da87&title=)
