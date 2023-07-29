const express = require('express')
const router = express.Router()
const path = require('path')
// const express = require('express')
router.get('/',(req,res)=>{
    res.status(200)
    res.type('text/html')
    res.sendFile(path.join(__dirname,'../templates/index.html'))
})

router.get('/product',(req,res)=>{
    res.status(200)
    res.type('text/html')
    res.sendFile(path.join(__dirname,'../templates/product1.html'))
})
module.exports = router