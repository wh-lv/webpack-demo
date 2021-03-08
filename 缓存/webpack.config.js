const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const commmonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commmonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commmonCssLoader, 'less-loader']
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs',
                            exModule: false
                        }
                    },
                    {   
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /.(js|json|css|less|sass|jpg|png|gif|html)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    },
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: { version: 3 },
                                        targets: {
                                            chrome: '60',
                                            ie: '9'
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/build.[contenthash:10].css'
        })
    ],
    mode: 'production',
    devtool: 'source-map'
}
