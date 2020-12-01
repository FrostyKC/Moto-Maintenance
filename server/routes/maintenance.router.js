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

module.exports = router;
