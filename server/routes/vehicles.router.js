const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM vehicles WHERE "user_id" = $1;';
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT vehicles', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const queryText = `INSERT INTO vehicles ("name", "image", "user_id") VALUES ($1, $2, $3);`;
  const queryValues = [req.body.name, req.body.image, req.body.user_id];
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
