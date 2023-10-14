/* const { error } = require('console')
const http = require('http')
const PORT = 8989

const fs = require('fs')
// we need to two parameter like request and response
const server = http.createServer((req, res) => {
    // res.write("Thanks for visiting")
    // res.end()
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('index.html',(error,data)=>{   // first we need to pass error then data then only it works
        if (error) {
            res.writeHead(404);
            res.write("Page is not found")
        }
        else{
            res.write(data)
        }
        res.end()
    })
})

// say to the server to listen which port 
server.listen(PORT, (error)=>{
    if(!error){
        console.log(`The server is running on ${PORT}`)
        }else{
            console.log(error);
    }
}) */

// ----------------------------------------------------
// server.js from gitdagray 
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
// initialize object 
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''   // converts the image into string
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;    // json into raq data; only we can handle the json file 
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,   // ternary condition for the 404 error html 
            { 'Content-Type': contentType }
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');    // showing the error in the new file
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    // they were taking the last extension in the url 
    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    // for index we can mention the page name without .html
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':    // when user clicks the old page it will redirect to the new page 
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));