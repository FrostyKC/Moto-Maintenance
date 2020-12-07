import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styling = (theme) =>
  createStyles({
    oilInput: {
      margin: '10px',
      verticalAlign: 'baseline',
    },
  });

class ChangeOilPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  state = {
    heading: 'Change Oil',
    oilChange: {
      active: true,
      date: new Date(),
      miles_drove: '',
      miles_allowed: '',
      vehicle_id: this.props.store.vehicleDetails.id,
    },
    oldOil: {
      active: false,
      vehicle_id: this.props.store.vehicleDetails.id,
    },
  };

  handleVehicleInputChange = (input) => (event) => {
    this.setState({
      oilChange: {
        ...this.state.oilChange,
        [input]: event.target.value,
      },
    });
  };

  handleOilDateChange = (event, date) => {
    this.setState({
      oilChange: {
        ...this.state.oilChange,
        date: date,
      },
    });
  };

  changeOilClick = (event) => {
    this.props.dispatch({
      type: 'UPDATE_OIL',
      payload: this.state.oldOil,
    });
    this.props.dispatch({
      type: 'POST_OIL',
      payload: this.state.oilChange,
    });
    this.props.history.push(
      `/vehicle/details/${this.props.store.vehicleDetails.id}`
    );
  };
  cancelOilClick = (event) => {
    this.props.history.push(
      `/vehicle/maintenance/${this.props.store.vehicleDetails.id}`
    );
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <h2>{this.state.heading}</h2>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
              className={this.props.classes.oilInput}
              disableToolbar
              autoOk
              variant="inline"
              format="MM/dd/yyyy"
              label="Date of Change"
              value={this.state.oilChange.date}
              onChange={this.handleOilDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </Grid> */}
          </MuiPickersUtilsProvider>
          <TextField
            className={this.props.classes.oilInput}
            margin="normal"
            helperText="Miles driven since last change"
            onChange={this.handleVehicleInputChange('miles_drove')}
          />
          <TextField
            className={this.props.classes.oilInput}
            margin="normal"
            helperText="Miles allowed before change"
            onChange={this.handleVehicleInputChange('miles_allowed')}
          />
        </div>
        <Button
          className={this.props.classes.oilInput}
          variant="contained"
          color="primary"
          onClick={this.cancelOilClick}
        >
          Cancel
        </Button>
        <Button
          className={this.props.classes.oilInput}
          variant="contained"
          color="secondary"
          onClick={this.changeOilClick}
        >
          Change Oil
        </Button>
      </div>
    );
  }
}

export default withStyles(styling)(connect(mapStoreToProps)(ChangeOilPage));
