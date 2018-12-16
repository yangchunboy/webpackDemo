# webpackDemo
由于react和vue官方提供的脚手架想要增加一些额外的需求改起来太麻烦了，于是我就自己搭了一个webpack的例子，这个例子主要实现了下面的功能（在文章最后也会附上我自己搭建的一个react的脚手架）：
1. 支持es6语法
2. 支持css和less的编译
3. 支持autoprefixer
4. 支持开发时代码的热更新
5. 支持代码的压缩打包
##简单介绍一下webpack的几个概念

webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
- ####入口(entry)
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的
- ####出口(output)
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程。
- ####loader
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
- ####插件(plugins)
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。[插件接口](https://webpack.js.org/plugins/)功能极其强大，可以用来处理各种各样的任务。
- ####模式(mode)
通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化

##文件目录结构
首先我把代码的Git路径（见下）各位可以先clone下来体验一下，先npm install然后运行npm run dev就可以体验。
[webpackdemo源码的下载和体验地址](https://github.com/yangchunboy/webpackDemo)
这里讲解一下当前的文件夹目录结构
```
dist/                            #build后的代码目录
src/                             #源码的文件夹
  index.html                     #html的模板文件
  main.js                        #代码的入口文件
  style.less                     #less的入口文件
  style.css                      #css文件
postcss.config.js                #postcss的配置文件（这里是配置autoprefixer）
webpack.common.js                #用于存放和开发和发布都需要的webpack配置文件
webpack.dev.js                   #用于存放开发需要的webpack配置文件
webpack.prod.js                  #用于存放发布需要的webpack配置文件（压缩代码等）
```
## 通用的一些配置

入口和出口以及插件的一些解释
```
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
```
##开发和发布需要的一些单独的配置
开发过程主要是要便于调试，同时代码的热更新以及调试的方便
[了解devServer更多参数（中文）](https://www.webpackjs.com/configuration/dev-server/)
[了解devServer更多参数（官网）](https://webpack.js.org/configuration/dev-server/)
```
// 开发环境下的配置
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

// 生产环境下的配置
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
```
##其他插件的配置
这里主要是通过loader来实现的，loader功能非常强大。这里只介绍我在demo里使用到的一些loader。
[官网常用的一些loader](https://webpack.js.org/loaders/)
1. 支持es6的语法
使用的是[babel-loader](https://webpack.js.org/loaders/babel-loader/)，具体代码见下：
```
// 安装babel-loade
npm install -D babel-loader @babel/core @babel/preset-env webpack
// 配置
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}

```
2. css和less支持和autoprefixer
这里用到了[style-loader](https://webpack.js.org/loaders/style-loader/)、[css-loader](https://webpack.js.org/loaders/css-loader/)、[postcss-loader](https://webpack.js.org/loaders/postcss-loader/)、[less-loader](https://webpack.js.org/loaders/less-loader/)和[autoprefixer](https://github.com/postcss/autoprefixer)。具体配置见代码（css其实也可以进行优化参考[MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)，有需要的同学可以参考文档优化）：
```
//安装
npm install --save-dev style-loader css-loader postcss-loader less-loader autoprefixer

// 以下css的webpack配置，同时需要将编译的css引入到js才会进行编译
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
// less的配置,同时要在webpack的entry配置less的入口文件
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

// autoprefixer需要新建postcss.config.js同时按下面配置
  module.exports = {
    plugins: [
      require('autoprefixer')
   ]
  }
```
## 自己封装的一个react脚手架
目前只封装了一个react的，vue的会在后面我会更新上来.
[基于webpack的react脚手架](https://github.com/yangchunboy/reactApp)
## 参考文档
- [webpack官网](https://webpack.js.org/)
- [webpack中文（中文版的仅供参考，以官网为主）](https://www.webpackjs.com/)
- [webpack官网指南](https://webpack.js.org/guides/)
- [webpack官网api](https://webpack.js.org/api/)
- [webpack官网loaders](https://webpack.js.org/loaders/)
- [webpack官网插件](https://webpack.js.org/plugins/)
- [autoprefixer](https://github.com/postcss/autoprefixer)

##最后如果对本文章有疑问或者文章有错误欢迎在评论区指出
