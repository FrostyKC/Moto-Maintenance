const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', (req, res) => {
  const queryText = `SELECT * FROM "trips"
  WHERE vehicle_id = $1 ORDER BY date desc;`;
  const vehicleId = req.params.id;
  pool
    .query(queryText, [vehicleId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT trips', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const queryText = `INSERT INTO trips ("name", "start_point", "end_point", "date", "roundtrip", "total", "vehicle_id") VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  const queryValues = [
    req.body.name,
    req.body.start_point,
    req.body.end_point,
    req.body.date,
    req.body.roundtrip,
    req.body.total,
    req.body.vehicle_id,
  ];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error saving trip', err);
      res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
  const oilQueryText = `UPDATE oil
  SET "miles_drove" = "miles_drove" + $1,
  "miles_left" = "miles_left" - $1
  WHERE vehicle_id=$2 AND active = true;`;

  const queryValues = [req.body.total, req.body.vehicle_id];

  pool
    .query(oilQueryText, queryValues)
    .then(() => {
      const tireQueryText = `UPDATE tires
      SET "miles_drove" = "miles_drove" + $1,
      "miles_left" = "miles_left" - $1
      WHERE vehicle_id=$2 AND active = true;`;

      // const tireQueryValues = [req.body.total, req.body.vehicleId];

      pool
        .query(tireQueryText, queryValues)
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
