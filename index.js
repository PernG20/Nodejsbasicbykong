const express = require('express')
const app = express()
const path = require('path')
// ກຳນົດ path ຜ່ານຕົວເເປ
const indexPage = path.join(__dirname,'templates/index.html')

app.get('/',(req,res)=>{
  res.status(200)
  res.type('text/html')
  res.sendFile(indexPage)
})
app.get('/product',(req,res)=>{
  res.status(200)
  res.type('text/html')
  // ກຳນົດ path ໂດຍຕົງ
  res.sendFile(path.join(__dirname,'templates/product1.html'))
})
app.listen(55,()=>{
    console.log('run server port:55')})