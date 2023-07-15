const http = require("http");

http
  .createServer((req, res) => {
    const pathName = req.url;
    console.log("Url = ", pathName);

    if (pathName === "/" || pathName === "/home") {
      res.end("<h1>Wellcome Back</h1>");
    } else if (pathName === "/product") {
      res.end("<h1>Wellcome to Product</h1>");
    } else {
        res.writeHead(404)
        res.end('<h1>Not Found </h1>')
    }
  })
  .listen(8080, "localhost", () => {
    console.log("start localhost:8080...!");
  });
