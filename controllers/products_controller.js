const db = require('../config/mongoose');
const Sequence = require('../models/sequence');
const Products = require('../models/products');

//controller action for getting all products list/entry
module.exports.getProducts = async function(req,res){
    try {
        //lets fectch all products
        let products = await Products.find({}).select(['-_id','id','name','quantity']);
        if(products.length == 0){
            //if zero products 
            return res.json(200,{
                message : "Zero Products"
            })
        }else{
            //if products are fetched successfully
            return res.json(200,{
                data : {
                    products
                }
            })
        }
    } catch (error) {
        //if any error occured in fetching the products
        console.log('error in finding the products list :',error);
        return res.json(500,{
            message : 'server error'
        })

    }
}

//controller action for creating new product entry in inventery/products list
module.exports.create = async function(req,res){
    try{
        //first fetch the sequence to know the new product id
        let seq = await Sequence.find({});
        console.log(seq);
        if(seq.length == 0){
            //if there is no sequence saved yet means it is the first product to be create
            try{
                //lets create first sequence to make a counter of ids of products
                let newSeq = await Sequence.create({
                    'name' : 'sequence',
                    'seq' : 1
                });
                console.log('first Sequence is created seccessfully');
                console.log(newSeq);
                try{
                    //now create the product
                    let product = await Products.create({
                        'name' : req.body.name,
                        'quantity' : req.body.quantity,
                        id : newSeq.seq
                    })
                    
                    console.log('producted is created successfully :',product);
                    return res.json(200,{
                        data : {
                            Product : {
                                name : product.name,
                                quantity : product.quantity,
                            }
                        }
                    })
                }catch(err){
                    //if error occured in creating the product
                    console.log('Error in creating the Product : ',err);
                }

            }catch(err){
                //if error occured in creating the sequence 
                console.log('Error in creating the first Sequence : ',err);
            }
        }else{
            //if sequence is already present then just increase the seq by one 
            let c = seq[0].seq;
            c++;
            Sequence.findOneAndUpdate(seq , {$inc : {seq : 1}})
            .then((result)=>{
                console.log(result);
            })
            //now create the product
            Products.create({
                'name' : req.body.name,
                'quantity' : req.body.quantity,
                'id' : c
            })
            .then((prdt)=>{
                return res.json(200,{
                    data : {
                        Product : {
                            name : prdt.name,
                            quantity : prdt.quantity,
                        }
                    }
                })
            })
        }
    }catch(err){
        console.log('Error in finding the Sequence : ',err);
    }
}

//controller action for deleting a perticular producr by id
module.exports.delete = async function(req,res){
    try {
        let deleteresult = await Products.findOneAndDelete({'id':req.params.id});
        //if product id is exist
        if(deleteresult){
            console.log('exists : ',deleteresult);
            return res.json(200,{
                message : 'Product deleted!'
            })
        }else{
            //if no such product id is exist
            console.log('not-exists : ',deleteresult);
            return res.json(200,{
                message : 'Product is not exists'
            })
        }
    } catch (error) {
        //if error occured in deleting the product
        console.log('error in deleting the product :',error);
        return res.json(500,{
            message : "error in deleting the product"
        })
    }
    

}

//controller action for updating a predefined product's quantity based upon number given(positive for increment and negative for decrement)
module.exports.update = async function(req,res){
    try {
        console.log(req.params , req.query);
        //first check wether the product id is exist or not
        let product = await Products.findOne({'id':req.params.id});
        console.log(product);
        if(product == null){
            //if no such product id is exist
            return res.json(200,{
                message : "Product not exists/ wrong product id"
            })
        }else{
            //if product id exist the update the product's quantity
            try {
                let newQuantity = parseInt(eval(product.quantity + req.query.number));
                console.log(newQuantity);
                let result = await Products.findOneAndUpdate({'id': req.params.id}, {quantity : newQuantity})
                console.log(result);
                return res.json(200,{
                    data : {
                        product : {
                            id : product.id,
                            name : product.name,
                            quantity : newQuantity
                        },
                        message : 'updated successfully!'
                    }
                })
            } catch (error) {
                //if error occured in updating the product
                console.log('error in updating the product');
                return res.json(500,{
                    message : 'error in updating the product'
                })
                
            }
            
        }
    } catch (error) {
        //if error occured in finding the product
        console.log('error in finding the product :',error);
        return res.json(500,{
            message : 'server error'
        })
    }
}