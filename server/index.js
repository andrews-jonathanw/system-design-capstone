require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());




app.get('/test',(req, res) => {
  console.log('hello from big daddy');
  res.end();
});


app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  }
});