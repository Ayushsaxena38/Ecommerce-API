const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    id : {
        type: String, 
    },
    name : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
