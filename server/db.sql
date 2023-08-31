-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'product'
--
-- ---

DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id SERIAL,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Product Information'
--
-- ---

DROP TABLE IF EXISTS Product_Information;

CREATE TABLE Product_Information (
  id SERIAL,
  Features TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (id)
);


-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date INT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviwer_email TEXT NOT NULL,
  response TEXT NOT NULL,
  helfulness INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'question'
--
-- ---

DROP TABLE IF EXISTS question;

CREATE TABLE question (
  id SERIAL,
  product_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written DATE NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'answer'
--
-- ---

DROP TABLE IF EXISTS answer;

CREATE TABLE answer (
  id SERIAL,
  id_question INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written DATE NOT NULL,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'archived-answers'
--
-- ---

DROP TABLE IF EXISTS archived_answers;

CREATE TABLE archived_answers (
  id_answer INTEGER NOT NULL,
  id SERIAL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'archived-questions'
--
-- ---

DROP TABLE IF EXISTS archived_questions;

CREATE TABLE archived_questions (
  id_question INTEGER NOT NULL,
  id SERIAL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'answer-photos'
--
-- ---

DROP TABLE IF EXISTS answer_photos;

CREATE TABLE answer_photos (
  id SERIAL,
  id_answer INTEGER NOT NULL,
  url TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Style'
--
-- ---

DROP TABLE IF EXISTS Style;

CREATE TABLE Style (
  id SERIAL,
  id_Product_Styles INTEGER NOT NULL,
  name TEXT NOT NULL,
  original_price INTEGER NOT NULL,
  sale_price INTEGER NOT NULL,
  style BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Product-Styles'
--
-- ---

DROP TABLE IF EXISTS Product_Styles;

CREATE TABLE Product_Styles (
  id SERIAL,
  product_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

---
-- Table 'Style-Photos'
--
-- ---

DROP TABLE IF EXISTS Style_Photos;

CREATE TABLE Style_Photos (
  id SERIAL,
  id_Style INTEGER NOT NULL,
  thumbnail_url TEXT NOT NULL,
  url TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'SKUs'
--
-- ---

DROP TABLE IF EXISTS SKUs;

CREATE TABLE SKUs (
  id SERIAL,
  id_Style INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  size TEXT NOT NULL,
  PRIMARY KEY (id)
);



-- ---
-- Table 'Review-Photos'
--
-- ---

DROP TABLE IF EXISTS review_photos;

CREATE TABLE review_photos (
  id SERIAL,
  id_reviews INTEGER NOT NULL,
  url TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'archived-reviews'
--
-- ---

DROP TABLE IF EXISTS archived_reviews;

CREATE TABLE archived_reviews(
  id SERIAL,
  id_reviews INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'reviews-meta-data'
--
-- ---

DROP TABLE IF EXISTS reviews_meta_data;

CREATE TABLE reviews_meta_data (
  product_id INTEGER NULL,
  id SERIAL,
  PRIMARY KEY (id)
);


-- ---
-- Table 'ratings'
--
-- ---

DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings (
  id SERIAL,
  id_reviews_meta_data INTEGER NOT NULL,
  one INTEGER NOT NULL,
  two INTEGER NOT NULL,
  three INTEGER NOT NULL,
  four INTEGER NOT NULL,
  five INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'recommended-meta'
--
-- ---

DROP TABLE IF EXISTS recommended_meta;

CREATE TABLE recommended_meta (
  id SERIAL,
  id_reviews_meta_data INTEGER NOT NULL,
  zero INTEGER NOT NULL,
  one INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL,
  product_id INTEGER NULL,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'characteristic-rating'
--
-- ---

DROP TABLE IF EXISTS characteristic_rating;

CREATE TABLE characteristic_rating (
  id SERIAL,
  id_characteristics INTEGER NULL,
  id_reviews INTEGER NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);


-- ---
-- Foreign Keys
-- ---









ALTER TABLE Product_Information ADD FOREIGN KEY (id) REFERENCES product (id);
ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE question ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE answer ADD FOREIGN KEY (id_question) REFERENCES question (id);
ALTER TABLE archived_answers ADD FOREIGN KEY (id_answer) REFERENCES answer (id);
ALTER TABLE archived_questions ADD FOREIGN KEY (id_question) REFERENCES question (id);
ALTER TABLE answer_photos ADD FOREIGN KEY (id_answer) REFERENCES answer (id);
ALTER TABLE Style ADD FOREIGN KEY (id_Product_Styles) REFERENCES Product_Styles (id);
ALTER TABLE Product_Styles ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE Style_Photos ADD FOREIGN KEY (id_Style) REFERENCES Style (id);
ALTER TABLE SKUs ADD FOREIGN KEY (id_Style) REFERENCES Style (id);
ALTER TABLE review_photos ADD FOREIGN KEY (id_reviews) REFERENCES reviews (id);
ALTER TABLE reviews_meta_data ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE ratings ADD FOREIGN KEY (id_reviews_meta_data) REFERENCES reviews_meta_data (id);
ALTER TABLE recommended_meta ADD FOREIGN KEY (id_reviews_meta_data) REFERENCES reviews_meta_data (id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE characteristic_rating ADD FOREIGN KEY (id_characteristics) REFERENCES characteristics (id);
ALTER TABLE characteristic_rating ADD FOREIGN KEY (id_reviews) REFERENCES reviews (id);





-- ---
-- Table Properties
-- ---

-- ALTER TABLE product ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Product Information ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE   reviews ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE question ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE answer ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE archived-answers ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE archived-questions ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE answer-photos ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Style ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Product-Styles ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Style-Photos ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE SKUs ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Review-Results ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Review-Photos ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE archived-reviews ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE reviews-meta-data ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE ratings ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE recommended-meta ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE characteristics ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE size ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE width ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE comfort ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE quality ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE fit ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE length ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO product (id,name,slogan,description,category price) VALUES
-- ('','','','','','');
-- INSERT INTO Product Information (id,Features,value) VALUES
-- ('','','');
-- INSERT INTO   reviews (product_id,id,page,count) VALUES
-- ('','','','');
-- INSERT INTO question (product_id,id,body,date_written,asker_name,question_helpfulness,reported) VALUES
-- ('','','','','','','');
-- INSERT INTO answer (id_question,id,body,date,answerer_name,helpfulness,reported) VALUES
-- ('','','','','','','');
-- INSERT INTO archived-answers (id_answer,id) VALUES
-- ('','');
-- INSERT INTO archived-questions (id_question,id) VALUES
-- ('','');
-- INSERT INTO answer-photos (id_answer,id,photo1,photo2,photo3,photo4,photo5) VALUES
-- ('','','','','','','');
-- INSERT INTO Style (id,id_Product-Styles,name,original_price,sale_price) VALUES
-- ('','','','','','');
-- INSERT INTO Product-Styles (id,product_id) VALUES
-- ('','');
-- INSERT INTO Style-Photos (id,id_Style,thumbnail_url,url) VALUES
-- ('','','','');
-- INSERT INTO SKUs (id,id_Style,quantity,size) VALUES
-- ('','','','');
-- INSERT INTO Review-Results (id_  reviews,id,rating,summary,recommended,response,body,date,reviewer-name,helpfulness) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO Review-Photos (id,id_Review-Results,photo1,photo2,photo3,photo4,photo5) VALUES
-- ('','','','','','','');
-- INSERT INTO archived-reviews (id,id_  reviews) VALUES
-- ('','');
-- INSERT INTO reviews-meta-data (product_id,id) VALUES
-- ('','');
-- INSERT INTO ratings (id,id_reviews-meta-data,1,2,3,4,5) VALUES
-- ('','','','','','','');
-- INSERT INTO recommended-meta (id,id_reviews-meta-data,0,1) VALUES
-- ('','','','');
-- INSERT INTO characteristics (id,id_reviews-meta-data) VALUES
-- ('','');
-- INSERT INTO size (id,id_characteristics,value) VALUES
-- ('','','');
-- INSERT INTO width (id,id_characteristics,value) VALUES
-- ('','','');
-- INSERT INTO comfort (id,id_characteristics,value) VALUES
-- ('','','');
-- INSERT INTO quality (id,value,id_characteristics) VALUES
-- ('','','');
-- INSERT INTO fit (id,id_characteristics,value) VALUES
-- ('','','');
-- INSERT INTO length (id,id_characteristics,value) VALUES
-- ('','','');


-- Table Properties
-- ---

-- ALTER TABLE product ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE   reviews ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Review-Photos ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE characteristic-rating ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE reviews-meta-data ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE characteristics ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO product (id,name,slogan,description,category price) VALUES
-- ('','','','','','');
-- INSERT INTO   reviews (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviwer_email,response,helfulness) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO Review-Photos (id,id_  reviews,url) VALUES
-- ('','','');
-- INSERT INTO characteristic-rating (id,id_characteristics,id_  reviews,value) VALUES
-- ('','','','');
-- INSERT INTO reviews-meta-data (product_id,id) VALUES
-- ('','');
-- INSERT INTO characteristics (id,product_id,id_reviews-meta-data,name) VALUES
-- ('','','','');