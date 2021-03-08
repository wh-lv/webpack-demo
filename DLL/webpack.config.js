const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
            // minify: {
            //     collapseWhitespace: true,
            //     removeComments: true
            // }
        }),
        // 告诉webpack那些库不参与打包，同时使用时的名称也得改
        new Webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        // 将某个文件打包输出，并在html中自动引入~
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    mode: 'production'
}