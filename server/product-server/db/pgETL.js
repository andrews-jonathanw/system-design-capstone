const db = require('./');
const parseCSV = require('../csv-parser');
const schema = require('./schema');

const csvFiles = [
  'products',
  'features',
  'related',
  'styles',
  'photos',
  'skus'
];

const createTables = async () => {
  // try making each table in schema...
  try {
    // but clear them if they exist already
    await db.query('DROP TABLE IF EXISTS products, features, styles, photos, skus');
    for (const table in schema) {
      await db.query(table);
    }
  } catch (err) {
    console.error(err);
  }
}

const fileLoader = () => {
  csvFiles.forEach(file => {
    parseCSV(`./csv-data/${file}.csv`)
      .then((result) => {
        // returns result array with objects corresponding to headers on line 1 of csv
        // test log
        console.log(`first ${file}: `, result[0], `hundred-thousandth ${file}: `, result[100000]);
        // instead this will have functionality to load each result into the db
        // try out copy tomorrow morning
      })
      .catch(err => console.error(err));
  })
}

module.exports.ETL = fileLoader;