const express = require('express');
const Review = require('../models/review.model');
const Product = require('../models/product.model');
const reviewRouter = express.Router();

// Route to add a review for a product
reviewRouter.post('/api/products/:productId/reviews', async (req, res) => {
  try {
    const { userId, description } = req.body;
    const review = new Review({ userId, description });
    await review.save();

    // Find the product by its ID and add the review
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.reviews.push(review);
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a review for a product
reviewRouter.delete('/api/products/:productId/reviews/:reviewId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the review exists in the product's reviews array
    if (!product.reviews.some((review) => review._id.equals(reviewId))) {
      return res.status(404).json({ error: 'Review not found' });
    }
    // Use $pull to remove the review by its _id from the reviews array
    await Product.findByIdAndUpdate(productId, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.status(202).send({ msg: "Review Deleted" }); // No content
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all reviews for a product (virtual population)
reviewRouter.get('/api/products/:productId/reviews', async (req, res) => {
  try {
    // Find the product by its ID and populate the reviews
    const product = await Product.findById(req.params.productId).populate('reviews');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = reviewRouter;
