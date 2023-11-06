const swaggerJSDoc = require("swagger-jsdoc");
const path=require('path')

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Product Management API",
            version: "1.0.0",
            description: "This API provides comprehensive functionality for managing tasks. Users can create, retrieve, update, and delete tasks. Additionally, it offers user authentication for secure access to task management features. Explore the API endpoints to streamline your task management process."
        },
        servers: [
            {
                url: "https://product-management-api-theta.vercel.app/",
                description: "Deployed server",
            },
            {
                url: "http://localhost:8000",
                description: "Local server",
            },
        ],
    },
    apis: [path.join(__dirname, "swagger.yaml")],
};
const specs = swaggerJSDoc(options);
module.exports={specs}