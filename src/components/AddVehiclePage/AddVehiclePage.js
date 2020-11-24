import 'date-fns';
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
class AddVehiclePage extends Component {
  state = {
    heading: 'Add Vehicle Page',
    newVehicle: {
      name: '',
      image: '',
    },
    newOil: {
      date: new Date(),
      miles_drove: '',
      miles_allowed: '',
    },
    newTires: {
      date: new Date(),
      miles_drove: '',
      miles_allowed: '',
    },
  };

  handleVehicleInputChange = (input) => (event) => {
    this.setState({
      newVehicle: {
        ...this.state.newVehicle,
        [input]: event.target.value,
      },
    });
  };

  handleOilInputChange = (input) => (event) => {
    this.setState({
      newOil: {
        ...this.state.newOil,
        [input]: event.target.value,
      },
    });
  };

  handleOilDateChange = (event, date) => {
    this.setState({
      newOil: {
        date: date,
      },
    });
  };

  handleTiresInputChange = (input) => (event) => {
    this.setState({
      newTires: {
        ...this.state.newTires,
        [input]: event.target.value,
      },
    });
  };

  handleTiresDateChange = (event, date) => {
    this.setState({
      newTires: {
        date: date,
      },
    });
  };

  addToGarageClick = (event) => {
    this.props.dispatch({
      type: 'POST_VEHICLES',
      payload: this.state.newVehicle,
    });
    this.props.history.push('/garage');
  };

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.heading}</h2>
        </div>
        <div>
          <TextField
            label="Vehicle Name"
            onChange={this.handleVehicleInputChange('name')}
          />
          <TextField
            label="Image URL"
            onChange={this.handleVehicleInputChange('image')}
          />
        </div>
        <div>
          <h4>Oil</h4>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
              disableToolbar
              autoOk
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-oil"
              label="Date of Change"
              value={this.state.newOil.date}
              onChange={this.handleOilDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </Grid> */}
          </MuiPickersUtilsProvider>
          <TextField
            margin="normal"
            helperText="Miles driven since last change"
            onChange={this.handleOilInputChange('miles_drove')}
          />
          <TextField
            margin="normal"
            helperText="Miles allowed before change"
            onChange={this.handleOilInputChange('miles_allowed')}
          />
        </div>
        <div>
          <h4>Tires</h4>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
              autoOk
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-tires"
              label="Date of Change"
              value={this.state.newTires.date}
              onChange={this.handleTiresDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </Grid> */}
          </MuiPickersUtilsProvider>
          <TextField
            margin="normal"
            helperText="Miles driven since last change"
            onChange={this.handleTiresInputChange('miles_drove')}
          />
          <TextField
            margin="normal"
            helperText="Miles allowed before change"
            onChange={this.handleTiresInputChange('miles_allowed')}
          />
        </div>
        <button onClick={this.addToGarageClick}>Add to Garage</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddVehiclePage);
