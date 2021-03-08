# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
    * HMR css -> style-loader  js -> 自己写
* 优化代码调试
    * source-map
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

## 生产环境性能优化
* 优化打包构建速度
    * oneOf
    * 缓存 babel缓存(优化构建打包速度)
    * 多进程打包（thread-loader）
    * externals
    * dll
* 优化代码运行的性能
    * 缓存(hahs-chunkhash-contenthash)
    * tree shaking(树摇，去除应用程序中没有使用的代码，必须需开启es6模块化和production) package.json -> sideEffect: []
        * 在package.json中配置 
        * "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
        * 问题：可能会把 css / @babel/polyfill 文件干掉
        * 可配置 "sideEffects": ["*.css", "*.less", "@babel/polyfill"]
    * code split (单入口、多入口)
        webpack.config.js中配置：
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        * 1.可以将node_modules中代码单独打包一个chunk最终输出
        * 2.自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk

        或者使用 import 语法进行分割
    * 懒加载/预加载
        * 例：import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then()
    * PWA（兼容性）
    
    
    