const express = require('express');
const db = require('../db');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  console.log()
  const query = await db.query(`SELECT * FROM product WHERE product.id >= ${(count * page) - (count - 1)} AND product.id <= ${page * count}`);
  res.send(query.rows);
});

productRouter.get('/:product_id', async (req, res) => {
  const query = await db.query(`
  SELECT
    product.id, product.name, product.slogan, product.description, product.category, product.default_price,
    ARRAY_AGG(row_to_json(f)) features
  FROM
    product
  INNER JOIN
    (SELECT product_id, feature, value FROM features) f ON f.product_id = product.id
  WHERE
    product.id = ${req.params.product_id}
  GROUP BY
   product.id
  `)
  res.send(query.rows[0]);
});

productRouter.get('/:product_id/styles', (req, res) => {
  // return all styles from id
  db.query(`SELECT * FROM styles WHERE product_id = ${req.params.product_id}`);
  // also need photos and skus
  // respond w data - transformed to how front end needs it
});

module.exports = productRouter;
