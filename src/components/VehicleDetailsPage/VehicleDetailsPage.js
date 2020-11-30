import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles } from '@material-ui/core/styles';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styling = (theme) =>
  createStyles({
    imgMedia: {
      height: '330px',
      backgroundSize: 'cover',
    },
  });

class VehicleDetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
    console.log(this.props.store.vehicleDetails);
    console.log(this.props.store.vehicleDetails.oil);
  }

  render() {
    return (
      <Grid>
        <h2>{this.props.store.vehicleDetails.name}</h2>
        <Grid item>
          <img
            className={this.props.classes.imgMedia}
            alt={this.props.store.vehicleDetails.name}
            src={this.props.store.vehicleDetails.image}
          />
          <button>Edit</button>
        </Grid>
        <Grid>
          <h2>Maintenance</h2>
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
          <button>View</button>
          <h2>Trips</h2>
          <button>Add a Trip</button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styling)(
  connect(mapStoreToProps)(VehicleDetailsPage)
);
