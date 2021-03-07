/**
 * 服务器代码
 * nodemon server.js
 */

const express= require('express');
const app = express();

app.use(express.static('build', {maxAge: 1000 * 3600}))

app.listen(3000);