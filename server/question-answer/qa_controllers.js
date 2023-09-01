const express = require('express');
const db = require('../db');


const qaRouter = express.Router();

qaRouter.get('/questions/:product_id', async (req, res) => {
  // add functionality to account for headers on count and page
  const query = await db.query(`SELECT * FROM question WHERE product_id = ${req.params.product_id}`);
  res.send(query.rows[0]);
});

module.exports = qaRouter;