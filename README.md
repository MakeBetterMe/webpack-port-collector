# webpack-port-collector
[<a href="./README.md">简体中文</a>  | <a style="marign-left:20px" href="./README-EN.md">English</a>]()
<br/>
<br/>
这是一个  [webpack](http://webpack.js.org/)  插件，它收集电脑上使用webpack启动的项目。以下是一些想到的场景：

1. 可以在cli项目中监控已启动的项目，方便启动、暂停或重启。
2. 如果你正在调试很多原子组件，并且组件分散在不同的项目中，可以使用这个插件进行统一管理。
3. 欢迎在issues中提出更多场景，让插件更加通用

## 安装
```
npm i --save-dev webpack-port-collector
```
```
yarn add --dev webpack-port-collector
```

## 使用
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
## 参数
| **属性**      | **是否必填** | **描述**                                                                        |
|-------------|----------|-------------------------------------------------------------------------------|
| projectName | false    | 已启动的项目名称,默认为package.json中的名称|

<img src="https://maketea.oss-cn-shanghai.aliyuncs.com/cms/jzkb/read_img.png" width="500" align=center style="display: block;margin-bottom:20px"/>
启动项目后，你会看到这个插件的日志。暴露的两个重要端口是 websocket 端口和 http 端口。用法如下：

1. 下例中的端口是插件启动时输出
2. 您可以通过http端口获取本地启动的所有webpack项目的列表。<br/> <img src="https://maketea.oss-cn-shanghai.aliyuncs.com/cms/jzkb/read_img_1.png" width="500" align=center style="display: block;margin-bottom:20px"/>
3. 通过监听websocket可以实时获取本地启动的项目列表，当项目启动或终止时，websocket会发送消息。<br/><img src="https://maketea.oss-cn-shanghai.aliyuncs.com/cms/jzkb/read_img_2.png" width="500" align=center style="display: block;margin-bottom:20px"/>
