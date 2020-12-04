import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ChangeTiresPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  state = {
    heading: 'Change Tires Page',
    tireChange: {
      date: new Date(),
      miles_drove: '',
      miles_allowed: '',
      vehicle_id: this.props.store.vehicleDetails.id,
    },
    oldTires: {
      active: false,
      vehicle_id: this.props.store.vehicleDetails.id,
    },
  };

  handleVehicleInputChange = (input) => (event) => {
    this.setState({
      tireChange: {
        ...this.state.tireChange,
        [input]: event.target.value,
      },
    });
  };

  handleTireDateChange = (event, date) => {
    this.setState({
      tireChange: {
        ...this.state.tireChange,
        date: date,
      },
    });
  };

  changeTireClick = (event) => {
    this.props.dispatch({
      type: 'UPDATE_TIRES',
      payload: this.state.oldTires,
    });
    this.props.dispatch({
      type: 'POST_TIRES',
      payload: this.state.tireChange,
    });
    this.props.history.push(
      `/vehicle/maintenance/${this.props.store.vehicleDetails.id}`
    );
  };

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.heading}</h2>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
              disableToolbar
              autoOk
              variant="inline"
              format="MM/dd/yyyy"
              label="Date of Change"
              value={this.state.tireChange.date}
              onChange={this.handleTireDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </Grid> */}
          </MuiPickersUtilsProvider>
          <TextField
            margin="normal"
            helperText="Miles driven since last change"
            onChange={this.handleVehicleInputChange('miles_drove')}
          />
          <TextField
            margin="normal"
            helperText="Miles allowed before change"
            onChange={this.handleVehicleInputChange('miles_allowed')}
          />
        </div>
        <button onClick={this.changeTireClick}>Change Tires</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChangeTiresPage);
