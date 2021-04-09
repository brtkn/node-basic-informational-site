const http = require('http');
const url = require('url');
const fs = require('fs');

let page404;

fs.readFile('./404.html', (err, data) => {
  page404 = data;
});

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  let filename = "." + q.pathname;
  console.log(filename);
  console.log(q.pathname);
  if(filename === "./") {
      filename = "./index.html";
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(page404);
      return res.end();
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  
}).listen(8080);
