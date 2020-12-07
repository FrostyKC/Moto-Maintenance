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
import { withStyles, createStyles } from '@material-ui/core/styles';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styling = (theme) =>
  createStyles({
    tripInput: {
      margin: '10px',
      verticalAlign: 'baseline',
    },
  });

class AddTripPage extends Component {
  state = {
    heading: 'Add a Trip',
    startDisabled: false,
    endDisabled: false,
    addTrip: {
      name: '',
      start_point: '',
      end_point: '',
      date: new Date(),
      roundtrip: '',
      total: '',
      vehicle_id: this.props.store.vehicleDetails.id,
    },
  };

  componentDidMount() {
    console.log(this.props);
    if ('geolocation' in navigator) {
      console.log('it will work');
    } else {
      console.log('geolocation is not available on this browser');
    }
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
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

  cancelTrip = (event) => {
    this.props.history.push(
      `/vehicle/details/${this.props.store.vehicleDetails.id}`
    );
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
          let originList = response.originAddresses[0];
          let destinationList = response.destinationAddresses[0];
          let distance = response.rows[0].elements[0].distance;
          // let distance_value = distance.value;
          let distance_text = distance.text;
          let miles = parseInt(
            distance_text.substring(0, distance_text.length - 3)
          );
          console.log(miles);
          console.log(this.state.addTrip.roundtrip);
          if (this.state.addTrip.roundtrip) {
            console.log(miles);
            miles *= 2;
            console.log('before', miles);
          }
          this.setState({
            addTrip: {
              ...this.state.addTrip,
              start_point: originList,
              end_point: destinationList,
              total: miles,
            },
          });
          this.props.dispatch({
            type: 'POST_TRIPS',
            payload: { ...this.state.addTrip, id: this.props.match.params.id },
          });
          // this.props.dispatch({
          //   type: 'UPDATE_TRIP_MAINTENANCE',
          //   payload: this.state.addTrip,
          // });
          this.props.history.push(
            `/vehicle/details/${this.props.store.vehicleDetails.id}`
          );

          // for (let i = 0; i < originList.length; i++) {
          //   let results = response.rows[i].elements;
          //   for (let j = 0; j < results.length; j++) {
          //     let element = results[j];
          //     let distance = parseInt(element.distance.text);
          //     let from = originList[i];
          //     let to = destinationList[j];
          //     console.log(
          //       `Starting Location: ${from} Ending Location: ${to} Distance: ${distance} miles`
          //     );
          //     if (this.state.addTrip.roundtrip) {
          //       distance *= 2;
          //       console.log(distance);
          //     }
          //     console.log(this);
          // this.setState({
          //   addTrip: {
          //     ...this.state.addTrip,
          //     start_point: from,
          //     end_point: to,
          //     total: distance,
          //   },
          // });
          //   }
          // }
        }
        console.log(this.state);
        // this.props.dispatch({
        //   type: 'POST_TRIPS',
        //   payload: this.state.addTrip,
        // });
        // this.props.history.push(
        //   `/vehicle/details/${this.props.store.vehicleDetails.id}`
        // );
      }
    );

    console.log(this.state);
  };
  // send data to db and sub miles from tires and oil
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <h2>{this.state.heading}</h2>
          {/* <pre>
            {JSON.stringify(
              `${this.state.startDisabled} ${this.state.endDisabled}`
            )}
          </pre>
          <pre>{JSON.stringify(this.state.addTrip)}</pre> */}
        </div>
        <div>
          <TextField
            className={this.props.classes.tripInput}
            label="Trip Name"
            variant="outlined"
            value={this.state.addTrip.name}
            onChange={this.handleTripInputChange('name')}
          />
        </div>
        <div>
          <TextField
            className={this.props.classes.tripInput}
            label="Starting Location"
            variant="outlined"
            value={this.state.addTrip.start_point}
            onChange={this.handleTripInputChange('start_point')}
            disabled={this.state.startDisabled ? true : false}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.getStartingLocation}
          >
            Get current Location
          </Button>
        </div>
        <div>
          <TextField
            className={this.props.classes.tripInput}
            label="Ending Location"
            variant="outlined"
            value={this.state.addTrip.end_point}
            onChange={this.handleTripInputChange('end_point')}
            disabled={this.state.endDisabled ? true : false}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.getEndingLocation}
          >
            Get current Location
          </Button>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={this.props.classes.tripInput}
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
        </div>
        <div>
          <FormControlLabel
            className={this.props.classes.tripInput}
            control={<Checkbox name="roundTrip" color="primary" />}
            label="Roundtrip?"
            onChange={this.handleTripInputChange('roundtrip')}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.cancelTrip}
          className={this.props.classes.tripInput}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.submitTrip}
          className={this.props.classes.tripInput}
        >
          Add Trip
        </Button>
      </div>
    );
  }
}

export default withStyles(styling)(connect(mapStoreToProps)(AddTripPage));
