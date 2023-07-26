const express = require('express')
const app = express()
app.use((res,req)=>{
  res.send('<h1>Hello Express.js</h1>')
}).listen(55,()=>{
  console.log('run server port:55')
})

