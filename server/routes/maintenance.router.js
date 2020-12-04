const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
  const oilQueryText = `SELECT * FROM "oil"
      WHERE oil.vehicle_id = $1;`;

  const vehicleId = req.params.id;
  pool
    .query(oilQueryText, [vehicleId])
    .then((result) => {
      const vehicleOil = result.rows;

      const tiresQueryText = `SELECT * FROM "tires"
          WHERE tires.vehicle_id = $1;`;

      pool
        .query(tiresQueryText, [vehicleId])
        .then((result) => {
          const vehicleTires = result.rows;

          res.send({
            oil: vehicleOil,
            tires: vehicleTires,
          });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/oil', (req, res) => {
  const queryText = `INSERT INTO oil ("active", "date", "miles_drove", "miles_allowed", "miles_left", "vehicle_id") VALUES ($1, $2, $3, $4, $5, $6);`;
  const queryValues = [
    true,
    req.body.date,
    req.body.miles_drove,
    req.body.miles_allowed,
    req.body.miles_allowed - req.body.miles_drove,
    req.body.vehicle_id,
  ];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/tires', (req, res) => {
  const queryText = `INSERT INTO tires ("active", "date", "miles_drove", "miles_allowed", "miles_left", "vehicle_id") VALUES ($1, $2, $3, $4, $5, $6);`;
  const queryValues = [
    true,
    req.body.date,
    req.body.miles_drove,
    req.body.miles_allowed,
    req.body.miles_allowed - req.body.miles_drove,
    req.body.vehicle_id,
  ];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/oil', (req, res) => {
  const queryText = `UPDATE oil
  SET "active" = $1
  WHERE vehicle_id=$2 AND active=true;`;

  const queryValues = [false, req.body.vehicle_id];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.put('/tires', (req, res) => {
  const queryText = `UPDATE tires
  SET "active" = $1
  WHERE vehicle_id=$2 AND active=true;`;

  const queryValues = [false, req.body.vehicle_id];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
