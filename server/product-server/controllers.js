const express = require('express');

const productRouter = express.Router();

productRouter.get('/', () => {
  console.log('Do some queries for getting all the products');
});

productRouter.get('/:product_id', () => {
  console.log('Do a query for getting info for specific product id');
});

productRouter.get('/:product_id/styles', () => {
  console.log('Do a query for getting styles for specific product id');
});

productRouter.get('/:product_id/related', () => {
  console.log('Do a query for getting related product id\'s for a product');
});

module.exports = productRouter;