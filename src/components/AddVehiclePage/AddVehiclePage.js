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
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const styling = (theme) =>
  createStyles({
    vehicleInput: {
      // width: '700px',
      margin: '10px',
      verticalAlign: 'baseline',
    },
  });

class AddVehiclePage extends Component {
  state = {
    heading: 'Add Vehicle',
    newVehicle: {
      name: '',
      image: '',
      user_id: this.props.store.user.id,
      oil_date: new Date(),
      oil_miles_drove: '',
      oil_miles_allowed: '',
      oil_vehicle_id: '',
      tires_date: new Date(),
      tires_miles_drove: '',
      tires_miles_allowed: '',
      tires_vehicle_id: '',
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

  handleOilDateChange = (event, date) => {
    this.setState({
      newVehicle: {
        ...this.state.newVehicle,
        oil_date: date,
      },
    });
  };

  handleTiresDateChange = (event, date) => {
    this.setState({
      newVehicle: {
        ...this.state.newVehicle,
        tires_date: date,
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
  backToGarageClick = (event) => {
    this.props.history.push('/garage');
  };

  handleFinishedUpload = (info) => {
    console.log(info);
    // console.log('File uploaded with filename', info.filename);
    console.log('Access it on s3 at', info.fileUrl);

    this.setState({
      newVehicle: {
        ...this.state.newVehicle,
        image: info.fileUrl,
      },
    });
  };

  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      // signingUrlQueryParams: {uploadType: 'avatar'},
    };
    const s3Url = 'https://frostybucket.s3.amazonaws.com';
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <h2>{this.state.heading}</h2>
        </div>
        <div>
          <pre>{JSON.stringify(this.state.newVehicle)}</pre>
          <TextField
            className={this.props.classes.vehicleInput}
            label="Vehicle Name"
            onChange={this.handleVehicleInputChange('name')}
          />
        </div>
        <div>
          <TextField
            className={this.props.classes.vehicleInput}
            label="Image URL"
            onChange={this.handleVehicleInputChange('image')}
          />

          <h5>or</h5>

          <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
          />
        </div>
        <div>
          <h4>Oil</h4>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
              className={this.props.classes.vehicleInput}
              disableToolbar
              autoOk
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-oil"
              label="Date of Change"
              value={this.state.newVehicle.oil_date}
              onChange={this.handleOilDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </Grid> */}
          </MuiPickersUtilsProvider>
          <TextField
            className={this.props.classes.vehicleInput}
            helperText="Miles driven since last change"
            onChange={this.handleVehicleInputChange('oil_miles_drove')}
          />
          <TextField
            className={this.props.classes.vehicleInput}
            helperText="Miles allowed before change"
            onChange={this.handleVehicleInputChange('oil_miles_allowed')}
          />
        </div>
        <div>
          <h4>Tires</h4>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
              className={this.props.classes.vehicleInput}
              autoOk
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-tires"
              label="Date of Change"
              value={this.state.newVehicle.tires_date}
              onChange={this.handleTiresDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </Grid> */}
          </MuiPickersUtilsProvider>
          <TextField
            className={this.props.classes.vehicleInput}
            margin="normal"
            helperText="Miles driven since last change"
            onChange={this.handleVehicleInputChange('tires_miles_drove')}
          />
          <TextField
            className={this.props.classes.vehicleInput}
            margin="normal"
            helperText="Miles allowed before change"
            onChange={this.handleVehicleInputChange('tires_miles_allowed')}
          />
        </div>
        <Button
          className={this.props.classes.vehicleInput}
          variant="contained"
          color="primary"
          onClick={this.backToGarageClick}
        >
          Back to Garage
        </Button>
        <Button
          className={this.props.classes.vehicleInput}
          variant="contained"
          color="secondary"
          onClick={this.addToGarageClick}
        >
          Add to Garage
        </Button>
        {/* <button onClick={this.addToGarageClick}>Add to Garage</button> */}
      </div>
    );
  }
}

export default withStyles(styling)(connect(mapStoreToProps)(AddVehiclePage));
