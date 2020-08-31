require('dotenv').config();
let express = require('express');
let app = express();
let path = require('path'); //for image
let bodyParser = require('body-parser');
let hogan = require('hogan-express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.engine('html', hogan);
app.set('view engine', 'html');

app.get('/api/post/:name', (req, res)=>{
   let name = req.params.name;
   res.send(`Param id is ${name}`);
})

//Qery params => http://localhost:3000/api/user?name=mgmg&password=123

app.get('/api/user', (req, res)=>{
   let name = req.query.name;
   let password = req.query.password;
   res.send(`Name ${name} and password ${password}`);
})

app.post('/api/login', (req,res)=>{
   let email = req.body.email;
   let password = req.body.password;

   res.send(`Email ${email} and Password ${password}`);
})

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res)=>{
   res.render('index');
})

app.get('/index', (req, res)=>{
    res.render('index')
 })

 app.get('/about', (req, res)=>{ 
    res.render('about')
 })

 app.get('/loading', (req, res)=>{
   res.render('loading')
 })
 


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
});