const express = require('express')
const app = new express()

app.use(express.static('./build', { maxAge: 1000 * 60 * 60 }))

app.listen(3000)
