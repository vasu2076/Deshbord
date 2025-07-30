require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/signup');
const cartRoutes = require('./routes/cart');
app.use('/products', productRoutes);
app.use('/signup', userRoutes);
app.use('/cart',cartRoutes)

// Database
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database Connection is ready...');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
