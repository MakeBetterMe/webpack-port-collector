# webpack-port-collector
<a href="./README.md">简体中文</a>  | <a style="marign-left:20px" href="./README-EN.md">English</a>
<br/>
<br/>
This is a [webpack](http://webpack.js.org/) plugin that collects projects started with webpack on your computer.Here are some scenarios that come to mind:

1. You can monitor the started project in the cli project, which is convenient for starting, pausing, or restarting.
2. In the micro-frontend scenario, you can use this plug-in for unified management when debugging queue sub-applications locally.
3. If you are debugging many atomic components and the components are scattered in different projects, you can use this plugin for unified management.
4. Welcome to propose more scenarios in issuse to make the plugin more general


## Install
```
npm i --save-dev webpack-port-collector
```
```
yarn add --dev webpack-port-collector
```

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
     new WebpackPortCollector({
        projectName:'webpack-demo'
     })
  ]
}
```
## Options
| **props** | **required** | **desc**|
| --- |--------------|-----------------------------------------|
| projectName | false        | the project name that had been started,The default is the name in package.json|

<img src="https://maketea.oss-cn-shanghai.aliyuncs.com/cms/jzkb/read_img.png" width="500" align=center style="display: block;margin-bottom:20px"/>
After starting the project, you will see the log of this plug-in. The two important ports exposed are websocket port and http port. The usage is as follows:

1. The ports in the example below are output on plugin startup
2. You can get a list of all webpack projects started locally via the http port <img src="https://maketea.oss-cn-shanghai.aliyuncs.com/cms/jzkb/read_img_1.png" width="500" align=center style="display: block;margin-bottom:20px"/>
3. You can get a list of locally started projects in real time by listening to the websocket,When a project is started or terminated, websocket will send a message <img src="https://maketea.oss-cn-shanghai.aliyuncs.com/cms/jzkb/read_img_2.png" width="500" align=center style="display: block;margin-bottom:20px"/>
