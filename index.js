const express = require('express')

const { specs } = require('./swagger');
const swaggerUI = require("swagger-ui-express");

const connection = require('./config/db');
const router = require('./routes/product.route');
const productRouter = require('./routes/product.route');
const reviewRouter = require('./routes/review.route');
// const errorHandlerMiddleware = require('./middlewares/errorHandler');
// const requestLoggerMiddleware = require('./middlewares/requestLogger');

require('dotenv').config()
const app = express()
app.use(express.json())

//Middlewares
// app.use(requestLoggerMiddleware);
// app.use(errorHandlerMiddleware)

//swagger config
const CSS_URL ="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

// Apply rate limiting to specific routes

//Routes
app.use(productRouter);
app.use(reviewRouter);

app.get('/', (req, res) => {
    res.json('welcome')
})

app.listen(process.env.PORT||8000, async () => {
    try {
        await connection
        console.log('connected to db');
        console.log(`server is running at ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})