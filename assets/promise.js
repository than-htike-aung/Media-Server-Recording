let http = require('http');
let url = require('url');
let qs = require('querystring');
let fs = require('fs');
let path = require('path');

require('dotenv').config() 

meme = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif" : "image/gif",
}

let checkFileExist = (filepath) =>{
    return new Promise((resolve, reject)=>{
        fs.access(filepath, fs.F_OK, (err)=>{
            if(err) reject(err);
            resolve(filepath);
        })
    })
}

let readMyFile = (filepath)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(filepath, (err, data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}
            
let router = (req,res)=>{
    let params = url.parse(req.url, true);
    let oriPath = params.pathname == "/" ? "/index.html" : params.pathname;
    let filepath = __dirname + oriPath;

    let ext = path.extname(oriPath);

    checkFileExist(filepath)
        .then(readMyFile)
        .then(data =>{
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(data);
        })
        .catch(err => {
            res.writeHead(404, {'Content-type':'text/html'});
            res.end("<h1>File Not Found</h1>");
        });
    
    
}

let server = http.createServer(router);

server.listen(process.env.DB_HOST, ()=>{
    console.log(`Server is runnning at port ${process.env.DB_HOST}!`)
});