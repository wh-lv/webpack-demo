const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * entry: 
 *  1. string 单入口
 *      打包形成一个chunk
 *  2. array 多入口
 *      打包形成一个chunk
 *      --> 在HMR功能中让html热更新生效
 *  3. object 多入口
 *      有几个文件就形成几个chunk，chunk的名称为 key
 *      --> 特殊用法
 *      index: [],
 *      add: './src/add.js'
 */
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [ new HtmlWebpackPlugin() ],
    mode: 'development'
}