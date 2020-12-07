import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './VehicleDetailsPage.css';
import Button from '@material-ui/core/Button';

const { DateTime } = require('luxon');

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styling = (theme) =>
  createStyles({
    imgMedia: {
      width: '100%',
      backgroundSize: 'cover',
      margin: '10px',
    },
    paper: {
      textAlign: 'center',
      // margin: '5px',
    },
    maintenance: {
      display: 'inline',
    },
  });

class VehicleDetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_TRIPS',
      payload: this.props.match.params.id,
    });
    console.log(this.props.store.vehicleDetails);
    console.log(this.props.store.vehicleDetails.oil);
    console.log(this.props.store.trips);
  }

  vehicleDetailsEditClick = (event) => {
    this.props.history.push(
      `/vehicle/details/${this.props.store.vehicleDetails.id}/edit`
    );
  };

  vehicleDetailsViewClick = (event) => {
    this.props.history.push(
      `/vehicle/maintenance/${this.props.store.vehicleDetails.id}`
    );
  };

  vehicleDetailsAddTripClick = (event) => {
    this.props.history.push(
      `/vehicle/${this.props.store.vehicleDetails.id}/addtrip`
    );
  };

  render() {
    return (
      <Grid container spacing={1} className={this.props.classes.paper}>
        <Grid className={this.props.classes.paper} item xs={12}>
          <h2>{this.props.store.vehicleDetails.name} Details</h2>
        </Grid>
        <Grid container item xs={12} alignItems="flex-start">
          <Grid item xs={4}>
            <img
              className={this.props.classes.imgMedia}
              alt={this.props.store.vehicleDetails.name}
              src={this.props.store.vehicleDetails.image}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.vehicleDetailsEditClick}
              >
                Edit {this.props.store.vehicleDetails.name}
              </Button>
              {/* <button onClick={this.vehicleDetailsEditClick}>Edit</button> */}
            </div>
          </Grid>

          <Grid
            container
            item
            xs={8}
            className={this.props.classes.paper}
            alignItems="flex-end"
          >
            <Grid item xs={12}>
              <h2>Maintenance</h2>
            </Grid>
            <Grid item xs={4}>
              <h4>Oil Status</h4>
              {this.props.store.vehicleDetails.oil &&
                this.props.store.vehicleDetails.oil.map((oilItem, index) => {
                  if (oilItem.miles_left > oilItem.miles_allowed * 0.2) {
                    return (
                      <p key={index} style={{ color: 'green' }}>
                        {oilItem.miles_left} miles left
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} style={{ color: 'red' }}>
                        {oilItem.miles_left} miles left
                      </p>
                    );
                  }
                })}
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.vehicleDetailsViewClick}
              >
                Service {this.props.store.vehicleDetails.name}
              </Button>
              {/* <button onClick={this.vehicleDetailsViewClick}>View</button> */}
            </Grid>
            <Grid item xs={4}>
              <h4>Tire Status</h4>
              {this.props.store.vehicleDetails.tires &&
                this.props.store.vehicleDetails.tires.map((tireItem, index) => {
                  console.log(tireItem);
                  if (tireItem.miles_left > tireItem.miles_allowed * 0.2) {
                    return (
                      <p key={index} style={{ color: 'green' }}>
                        {tireItem.miles_left} miles left
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} style={{ color: 'red' }}>
                        {tireItem.miles_left} miles left
                      </p>
                    );
                  }
                })}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <h2>Trips</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={this.vehicleDetailsAddTripClick}
          >
            Add a Trip
          </Button>
          {/* <button onClick={this.vehicleDetailsAddTripClick}>Add a Trip</button> */}
          <TableContainer
            component={Paper}
            style={{ margin: '10px', width: 'auto' }}
            className={this.props.classes.paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#22B1C2' }}>Date</TableCell>
                  <TableCell style={{ color: '#22B1C2' }}>Name</TableCell>
                  <TableCell style={{ color: '#22B1C2' }}>
                    Starting Location
                  </TableCell>
                  <TableCell style={{ color: '#22B1C2' }}>
                    Ending Location
                  </TableCell>
                  <TableCell style={{ color: '#22B1C2' }}>Distance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.store.trips.map((tripItem, index) => {
                  const tripDate = DateTime.fromISO(tripItem.date);
                  const humanTripDate = tripDate.toLocaleString(
                    DateTime.DATE_SHORT
                  );

                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {humanTripDate}
                      </TableCell>
                      <TableCell>{tripItem.name}</TableCell>
                      <TableCell>{tripItem.start_point}</TableCell>
                      <TableCell>{tripItem.end_point}</TableCell>
                      <TableCell>{tripItem.total} miles</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styling)(
  connect(mapStoreToProps)(VehicleDetailsPage)
);
