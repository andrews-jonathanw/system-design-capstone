const express = require('express');
const db = require('../db');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  storage: db
});

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const query = await db.query(`SELECT * FROM product WHERE product.id >= ${(count * page) - count + 1} AND product.id <= ${page * count}`);
  res.send(query.rows);
});

productRouter.get('/:product_id', async (req, res) => {
  // const query = await db.query(`
  // SELECT
  //   product.id, product.name, product.slogan, product.description, product.category, product.default_price,
  //   ARRAY_AGG(row_to_json(f)) features
  // FROM
  //   product
  // INNER JOIN
  //   (SELECT product_id, feature, value FROM features) f ON f.product_id = product.id
  // WHERE
  //   product.id = ${req.params.product_id}
  // GROUP BY
  //   product.id
  // `);
  const query = await sequelize.findAll({
    attributes: [[Sequelize.fn('array_agg', Sequelize.col('product_id', 'feature', 'value')), 'features']],
    where: { product_id = req.params.product_id },
    group: ['product_id']
  })
  res.send(query.rows[0]);
});

productRouter.get('/:product_id/styles', async (req, res) => {
  // return all styles from id
  const query = await db.query(`
  WITH

  `);
  res.send(query.rows);
  // also need photos and skus
  // respond w data - transformed to how front end needs it
});

module.exports = productRouter;
