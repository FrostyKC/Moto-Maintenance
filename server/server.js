const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const vehiclesRouter = require('./routes/vehicles.router');
const maintenanceRouter = require('./routes/maintenance.router');
const tripsRouter = require('./routes/trips.router');

const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/maintenance', maintenanceRouter);
app.use('/api/trips', tripsRouter);

app.use(
  '/s3',
  UploaderS3Router({
    bucket: 'frostybucket', // required
    region: 'us-east-2', // optional
    headers: { 'Access-Control-Allow-Origin': '*' }, // optional
    ACL: 'public-read', // this is the default - set to `public-read` to let anyone view uploads
  })
);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
