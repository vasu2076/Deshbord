const {Product} =require('../models/products')
const express = require('express');
const router  = express.Router();
// const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
    try {
        
        const productlist = await Product.find();

        if (!productlist) {
            return res.status(500).json({ success: false });
        }

        res.send(productlist);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// insert
router.post('/create', async (req, res) => {
    try{
      const { images } = req.body;

  // Dynamically import p-limit ESM
  const pLimit = (await import('p-limit')).default;
  const limit = pLimit(2);

  const imageToUpload = images.map((img) =>
    limit(() => cloudinary.uploader.upload(img))
  );

  const uploadStatus = await Promise.all(imageToUpload);

  if (!uploadStatus || uploadStatus.length === 0) {
    return res.status(500).json({
      error: "Image upload failed",
      status: false
    });
  }

  const imgUrls = uploadStatus.map(item => item.secure_url);

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    catName: req.body.catName,
    brand: req.body.brand,
    countInStock: req.body.countInStock,
    price: req.body.price,
    Oldprice: req.body.Oldprice,
    discount: req.body.discount,
    productSize: req.body.productSize,
    rating: req.body.rating,
    images: imgUrls, 
  });
  console.log(product);

  product = await product.save();
  if (!product) {
    return res.status(500).json({
      error: "Error saving product",
      success: false
    });
  }
  res.status(201).json(product);  
    }catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
  
});

// delete by id
router.delete('/:id', async(req,res)=>{
    const deleteproduct = await Product.findByIdAndDelete(req.params.id);
    if(!deleteproduct){
      return res.status(404).json({
        message:"product does not found !",
        status:false
      })
    }
    res.status(200).send({
      message:"product is deleted !",
      status:true
    })
})

// find by id
router.get('/:id' ,async(req,res)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    res.status(500).json({message:'the Product given id was not found.'})
  }
  return res.status(200).send(product);
})

// id the update 

router.put('/:id', async(req,res)=>{
  const product = await Product.findByIdAndUpdate(
    req.params.id,{
      name:req.body.name,
      description:req.body.description,
      catName:req.body.catName,
      brand:req.body.brand,
      countInStock:req.body.countInStock,
      price:req.body.price,
      Oldprice:req.body.Oldprice,
      discount:req.body.discount,
      productSize:req.body.productSize,
      rating:req.body.rating,
      images:req.body.images,
    },
    {new:true}
  );

  if(!product){
    res.status(404).json({
      message:'this is can not update',
      status:false
    })
  }
  res.status(200).json({
    message:'product is update',
    status:true
  })
})

module.exports = router;

