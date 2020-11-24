const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM oil;';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT oil', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const queryText = `INSERT INTO oil ("active", "date", "miles_drove", "miles_allowed", "miles_left") VALUES ($1, $2, $3, $4, $5);`;
  const queryValues = [
    req.body.active,
    req.body.date,
    req.body.miles_drove,
    req.body.miles_allowed,
    req.body.miles_left,
  ];
  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error completing INSERT oil query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
