const express = require('express');
const Product = require('../models/product.model');
const productRouter = express.Router();

// Route to add a new product
productRouter.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to read all products
productRouter.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to read a product by ID
productRouter.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a product by ID
productRouter.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the uDate field to the current date and time
    product.uDate = new Date();

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to delete a product by ID
productRouter.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({_id:req.params.id});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(202).send({msg:"Deleted Product"}); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = productRouter;
