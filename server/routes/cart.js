const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const {Product} =require('../models/products')
const mongoose = require('mongoose');


router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cartItem = new Cart({ productId, quantity });
    const savedItem = await cartItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
     console.error('Cart Add Error:', error); 
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
});

router.delete('/:id', async(req,res)=>{
    const deletecart = await Cart.findByIdAndDelete(req.params.id);
    if(!deletecart){
      return res.status(404).json({
        message:"product does not found !",
        status:false
      })
    }
    res.status(200).send({
      message:"cart product is deleted !",
      status:true
    })
})


module.exports = router;
