import { mul } from './test';
import '../style/index.css';

// eslint-disable-next-line
console.log('index.js文件被加载了~');

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(2, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

/**
 * 1. eslint不认识 window、navigator
 * 解决：
 *      需要在 package.json 的 eslintConfig 中加入 "env": { "browser": true }（支持node加入"node": true）
 * 2. serviceWorker必须运行到服务器上
 *  --> nodejs
 *  --> npm i serve -g
 *  serve -s build 启动服务器，将build目录下的所有资源作为静态资源暴露出去
 */
// 注册 serviceworker
// 处理兼容性问题
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./service-worker.js')
//       .then(() => {
//         // eslint-disable-next-line
//         console.log('serviceWorker注册成功');
//       })
//       .catch(() => {
//         // eslint-disable-next-line
//         console.log('serviceWorker注册失败');
//       });
//   });
// }
