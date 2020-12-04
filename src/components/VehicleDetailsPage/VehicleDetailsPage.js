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
    },
    paper: {
      textAlign: 'center',
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
              <button onClick={this.vehicleDetailsEditClick}>Edit</button>
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
              <button onClick={this.vehicleDetailsViewClick}>View</button>
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

        <Grid item xs={12} className={this.props.classes.paper}>
          <h2>Trips</h2>
          <button onClick={this.vehicleDetailsAddTripClick}>Add a Trip</button>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Starting Location</TableCell>
                  <TableCell>Ending Location</TableCell>
                  <TableCell>Total distance</TableCell>
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
                      <TableCell>{humanTripDate}</TableCell>
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
          {/* {this.props.store.trips.map((tripItem, index) => {
            const tripDate = DateTime.fromISO(tripItem.date);
            const humanTripDate = tripDate.toLocaleString(DateTime.DATE_SHORT);
            return (
              <p key={index}>
                {humanTripDate} {}
                {tripItem.name} {}
                {tripItem.start_point} {}
                {tripItem.end_point} {}
                {tripItem.total} miles
              </p>
            );
          })} */}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styling)(
  connect(mapStoreToProps)(VehicleDetailsPage)
);
