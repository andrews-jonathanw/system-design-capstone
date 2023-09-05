const express = require('express');
const db = require('../db');

const reviewsRouter = express.Router();

reviewsRouter.get('/', (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  const queryString = `SELECT
  reviews.id,
  reviews.product_id,
  reviews.rating,
  reviews.date,
  reviews.summary,
  reviews.body,
  reviews.recommend,
  reviews.reviewer_name,
  reviews.response,
  reviews.helfulness,
  ARRAY_AGG(JSON_BUILD_OBJECT(
    'id', review_photos.id,
    'url' , review_photos.url
  )) AS photos
  FROM reviews
  LEFT JOIN review_photos on reviews.id = review_photos.id_reviews
  WHERE reviews.id >= ${(count * page) - count + 1} AND reviews.id <= ${page * count} AND reviews.reported=false
  GROUP BY reviews.id`

  var query = db.query(queryString).then((result) => {
    console.log(result.rows)
    res.send(result.rows);
  })

  // respond w data - transformed to how front end needs it
});

reviewsRouter.get('/meta/:product_id', (req, res) => {

  const queryString = `SELECT reviews.product_id,
  json_build_object(
   'ratings' , JSON_BUILD_OBJECT(
  '1' , count(reviews.rating) FILTER (where reviews.rating = 1),
  '2' , count(reviews.rating) FILTER (where reviews.rating = 2),
  '3' , count(reviews.rating) FILTER (where reviews.rating = 3),
  '4' , count(reviews.rating) FILTER (where reviews.rating = 4),
  '5' , count(reviews.rating) FILTER (where reviews.rating = 5)
  )
) AS ratings,
  json_build_object(
   'recommend' , JSON_BUILD_OBJECT(
  '0' , count(reviews.recommend) FILTER (where reviews.recommend = TRUE ),
  '1' , count(reviews.recommend) FILTER (where reviews.recommend = FALSE)
  )
) AS recommend,
  jsonb_object_agg(
  characteristics.name, jsonb_build_object(
  'id' , characteristic_rating.id_characteristics,
  'value' , characteristic_rating.value
  )
) AS Characteristics
from reviews
INNER JOIN characteristics on characteristics.product_id = reviews.product_id
INNER JOIN  characteristic_rating ON characteristic_rating.id_characteristics = characteristics.id
where reviews.product_id = ${req.params.product_id}
GROUP BY reviews.product_id`
var query = db.query(queryString).then((result) => {
  console.log(result.rows)
  res.send(result.rows);
})
});

reviewsRouter.put('/:review_id/helfulness', (req, res) => {
  const queryString = `UPDATE reviews SET helfulness=helfulness + 1 WHERE "id"=${req.params.review_id}`
  var query = db.query(queryString).then((result) => {
    res.status(204);
    res.send();
  })

});

reviewsRouter.put('/:review_id/report', (req, res) => {
  const queryString =` UPDATE reviews SET reported=true WHERE "id"=${req.params.review_id}`
  var query = db.query(queryString).then((result) => {
    res.status(204);
    res.send();
  })
});

reviewsRouter.post('/', (req, res) => {
  req.body.characteristics =  { "1": 5, "2": 5, "3" : 5, "4": 5 }
  const queryReviewString = `insert into
  reviews (
    product_id,
    rating,
    "date",
    summary,
    body,
    recommend,
    reported,
    reviewer_name,
    reviwer_email,
    response,
    helfulness
  )
values
  (
    ${req.body.product_id},
    ${req.body.rating},
    NOW()::timestamp(0),
    '${req.body.summary}',
    '${req.body.body}',
    ${req.body.recommend},
    false,
    '${req.body.name}',
    '${req.body.email}',
    'null',
    0
  )
  RETURNING id`
  var query = db.query(queryReviewString).then((result) => {
    console.log(result.rows[0].id)
    const reviewId = result.rows[0].id;
    const photoQuery = `insert into
    review_photos (
      id_reviews,
      url
    )
  values
    (
      '${reviewId}',
      '${req.body.photos[i]}'
    )`
    for ( var key in req.body.characteristics) {
      const characteristicsQuery = `insert into
      characteristic_rating (
        id_characteristics,
        id_reviews,
        "value"
      )
    values
      (
        '${key}',
        '${reviewId}',
        '${req.body.characteristics[key]}'
      );`
      db.query(characteristicsQuery).then((result) => {
      })

    }
    for ( var i = 0; i < req.body.photos.length; i++) {
      db.query(photoQuery).then((result) => {
      })
    }
  })
  res.status(204)
  res.send()
});

module.exports = reviewsRouter;


