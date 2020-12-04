import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AddTripPage extends Component {
  state = {
    heading: 'Add Trip Page',
    startDisabled: false,
    endDisabled: false,
    addTrip: {
      name: '',
      start_point: '',
      end_point: '',
      date: new Date(),
      roundtrip: '',
      total: '',
    },
  };

  componentDidMount() {
    if ('geolocation' in navigator) {
      console.log('it will work');
    } else {
      console.log('geolocation is not available on this browser');
    }
  }

  handleTripInputChange = (input) => (event) => {
    this.setState({
      addTrip: {
        ...this.state.addTrip,
        [input]: event.target.value,
        roundtrip: event.target.checked,
      },
    });
  };

  handleTripDateChange = (event, date) => {
    this.setState({
      addTrip: {
        ...this.state.addTrip,
        date: date,
      },
    });
  };

  getStartingLocation = (event) => {
    navigator.geolocation.getCurrentPosition(this.startSuccess, this.error);
    this.setState({
      startDisabled: !this.state.startDisabled,
    });
  };
  startSuccess = (pos) => {
    let cords = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${cords.latitude}`);
    console.log(`Longitude: ${cords.longitude}`);
    this.setState({
      addTrip: {
        ...this.state.addTrip,
        start_point: [cords.latitude, cords.longitude],
      },
    });
  };

  getEndingLocation = (event) => {
    navigator.geolocation.getCurrentPosition(this.endingSuccess, this.error);
    this.setState({
      endDisabled: !this.state.endDisabled,
    });
  };
  endingSuccess = (pos) => {
    let cords = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${cords.latitude}`);
    console.log(`Longitude: ${cords.longitude}`);
    this.setState({
      addTrip: {
        ...this.state.addTrip,
        end_point: [cords.latitude, cords.longitude],
      },
    });
  };

  error = (err) => {
    console.log(err);
  };

  submitTrip = (event) => {
    let origin1 = this.state.addTrip.start_point;
    if (this.state.startDisabled) {
      origin1 = new window.google.maps.LatLng(
        ...this.state.addTrip.start_point
      );
    }
    let destination1 = this.state.addTrip.end_point;
    if (this.state.endDisabled) {
      destination1 = new window.google.maps.LatLng(
        ...this.state.addTrip.end_point
      );
    }
    const distanceService = new window.google.maps.DistanceMatrixService();
    let service = distanceService;
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destination1],
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        console.log(response);
        console.log(status);
        if (status !== 'OK') {
          alert(`Error was: ${status}`);
        } else {
          let originList = response.originAddresses;
          let destinationList = response.destinationAddresses;

          for (let i = 0; i < originList.length; i++) {
            let results = response.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
              let element = results[j];
              let distance = parseInt(element.distance.text);
              let from = originList[i];
              let to = destinationList[j];
              console.log(
                `Starting Location: ${from} Ending Location: ${to} Distance: ${distance} miles`
              );
              if (this.state.addTrip.roundtrip) {
                distance *= 2;
                console.log(distance);
              }
              this.setState({
                addTrip: {
                  ...this.state.addTrip,
                  total: distance,
                },
              });
            }
          }
        }
      }
    );
    // send data to db and sub miles from tires and oil
  };

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.heading}</h2>
          <pre>
            {JSON.stringify(
              `${this.state.startDisabled} ${this.state.endDisabled}`
            )}
          </pre>
          <pre>{JSON.stringify(this.state.addTrip)}</pre>
        </div>
        <TextField
          label="Trip Name"
          variant="outlined"
          value={this.state.addTrip.name}
          onChange={this.handleTripInputChange('name')}
        />
        <TextField
          label="Starting Location"
          variant="outlined"
          value={this.state.addTrip.start_point}
          onChange={this.handleTripInputChange('start_point')}
          disabled={this.state.startDisabled ? 'disabled' : ''}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.getStartingLocation}
        >
          Get current Location
        </Button>

        <TextField
          label="Ending Location"
          variant="outlined"
          value={this.state.addTrip.end_point}
          onChange={this.handleTripInputChange('end_point')}
          disabled={this.state.endDisabled ? 'disabled' : ''}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.getEndingLocation}
        >
          Get current Location
        </Button>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            autoOk
            variant="inline"
            format="MM/dd/yyyy"
            label="Date of trip:"
            value={this.state.addTrip.date}
            onChange={this.handleTripDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <FormControlLabel
          control={<Checkbox name="roundTrip" />}
          label="Roundtrip?"
          onChange={this.handleTripInputChange('roundtrip')}
        />
        <Button variant="contained" color="primary" onClick={this.submitTrip}>
          Add Trip
        </Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddTripPage);
