let http = require('http');
let url = require('url');
let qs = require('querystring');
require('dotenv').config() 

let responder = (req,res, param) =>{
    res.writeHead(20, {'Content-type': 'text/html'});
    res.end(param);
}

let routes = {
    "GET" : {
        "/" : (req,res)=> {
           responder(req,res, `<h1>Get Method => /route</h1>`);
        },
        "/home" : (req,res) => {
             responder(req,res, `<h1>Get method => /home route with paramof ${params.query.name}
             and ${params.query.age}</h1>`);
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