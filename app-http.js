const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath;
    if (req.url === '/')
        filePath = 'public/index.html';
    else filePath = 'public/' + req.url;
    let extname = path.extname(filePath);
    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('ERROR: ' + error.code + ' ..\n');
                res.end();
            }
        } else {
            res.end(content, 'utf-8');
        }
    });

});

server.listen('3000', () => {
    console.log('Server is running');
});