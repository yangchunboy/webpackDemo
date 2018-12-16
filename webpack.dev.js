const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map', // 报错时方便调试
  mode: 'development', // 设置当前模式为开发模式
  devServer: { // 
    inline: true, // 在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
    hot: true, // 启用 webpack 的模块热替换特性
    openPage: '', // 当打开浏览器显示的页面
    publicPath: '', // 此路径下的打包文件可在浏览器中访问
    port: 3000, // 当前运行的端口
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    overlay: { // 展示编译的错误和警告
      warnings: true,
      errors:true
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.HotModuleReplacementPlugin() // 当开启 HMR 的时候使用该插件会显示模块的相对路径
  ]
});