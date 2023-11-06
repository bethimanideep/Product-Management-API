#  Product and Review Management API [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The Product and Review Management API is a Node.js application with MongoDB integration that allows you to efficiently manage products and their associated reviews. This RESTful API offers features like creating, retrieving, updating, and deleting products and reviews, as well as virtual population of reviews for a product. It's a powerful tool for product and review management.


### Backend Deploy
[Live Demo](https://product-management-api-theta.vercel.app/)

### Swagger UI Docs
[API Documentation](https://product-management-api-theta.vercel.app/api-docs/)

### Video Demonstration
[Watch Video]()

## .env

Before running the application, make sure to set the following environment variables in a `.env` file in the project root directory:

```
PORT=8000
MONGODBURL=your_mongodb_connection_url
```

## Installation
   ```bash
   git clone https://github.com/bethimanideep/Product-Management-API.git
   cd Product-Management-API
   npm install
   node index.js
   ```

### Models

### Product Model

The Product model represents the attributes of a product in the system. It includes the following fields:

- `name` (String, required): The name of the product.
- `price` (Number, required): The price of the product.
- `cDate` (Date, default: current date and time): The creation date of the product.
- `uDate` (Date, default: current date and time): The last update date of the product.
- `reviews` (Array of Review IDs): An array of unique identifiers for associated reviews.

```
{
  "name": "Product A",
  "price": 29.99,
  "cDate": "2023/10/12/15/30/45",
  "uDate": "2023/10/12/15/30/45",
  "reviews": [
    {
      "_id": "abcdefghij",
      "userId": "user123",
      "description": "This product is great!",
      "cDate": "2023/10/12/15/35/20",
      "uDate": "2023/10/12/15/35/20"
    }
  ]
}

```

### Review Model

The Review model represents user reviews associated with products. It includes the following fields:

- `userId` (String, required): The identifier of the user who posted the review.
- `description` (String, required): The description or content of the review.
- `cDate` (Date, default: current date and time): The creation date of the review.
- `uDate` (Date, default: current date and time): The last update date of the review.


```
{
  "userId": "user123",
  "description": "This product is great!",
  "cDate": "2023/10/12/15/35/20",
  "uDate": "2023/10/12/15/35/20"
}

```

These models define the structure and attributes of products and reviews, allowing for effective management and storage of data in the application.
### Endpoints

#### Products

- *POST /api/products*: Add a Product
- *GET /api/products*: Read All Products
- *GET /api/products/:id*: Read Product by ID
- *PUT /api/products/:id*: Update a Product
- *DELETE /api/products/:id*: Delete a Product

#### Reviews

- *POST /api/products/:productId/reviews*: Create a Review for a Product
- *DELETE /api/products/:productId/reviews/:reviewId*: Delete a Review
- *GET /api/products/:productId/reviews*: Virtual Population of Reviews for a Product





### Contact Information

For any queries and feedback, please contact me at [bethimanideep@gmail.com](mailto:bethimanideep@gmail.com).

---

<h1 align="center">✨Thank You✨</h1>
