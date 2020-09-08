const client = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/ourdb";

// client.connect(url, (err, inst)=>{
//    errorChecker(err, inst);
// });

let makeCollection = (coleName)=>{
    client.connect(url,{useUnifiedTopology:true},(err,inst)=>{
        if(err){
            console.log("Something wrong", err);
        }else{
           // console.log("we are good to go");
           let dbo = inst.db('ourdb');
           dbo.createCollection(coleName,(err,res)=>errorChecker(err,res));
        }
    });
}

// let insertData = (obj) =>{
//     client.connect(url,{useNewUrlParser:true},(err,inst)=>{
//         if(err){
//             console.log("Something wrong", err);
//         }else{
//             let dbo = inst.db('ourdb');
//             dbo.collection('users').insertOne(obj,(err,res)=>errorChecker(err,res))
//         }
//     })
// }

let insertData = (obj)=>{
    client.connect(url, {useNewUrlParser:true},(err,inst)=>{
        if(err){
            console.log("Something wrong", err);
        }else{
            let dbo = inst.db('ourdb');
            dbo.collection('users').insertMany(obj,(err,res)=>errorChecker(err,res));
        }
    })
}
//makeCollection('users');
//insertData({name:'Mg Mg', email:'mg@gmail.com', password:'123'});

insertData (
    [
        {name:"Aung Aung", email:'ag@gmail.com', password:'123',age:21},
        {name:"Naung Naung", email:'nn@gmail.com', password:'123', age:21},
        {name:"Win Win", email:'ww@gmail.com', password:'123',age:22},
        {name:"Min Min", email:'mm@gmail.com', password:'123',age:23},
    ]
)

let errorChecker = (err, res)=>{
    if(err){
        console.log("Something wrong", err);
    }else{
        console.log("we are good to go", res);
    }
};


// Using mongodb
/*
Database => Tables =>roots =>fields
Database => Collections(users) => documents{"name":"MgMg", age:20,email:"aa@gmail.com"}
=>key :value
*/