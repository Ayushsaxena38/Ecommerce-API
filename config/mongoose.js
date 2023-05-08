const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ayushsaxena38:Ayush%4012345@cluster0.dwrztdb.mongodb.net/',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

//aquire the connection to check if it is successfull.
const db = mongoose.connection;

//if error occured then this db.on() will notify by showing this message.
db.on('error',console.error.bind(console,'error connecting to db'));

//when the connection is successfully established the db.onse() will notify by showing this message.
db.once('open',function(){
    console.log('successfully connected to the data base')
});

//mongoose url for local host :- 'mongodb://127.0.0.1:27017/Ecommerece_api_db'
//mongoose url for mongodb cloude cluster0 :- 'mongodb+srv://ayushsaxena38:Ayush%4012345@cluster0.dwrztdb.mongodb.net/'