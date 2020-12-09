import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './VehicleMaintenancePage.css';

const { DateTime } = require('luxon');
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styling = (theme) =>
  createStyles({
    container: {
      textAlign: 'center',
    },
  });
class VehicleMaintenancePage extends Component {
  state = {
    heading: 'Class Component',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MAINTENANCE_DETAILS',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  changeOilClick = (event) => {
    this.props.history.push(
      `/vehicle/maintenance/${this.props.store.vehicleDetails.id}/changeOil`
    );
  };
  changeTiresClick = (event) => {
    this.props.history.push(
      `/vehicle/maintenance/${this.props.store.vehicleDetails.id}/changeTires`
    );
  };

  backToGarageClick = (event) => {
    this.props.history.push(
      `/vehicle/details/${this.props.store.vehicleDetails.id}`
    );
  };

  render() {
    return (
      <Grid container className={this.props.classes.container}>
        <Grid item xs={12}>
          <h1>Maintenance for {this.props.store.vehicleDetails.name}</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={this.backToGarageClick}
          >
            Back to {this.props.store.vehicleDetails.name}
          </Button>
        </Grid>

        <Grid item xs={6}>
          <h2>Current Oil</h2>
          {this.props.store.vehicleDetails.oil &&
            this.props.store.vehicleDetails.oil.map((oilItem, index) => {
              const oilDate = DateTime.fromISO(oilItem.date);
              const humanOilDate = oilDate.toLocaleString(DateTime.DATE_SHORT);
              // console.log(oilDate);
              // console.log(humanOilDate);
              if (oilItem.miles_left > oilItem.miles_allowed * 0.2) {
                return (
                  <div key={index}>
                    <p>Miles Driven: {oilItem.miles_drove}</p>
                    <p>Date last changed: {humanOilDate}</p>
                    <p>
                      Miles left until next change:
                      <span style={{ color: 'green' }}>
                        {' '}
                        {oilItem.miles_left}
                      </span>
                    </p>
                    <p>
                      Miles allowed: <strong>{oilItem.miles_allowed}</strong>
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.changeOilClick}
                    >
                      Change Oil
                    </Button>
                    {/* <button onClick={this.changeOilClick}>Change Oil</button> */}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <p>Miles Driven: {oilItem.miles_drove}</p>
                    <p>Date last changed: {humanOilDate}</p>
                    <p>
                      Miles left until next change:
                      <span style={{ color: 'red' }}>
                        {' '}
                        {oilItem.miles_left}
                      </span>
                    </p>
                    <p>
                      Miles allowed: <strong>{oilItem.miles_allowed}</strong>
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.changeOilClick}
                    >
                      Change Oil
                    </Button>
                    {/* <button onClick={this.changeOilClick}>Change Oil</button> */}
                  </div>
                );
              }
            })}
        </Grid>

        <Grid item xs={6}>
          <h2>Current Tires</h2>
          {this.props.store.vehicleDetails.tires &&
            this.props.store.vehicleDetails.tires.map((tireItem, index) => {
              const tireDate = DateTime.fromISO(tireItem.date);
              const humanTireDate = tireDate.toLocaleString(
                DateTime.DATE_SHORT
              );
              // console.log(tireDate);
              // console.log(humanTireDate);
              if (tireItem.miles_left > tireItem.miles_allowed * 0.2) {
                return (
                  <div key={index}>
                    <p>Miles Driven: {tireItem.miles_drove}</p>
                    <p>Date last changed: {humanTireDate}</p>
                    <p>
                      Miles left until next change:
                      <span style={{ color: 'green' }}>
                        {' '}
                        {tireItem.miles_left}
                      </span>
                    </p>
                    <p>
                      Miles allowed: <strong>{tireItem.miles_allowed}</strong>
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.changeTiresClick}
                    >
                      Change Tires
                    </Button>
                    {/* <button onClick={this.changeTiresClick}>
                      Change Tires
                    </button> */}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <p>Miles Driven: {tireItem.miles_drove}</p>
                    <p>Date last changed: {humanTireDate}</p>
                    <p>
                      Miles left until next change:
                      <span style={{ color: 'red' }}>
                        {' '}
                        {tireItem.miles_left}
                      </span>
                    </p>
                    <p>
                      Miles allowed: <strong>{tireItem.miles_allowed}</strong>
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.changeTiresClick}
                    >
                      Change Tires
                    </Button>
                    {/* <button onClick={this.changeTiresClick}>
                      Change Tires
                    </button> */}
                  </div>
                );
              }
            })}
        </Grid>

        <Grid item xs={12}>
          <h2>Maintenance History</h2>
          <TableContainer
            component={Paper}
            style={{ margin: '10px', width: 'auto' }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#22B1C2' }}>Date</TableCell>
                  <TableCell style={{ color: '#22B1C2' }}>Type</TableCell>
                  <TableCell style={{ color: '#22B1C2' }}>
                    Miles Driven
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.store.maintenance.oil &&
                  this.props.store.maintenance.oil.map((oilItem, index) => {
                    const oilDate = DateTime.fromISO(oilItem.date);
                    const humanOilDate = oilDate.toLocaleString(
                      DateTime.DATE_SHORT
                    );

                    return (
                      <TableRow key={index}>
                        <TableCell>{humanOilDate}</TableCell>
                        <TableCell>Oil</TableCell>
                        <TableCell>{oilItem.miles_drove}</TableCell>
                      </TableRow>
                    );
                  })}
                {this.props.store.maintenance.tires &&
                  this.props.store.maintenance.tires.map((tireItem, index) => {
                    const tireDate = DateTime.fromISO(tireItem.date);
                    const humanTireDate = tireDate.toLocaleString(
                      DateTime.DATE_SHORT
                    );

                    return (
                      <TableRow key={index}>
                        <TableCell>{humanTireDate}</TableCell>
                        <TableCell>Tires</TableCell>
                        <TableCell>{tireItem.miles_drove}</TableCell>
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
  connect(mapStoreToProps)(VehicleMaintenancePage)
);
