const express = require('express');
const db = require('../db');

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  // add functionality to account for headers on count and page
  db.query(`SELECT * FROM product WHERE ...`);
  // respond w data - transformed to how front end needs it
});

productRouter.get('/:product_id', (req, res) => {
  // return product w specific id
  db.query(`SELECT * FROM product WHERE product_id = ${req.params.product_id}`);
  // respond w data - transformed to how front end needs it
});

productRouter.get('/:product_id/styles', (req, res) => {
  // return all styles from id
  db.query(`SELECT * FROM styles WHERE product_id = ${req.params.product_id}`);
  // also need photos and skus
  // respond w data - transformed to how front end needs it
});

module.exports = productRouter;