const express = require('express')
const router = require('./routes/myroutes')  //ຍັງບໍ່ທັນໄດ້ໃຊ້ກັບ static file
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()

app.set('views',path.join(__dirname,'views'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.set('view engine','ejs')
app.use(router)
app.use(express.static(path.join(__dirname,'public')))



app.listen(55,()=>{
    console.log('run server port:55')})