const http = require("http");
const fs = require("fs");

const indexPage = fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8');
const productPage = fs.readFileSync(`${__dirname}/templates/product1.html`,'utf-8')

http.createServer((req, res) => {
    const pathName = req.url;
    console.log("Url = ", pathName);

    if (pathName === "/" || pathName === "/home") {
      res.end(indexPage);
    } else if (pathName === "/product") {
      res.end(productPage);
    } else {
      res.writeHead(404);
      res.end("<h1>Not Found </h1>");
    }
  })
  .listen(8080, "localhost", () => {
    console.log("start localhost:8080...!");
  });
