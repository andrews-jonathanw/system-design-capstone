module.exports = {
  productsEntity:
  `CREATE TABLE products (
      id INT PRIMARY KEY,
      name VARCHAR,
      slogan VARCHAR,
      description VARCHAR,
      category VARCHAR,
      default_price INT
  );`,

  featuresEntity:
  `CREATE TABLE features (
      id INT PRIMARY KEY,
      product_id INT REFERENCES products (id),
      feature VARCHAR,
      value VARCHAR
  );`,

  stylesEntity:
  `CREATE TABLE styles (
      id INT PRIMARY KEY,
      product_id INT REFERENCES products (id),
      name VARCHAR,
      sale_price INT,
      original_price INT,
      default_style VARCHAR
  );`,

  photosEntity:
  `CREATE TABLE photos (
      id INT PRIMARY KEY,
      style_id INT REFERENCES styles (id),
      url VARCHAR,
      thumbnail_url VARCHAR
  );`,

  skusEntity:
  `CREATE TABLE skus (
      id INT PRIMARY KEY,
      style_id INT REFERENCES styles (id),
      size VARCHAR,
      quantity INT
  );`,

  relatedEntity:
  `CREATE TABLE skus (
      id INT PRIMARY KEY,
      current_product_id INT REFERENCES products (id),
      related_product_id INT REFERENCES products (id)
  );`,
}