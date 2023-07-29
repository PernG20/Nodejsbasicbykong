const express = require('express')
const router = require('./routes/myroutes')
const app = express()
app.use(router)

app.listen(55,()=>{
    console.log('run server port:55')})