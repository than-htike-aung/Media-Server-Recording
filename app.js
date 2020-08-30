// // console.log(process.argv)
// // console.log(process.argv.length)

// require('dotenv').config()
// //console.log(process.env)

// process.argv.forEach((pp)=>{
//     console.log(pp);
// })

let libby = require('./bmlibby/index');

libby.encode('123')
    .then(encoded => libby.compare('123', encoded))
    .then(res => console.log(res))
    .catch(err => console.log(err));