const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './src/main.js',// 编译js的入口文件
    './src/style.less' // 编译less的入口文件
  ],
  output: { // 编译完成的js会放在dist文件夹下命名为bundle.js
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 每次编译先删除旧的dist文件夹
    new HtmlWebpackPlugin({
        title: 'Production', // 用来生成页面的 title 元素
        inject: true, // 注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中
        template: './src/index.html', // 模板文件路径
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 3 versions', '> 1%']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer({
                browsers: ['last 3 versions', '> 1%']
              })
            ]
          }
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    ]
  }
};