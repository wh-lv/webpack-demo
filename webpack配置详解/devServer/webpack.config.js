const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 
 */
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build'),
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
    },
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, 'build'),
        // 监视 contentBase 目录下的所有文件， 一旦变化就睡 reload
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        // 启动 gzip 压缩
        compress: true,
        port: 5000,
        host: 'localhost',
        open: true,
        // 开启 HMR 功能
        hot: true,
        // 不要显示启动服务器的日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息以外，其他内容不要显示
        quiet: true,
        // 如果出错了，不要全屏提示
        overlay: false,
        // 服务器代理 --> 解决开发环境跨域问题
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // api/xxx -> http://localhost:3000/api/xxx
                // 发送请求时，路径重写
                // 加上则： api/xxx -> http://localhost:3000/xxx
                pathRewrite: {
                    '^api': ''
                }
            }
        }
    }
}