/*
 * @Date: 2022-07-06 17:51:26
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-07-11 11:52:25
 * @FilePath: /Blogs/BlogsClient/user-webpack-config/webpack.prod.config.js
 * @Description:
 */
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
const path = require('path');
//一个用于生成资产清单的Webpack插件。 webpack及其插件似乎“知道”应该哪些文件生成。答案是，通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
// react loadable
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { resolve } = path;
let {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = ''
} = process.env; // 环境参数
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

const cacheLoader = (happypackId) => {
  return isEnvDevelopment
    ? [
        `happypack/loader?id=${happypackId}&cacheDirectory=true`,
        'thread-loader',
        'cache-loader'
      ]
    : ['thread-loader', `happypack/loader?id=${happypackId}`];
};

// 用户自定义webpack
module.exports = {
  module: {
    rules: []
  },

  plugins: [
    //一个用于生成资产清单的Webpack插件。 webpack及其插件似乎“知道”应该哪些文件生成。答案是，通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。
    new WebpackManifestPlugin(),
    // react loadable
    new ReactLoadablePlugin({
      filename: path.join(process.cwd(), '/dist/react-loadable.json')
    })
  ]
};
