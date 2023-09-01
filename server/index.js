require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const productRouter = require('./product-server/controllers');

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.use('/products', productRouter);

app.get('/test',(req, res) => {

});


app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  }
});
