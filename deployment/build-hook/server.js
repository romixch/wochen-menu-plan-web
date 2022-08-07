const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {
    if (req.method === 'POST') {

        touchFile("./build-hook/main")

    }
    res.writeHead(200);
    res.end('ok');
}

const server = http.createServer(requestListener);
server.listen(80);
console.log('Running')

function touchFile(fileName) {
    console.log('Initiating build for ' + fileName)
    const time = new Date();

    try {
        fs.utimesSync(fileName, time, time);
    } catch (err) {
        fs.closeSync(fs.openSync(fileName, 'w'));
    }
}