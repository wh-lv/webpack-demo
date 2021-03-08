/**
 * HMR: hot module replacement 热模块替换/模块热替换
 *  作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 *    极大的提升构建速度
 *  样式文件：可以使用HMR功能：因为style-loader内部实现了（MiniCssExtractPlugin.loader则不能热更新）
 *  js文件：默认不能使用HMR功能 -> 需要修改js代码，添加支持HMR
 *  html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了
 *      解决：修改 entry，改为数组，将 模板文件引入（此时也没有HMR功能 ，不需要）
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/**
 * PWA：渐进式网络开发技术（离线可访问）
 *  workbox --> (webpack中得使用插件) workbox-webpack-plugin
 */


/**
 * tree shaking: 去除无用代码
 *  前提：1.必须使用ES6模块化 2.开启production环境
 * 作用：减少代码体积
 * 
 * 在package.json中配置 
 *      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
 *      问题：可能会把 css / @babel/polyfill 文件干掉
 *      可配置 "sideEffects": ["*.css", "*.less", "@babel/polyfill"]
 */

/**
 * 缓存：
 *  babel缓存
 *      cacheDirectory: true
 *      --> 让第二次打包构建速度更快
 *  文件资源缓存
 *      hash: 每次webpack构建时会生成一个唯一的hash值
 *      问题：以为js和css同时使用一个hash值
 *      如果重新打包，会导致所有缓存失效（可能只改动了一个文件）
 *  chunkhash：根据chunk生成hash值，如果打包来源于同一个chunk，那么hash值就是一样的
 *  问题：js和css的hash值还是一样的
 *      因为css是在js中被引入的，所以同属于一个chunkhash
 *  contenthash：根据文件的内容生成hash值
 *  --> 让代码上线运行缓存更好使用
 */

process.env.NODE_ENV = 'production'
module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    // target: ['web', 'es5'],
    module: {
        rules: [
            {
                // 语法检查：eslint-loader eslint （规范所有开发者的代码风格）
                // 只检查用户自己写的js文件，第三方库不检查
                // 设置检查规则：package.json 中 eslintConfig 中设置~
                // 推荐使用 airbnb 规则 -> eslint-config-airbnb-base eslint eslint-plugin-import
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre', // 优先执行
                // include: /src/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            },
            {
                // 以下loader只会匹配一个
                // 注意：不能有两个配置处理他同一类型文件（js语法检查和js兼容）
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            // 'style-loader', // 创建style标签，将样式放入
                            // MiniCssExtractPlugin.loader,
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../'
                                }
                            },
                            'css-loader', // 将css整合到js中
                            /**
                             * css兼容性处理：postcss --> postcss-loader postcss-preset-env（识别环境）
                             * webpack中使用 postcss 需引入 postcss-loader 和 postcss-preset-env（插件：帮助postcss识别某些环境，加载指定配置）
                             * 
                             * 帮postcss找package中的browserslist里面的配置，通过配置加载指定的css兼容性样式
                             * "browserslist": {
                                    "development": [
                                        "last 1 chrome version",
                                        "last 1 firefox version",
                                        "last 1 safari version"
                                    ],
                                    "production": [
                                        ">0.2%",
                                        "not dead",
                                        "not op_mini all"
                                    ]
                                }
                             */
                            // 使用 loader 默认配置
                            // 'postcss-loader',
                            // 配置 postcss-loader
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
                    },
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader', 
                            // MiniCssExtractPlugin.loader,
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../'
                                }
                            },
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-preset-env')()
                                    ]
                                }
                            },
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs',
                            esModule: false,
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(js|json|png|jpg|gif|css|less|html)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'other'
                        }
                    },
                    // js 兼容性处理 babel-loader -> @babel/core
                    // 1. 基本js兼容性处理 -> @babel/preset-env
                    //  问题：只能转换基本语法，如 promise高级语法 不能转换
                    // 2. 全部 js 兼容性处理 @babel/polyfill
                    //  问题：我只要解决部分兼容性问题，当时会将所有兼容性代码引入，代码体积太大了~
                    // 3. 需要做兼容性的就做：按需加载 -> corejs
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            // 预设：标识 babel 做怎样的兼容性处理
                            // presets: ['@babel/preset-env']
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        // core-js 版本
                                        corejs: {
                                            version: '3'
                                        },
                                        // 指定兼容到浏览器的哪个版本
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            safari: '10',
                                            ie: '9',
                                            edge: '17'
                                        }
                                    }
                                ]
                            ],
                            // 开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        // 压缩 css
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            /**
             * 1.帮助serviceworker快速启动
             * 2.删除旧的serviceworker
             * 
             * 功能：生成一个 serviceworker 配置文件~
             */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        // open: true,
        compress: true,
        // 开启 HMR 功能
        // webpack 配置修改后需重启才能生效
        hot: true
    },
    devtool: 'source-map'
}

/**
 * source-map: 一种 提供源代码到构建后代码映射 技术（如果构建后代码出错了，通过映射可以追踪源代码错误位置）
 *  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 * inline-source-map：内联
 *      只生成一个内联source-map
 *      错误代码准确信息 和 源代码的错误位置
 * hidden-source-map：外部
 *      作物代码错误原因，但是没有错误位置，不能追踪到源代码位置，只能提示到构建后代码位置
 * eval-source-map：内联
 *      每一个文件受生成对应的source-map，都在eval
 *      错误代码准确信息 和 源代码的错误位置
 * nosources-source-map：外部
 *      找到错误代码准确性息，但是没有任何源代码信息
 * cheap-source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 *      会精确提示到行
 * cheap-module-source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 *      moudle会将loader的source map加入
 * 
 * 
 * 内联和外部的区别：1.外部生成了文件，内联没有 2.内联构建速度更快
 * 
 * 开发环境：速度快，调试更友好
 *      速度快（eval>inline>cheap>...）
 *      eval-cheap-source-map（组合，提示只会精确到行）
 *      eval-source-map
 *      调试更友好
 *          source-map
 *          cheap-module-source-map
 *          cheap-source-map
 * 
 *      --> eval-source-map / eval-cheap-module-soure-map
 *          
 * 生产环境：源代码要不要隐藏？挑事要不要更友好
 *      内联会让代码体积更大
 *      hidden-source-map 全部隐藏
 *      nosources-source-map 只会隐藏源代码，会提示构建后代码错误信息
 * 
 *      --> source-map / cheap-module-source-map
 * 
 */