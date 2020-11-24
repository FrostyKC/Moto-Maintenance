const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM vehicles;';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT vehicles', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const queryText = `INSERT INTO vehicles ("name", "image") VALUES ($1, $2);`;
  const queryValues = [req.body.name, req.body.image];
  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error completing INSERT vehicle query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
