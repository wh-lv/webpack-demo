import '$css/index.css';

console.log('index.js~');

import(/* webpackChunkName: 'add' */'./add').then(({add}) => {
    console.log(add(1, 2));
})
