const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path ='./views/';
    switch (req.url) {
      case "/":
        path += "index.html";
        res.statusCode = 200;
        break;
      case "/about":
        path += "about.html";
        res.statusCode = 200;
        break;
      case "/about-me":
        res.statusCode = 301;
        res.setHeader('Location', '/about');
        res.end();
        break;
      default:
        path += "404.html";
        res.statusCode = 404;
        break;
    };

    // res.write('<head><link rel="stylesheet" href="#"></head>')
    // res.write('<p>hello, chehine<p>');
    // res.write("<p>hello again<p>");
    // res.end();
    fs.readFile(path, (err,data) => {
        if (err) {
            console.log(err);
        } else {
            //res.write(data);
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});