// import * as fs from 'fs'
// import * as path from 'path'
// import * as webpack from 'webpack'
// import routerList from './router/index'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import routerList from './router/index'
const cookie = {
  value: ''
}
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const routerList = require('./router/index')
// console.log(routerList)
// const NODE_ENV = (process as any).NODE_ENV
const NODE_ENV = process.env.NODE_ENV
module.exports = {
  mode: NODE_ENV,
  // sourcemap: 'cheap-module-eval-source-map',
  devtool: 'eval-cheap-module-source-map',
  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry
      entries[dir] = {
        filename: dir + '/' + dir + '.js',
        import: entry

        // hot: 'webpack/hot/dev-server.js',
        // // Dev server client for web socket transport, hot and live reload logic
        // client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
      }
    }
    entries = {
      ...entries,
      hot: 'webpack/hot/dev-server.js',
      // Dev server client for web socket transport, hot and live reload logic
      client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
    }
    console.log(entries)
    return entries
  }, {}),
  // entry: path.resolve(__dirname, './base/app.ts'),
  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
    // fallback: {
    //   util: require.resolve('util'),
    //   path: require.resolve('path-browserify'),
    //   crypto: require.resolve('crypto-browserify'),
    //   zlib: require.resolve('browserify-zlib'),
    //   stream: require.resolve('stream-browserify'),
    //   https: require.resolve('https-browserify'),
    //   http: require.resolve('stream-http'),
    //   url: require.resolve('url'),
    //   vm: require.resolve('vm-browserify')
    // },
    // fallback: {
    //   util: false,
    //   path: false,
    //   crypto: false,
    //   zlib: false,
    //   stream: false,
    //   https: false,
    //   http: false,
    //   url: false,
    //   vm: false
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html', //需要放打包文件的html模板路径
      filename: 'index.html',
      inject: false
    }),
    ...fs
      .readdirSync(__dirname)
      .map(dir => {
        const fullDir = path.join(__dirname, dir)
        console.log(__dirname, dir, '**************************')
        if (!dir.includes('.') && dir !== 'router') {
          return new HtmlWebpackPlugin({
            template: fullDir + '/index.html', //需要放打包文件的html模板路径
            filename: dir + '/index.html',
            chunks: [dir]
          })
        }
      })
      .filter(item => item)
  ],
  devServer: {
    liveReload: true,
    static: path.join(__dirname, '/dist/'),
    compress: true,
    port: 9005,
    client: {
      logging: 'info'
    },
    onBeforeSetupMiddleware: function(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      // 自动注册相应接口
      routerList.forEach(item => {
        item(devServer.app)
      })
      // devServer.app.post('/base/post', function(req, res) {
      //   debugger
      //   res.json({ custom: 'response' })
      // })
    },
    hot: false,
    proxy: {
      '/api': {
        // target: 'http://10.20.10.47:8080',
        // target: 'http://10.30.2.69:8080',
        // target: 'http://10.20.10.47:8080',
        // target: 'http://10.30.2.9:8080',
        // http://10.30.2.9:8080/swagger-ui.html
        // target: 'http://10.30.2.41:8080',
        // target: 'http://10.30.2.75:8080',
        target: 'http://localhost:9005',
        // target: 'http://10.30.2.70:8080',
        // target: 'http://10.30.2.69:8080',
        // target: 'http://10.30.2.70:8080',
        changeOrigin: true,
        headers: {
          Cookie:
            'ownership=2P01; orgName=%E5%B7%A5%E5%95%86%E5%AE%9D%E9%B8%A1%E6%B5%8B%E8%AF%95; SESSION=22d6f254-6cd9-4e58-b66e-b1101d841f72; userName=baojiqiang; userPassword=Z3NoMTIzNDU2IQ%3D%3D; name=%E5%AE%9D%E9%B8%A1%E5%BC%BA; loginName=baojiqiang',
          cccc: 111111
        }
      }
    }
  }
  // target: 'web',
  // optimization: {
  //   moduleIds: 'named'
  // }
}
