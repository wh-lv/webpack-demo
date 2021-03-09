const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 
 */
module.exports = {
    entry: './src/js/index.js',
    output: {
        // 文件名称：（可指定目录）
        filename: '[name].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        // // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
        // // 一般用于生产环境
        // publicPath: '/',
        // chunkFilename: '[name]_chunk.js', // 非入口chunk的名称
        // library: '[name]', // 整个库向外暴露的变量名
        // // libraryTarget: 'window', // 变量名添加到哪个上 browser
        // // libraryTarget: 'global', // node
        // libraryTarget: 'commonjs', // commonjs方式暴露，export
    },
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/,
                // 多个loader
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [ new HtmlWebpackPlugin() ],
    mode: 'development',
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名：可以简写路径（但没有提示）
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略文件路径的后缀名
        extensions: ['.js', '.json'],
        // 告诉 webpack 解析模块是去找哪个目录
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
    }
}