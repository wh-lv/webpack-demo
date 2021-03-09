// import add from './add';
import count from './count';

console.log('index.js~');

import('./add').then(({default: add}) => {
    console.log(add(3, 4));
})
// console.log(add(3, 4));
console.log(count(3, 4));
