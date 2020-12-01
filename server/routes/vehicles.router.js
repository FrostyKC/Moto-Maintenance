const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT vehicles.id, vehicles.name, vehicles.image, oil.miles_drove as oil_drove,
  oil.miles_allowed as oil_allowed, oil.miles_left as oil_left, tires.miles_drove as tires_drove,
  tires.miles_allowed as tires_allowed, tires.miles_left as tires_left FROM vehicles
  JOIN "oil" ON vehicles.id = oil.vehicle_id
  JOIN "tires" ON vehicles.id = tires.vehicle_id
  WHERE "user_id" = $1 AND oil.active = true AND tires.active = true;`;
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

router.get('/details/:id', (req, res) => {
  const queryText = `SELECT * FROM "vehicles"
  WHERE vehicles.id = $1;`;
  const vehicleId = req.params.id;
  pool
    .query(queryText, [vehicleId])
    .then((result) => {
      const vehicleDetails = result.rows[0];
      // console.log('1', result.rows);
      // console.log('1', result.rows[0]);

      const oilQueryText = `SELECT * FROM "oil"
      WHERE oil.vehicle_id = $1;`;

      pool
        .query(oilQueryText, [vehicleId])
        .then((result) => {
          const vehicleOil = result.rows;
          // console.log('2', result.rows);

          const tiresQueryText = `SELECT * FROM "tires"
          WHERE tires.vehicle_id = $1;`;

          pool
            .query(tiresQueryText, [vehicleId])
            .then((result) => {
              const vehicleTires = result.rows;

              res.send({
                ...vehicleDetails,
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
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const queryText = `INSERT INTO vehicles ("name", "image", "user_id") VALUES ($1, $2, $3) RETURNING "id";`;
  const queryValues = [req.body.name, req.body.image, req.body.user_id];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      const createdVehicleId = result.rows[0].id;
      const insertVehicleOilQuery = `
      INSERT INTO oil ("active", "date", "miles_drove", "miles_allowed", "miles_left", "vehicle_id")
      VALUES ($1, $2, $3, $4, $5, $6);`;
      const vehicleOilQueryValues = [
        true,
        req.body.oil_date,
        req.body.oil_miles_drove,
        req.body.oil_miles_allowed,
        req.body.oil_miles_allowed - req.body.oil_miles_drove,
        createdVehicleId,
      ];
      pool
        .query(insertVehicleOilQuery, vehicleOilQueryValues)
        .then((result) => {
          const insertVehicleTiresQuery = `
          INSERT INTO tires ("active", "date", "miles_drove", "miles_allowed", "miles_left", "vehicle_id")
          VALUES ($1, $2, $3, $4, $5, $6);`;
          const vehicleTiresQueryValues = [
            true,
            req.body.tires_date,
            req.body.tires_miles_drove,
            req.body.tires_miles_allowed,
            req.body.tires_miles_allowed - req.body.tires_miles_drove,
            createdVehicleId,
          ];
          pool
            .query(insertVehicleTiresQuery, vehicleTiresQueryValues)
            .then((result) => {
              res.sendStatus(201);
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
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
  const queryText = `UPDATE vehicles
  SET "name" = $1,
  "image" = $2
  WHERE id=$3;`;

  const queryValues = [req.body.name, req.body.image, req.body.id];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const oilQueryText = 'DELETE FROM oil WHERE vehicle_id=$1';
  pool
    .query(oilQueryText, [req.params.id])
    .then(() => {
      const tiresQueryText = 'DELETE FROM tires WHERE vehicle_id=$1';
      pool
        .query(tiresQueryText, [req.params.id])
        .then(() => {
          const tripsQueryText = 'DELETE FROM trips WHERE vehicle_id=$1';
          pool
            .query(tripsQueryText, [req.params.id])
            .then(() => {
              const vehicleQueryText = 'DELETE FROM vehicles WHERE id=$1';
              pool
                .query(vehicleQueryText, [req.params.id])
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
