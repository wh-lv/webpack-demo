// import '@babel/polyfill';
import './font/iconfont.css';
import './style/css/index.css';
import './style/less/index.less';
import data from './media/data.json';
import print from './print';

import { mul } from './test';

// eslint-disable-next-line
console.log('mul: ', mul(2, 3));


print();

// 下一行 eslint 所有 eslint规则都失效（下一行不进行 eslint 检查）
// eslint-disable-next-line
console.log('data: ', data);
// eslint-disable-next-line
console.log('index.js文件被重新加载了~');

const add = function add(a, b) {
  return a + b;
};

// eslint-disable-next-line
console.log(add(3, 4));
const promise = new Promise(((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器执行完毕了！');
    resolve();
  }, 1000);
}));

// eslint-disable-next-line
console.log(promise);

if (module.hot) {
  // 一旦 module.hot 为true，说明开启了 HMR 功能 --> 让HMR功能代码生效
  module.hot.accept('./print.js', () => {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建
    // 会执行后面的回调函数
    print();
  });
}

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log('sum: ', sum(1, 2, 3, 4));