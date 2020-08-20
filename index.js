let http = require('http');
let url = require('url');
require('dotenv').config() 

let routes = {
    "GET" : {
        "/" : (req,res,params)=> {
            res.writeHead(200, {'Content-type':'text/html'});
            res.end("<h1>Get method => /route</h1>");
        },
        "/home" : (req,res, params) => {
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(`<h1>Get method => /home route with paramof ${params.query.name}
                        and ${params.query.age}</h1>`);
        }
    },
    "POST" : {
        "/" : (req,res, params)=> {
            res.writeHead(200, {'Content-type':'text/html'});
            res.end("<h1>Post method => /route</h1>");
        },
        "/about" : (req,res,params) =>{
            res.writeHead(200, {'Content-type':'text/html'});
            res.end("<h1>Post method => /about</h1>");
        }
    },
    "NA" : (req,res,params) =>{
        res.writeHead(404);
        res.end("<h1>No page for that route!</h1>");
    }

}

let start = (req, res)=>
{
   let reqMethod = req.method;
   let params = url.parse(req.url, true);
   let name = params.query.name;
   let age = params.query.age;
    console.log("Name ", name, "Age", age);
 let resovleRoute = routes[reqMethod][params.pathname];
 if (resovleRoute !=null && resovleRoute != undefined){
    resovleRoute(req,res, params);
 }else{
     routes["NA"](req,res, params);
 }
}

let server = http.createServer(start);

server.listen(process.env.DB_HOST, ()=>{
    console.log(`Server is runnning at port ${process.env.DB_HOST}!`)
})