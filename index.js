const http = require('http')

http.createServer((req,res)=>{
    const data =`
    <h1>Hello perng </h1>
    <p>congraturation perng </p>
    `
    res.write(data);
    res.end()
}).listen(8080,'localhost',()=>{
    console.log("start localhost:8080...!")
})
