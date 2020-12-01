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
const { DateTime } = require('luxon');
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
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
    console.log(this.props.store.maintenance);
    console.log(this.props.store.vehicleDetails);
    console.log(this.props.store.vehicleDetails.oil);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Maintenance for {this.props.store.vehicleDetails.name}</h1>
        </div>

        <div>
          <h4>Current Oil</h4>
          {this.props.store.vehicleDetails.oil &&
            this.props.store.vehicleDetails.oil.map((oilItem, index) => {
              const oilDate = DateTime.fromISO(oilItem.date);
              const humanOilDate = oilDate.toLocaleString(DateTime.DATE_SHORT);
              // console.log(oilDate);
              // console.log(humanOilDate);
              if (oilItem.miles_left > oilItem.miles_allowed * 0.2) {
                return (
                  <div key={index}>
                    <p>Miles Drove: {oilItem.miles_drove}</p>
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
                    <button>Change Oil</button>
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <p>Miles Drove: {oilItem.miles_drove}</p>
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
                    <button>Change Oil</button>
                  </div>
                );
              }
            })}
        </div>

        <div>
          <h4>Current Tires</h4>
          {this.props.store.vehicleDetails.tires &&
            this.props.store.vehicleDetails.tires.map((tireItem, index) => {
              const tireDate = DateTime.fromISO(tireItem.date);
              const humanTireDate = tireDate.toLocaleString(
                DateTime.DATE_SHORT
              );
              console.log(tireDate);
              console.log(humanTireDate);
              if (tireItem.miles_left > tireItem.miles_allowed * 0.2) {
                return (
                  <div key={index}>
                    <p>Miles Drove: {tireItem.miles_drove}</p>
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
                    <button>Change Tires</button>
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <p>Miles Drove: {tireItem.miles_drove}</p>
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
                    <button>Change Tires</button>
                  </div>
                );
              }
            })}
        </div>

        <div>
          <h2>Maintenance History</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Miles Drove</TableCell>
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
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(VehicleMaintenancePage);
