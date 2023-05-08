const express = require('express');
const app = express();
const port = 8000;
app.use(express.urlencoded());

app.use('/',require('./routes/products'));

app.listen(port , function(err){
    if(err){
        console.log('error in setting up the server : ',err );
    }
    console.log(`server is up and running on port : ${port}`);
})