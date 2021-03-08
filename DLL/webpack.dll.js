/**
 * 使用 dll 对某些库（第三方库：jquery、react、vue...）进行单独打包
 *  webpack --config webpack.dll.js
 */

const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        // 最终打包生成的[name]是‘jquery’
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]', // 打包的库里面向外暴露出去的的内容的名字
    },
    plugins: [
        // 帮我们打包生成一个manifest.json文件，提供jquery映射（当前只打包了jquery）
        new webpack.DllPlugin({
            name: '[name]_[hash]', // 映射库暴露的内容的名字
            path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
        })
    ],
    mode: 'production'
}