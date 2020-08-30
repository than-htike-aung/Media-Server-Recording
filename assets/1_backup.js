let http = require('http');
let url = require('url');
let qs = require('querystring');
let fs = require('fs');
const { F_OK } = require('constants');

require('dotenv').config() 

let responder = (req,res, param) =>{
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(param);
}

let myFileReader = (filepath, res) =>{
    fs.access(filepath, fs.F_OK, (err)=>{
        if(err) {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end("<h1>File not found</h1>");
        }else{

        
        fs.readFile(filepath,(err,data)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(data);
        });
    }
    });
}

let routes = {
    "GET" : {
        "/" : (req, res)=> {
            let filepath = __dirname + '/index.html';
             myFileReader(filepath,res);
           
        },
        "/index.html":(req, res) => {
            let filepath = __dirname + '/index.html';
            myFileReader(filepath, res);
            
        },
        "/about.html":(req, res) =>{
            let filepath = __dirname + '/about.html';
            myFileReader(filepath, res);
           
        }
    },
    "POST" : {
        "/" : (req,res)=> {
            responder(req,res, `<h1>Post method => /route</h1>`);
        },
        "/api/login" : (req,res) =>{
          
           let body = '';
           req.on('data', data =>{
                body += data;
                if(body.length>1024){
                    res.writeHead(403, {'Content-type': 'text/html'});
                    res.end("<h1>File size over 1mb!</h1>");
                }
           });
           req.on('end', ()=>{
            let query = qs.parse(body);
            console.log("Email", query.email, "Password", query.password);
            res.end();

           })
        }
    },
    "NA" : (req,res) =>{
        responder(req,res, `<h1>No page for that route!</h1>`);
    }

}

let start = (req, res)=>
{
   let reqMethod = req.method;
   let params = url.parse(req.url, true);
//    let name = params.query.name;
//    let age = params.query.age;

  
 let resovleRoute = routes[reqMethod][params.pathname];
 if (resovleRoute !=null && resovleRoute != undefined){
    resovleRoute(req,res);
 }else{
     routes["NA"](req,res);
 }
}

let server = http.createServer(start);

server.listen(process.env.DB_HOST, ()=>{
    console.log(`Server is runnning at port ${process.env.DB_HOST}!`)
})