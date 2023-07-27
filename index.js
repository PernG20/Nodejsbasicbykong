const express = require('express')
const app = express()

app.get('/',(req,res)=>{
  res.send('<h1>Hello Express.js</h1>')
})
app.get('/product',(req,res)=>{
  res.send('<h1>Hello Product</h1>')
})
app.listen(55,()=>{
    console.log('run server port:55')})