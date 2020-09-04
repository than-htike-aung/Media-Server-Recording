require('dotenv').config();

let epxress = require('express'),
   app = epxress(),
   multer = require('multer');

   let guestRoute = require('./routes/guestRoute')(epxress);
   let userRoute = require('./routes/userRoute')(epxress);

   app.use('/', guestRoute);
   app.use('/user', userRoute);

   app.listen(process.env.PORT, ()=>{
      console.log(`Server starting at ${process.env.PORT}`)
   })