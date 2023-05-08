const express = require('express');
const router = express.Router();
const productController = require('../controllers/products_controller');

//route for creating new product entry in inventery/products list
router.post('/products/create', productController.create);

//route for getting all products list/entry
router.get('/products',productController.getProducts);

//route for deleting a perticular producr by id
router.delete('/products/:id',productController.delete);

//route for updating a predefined product's quantity based upon number given(positive for increment and negative for decrement)
router.post('/products/:id/update_quantity/',productController.update);

//exporting the router
module.exports = router;