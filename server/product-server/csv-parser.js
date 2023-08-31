const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// probably won't use this, will keep it here just in case
module.exports = (pathname) => {
    let results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, pathname))
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
    });
  };
