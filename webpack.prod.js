const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map', // 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它
  mode: 'production', // 设置当前模式为生产环境
  plugins: [
    new UglifyJSPlugin({ // 代码混淆
      sourceMap: true,
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
      }
    })
  ]
});