const express = require('express');
const db = require('../db');


const qaRouter = express.Router();

qaRouter.get('/questions/:product_id', async (req, res) => {
  // add functionality to account for headers on count and page
  const query = await db.query(`SELECT * FROM question INNER JOIN answer ON answer.id_question = question.id WHERE question.product_id = ${req.params.product_id}`);
  res.send(query.rows);
});

module.exports = qaRouter;