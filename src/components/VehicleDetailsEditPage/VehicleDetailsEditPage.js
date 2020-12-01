import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withStyles, createStyles } from '@material-ui/core/styles';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styling = (theme) =>
  createStyles({
    vehicleInput: {
      width: '700px',
      margin: '10px',
    },
  });

class VehicleDetailsEditPage extends Component {
  state = {
    editVehicle: {
      name: '',
      image: '',
    },
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
    this.setState({
      editVehicle: {
        name: this.props.store.vehicleDetails.name,
        image: this.props.store.vehicleDetails.image,
        id: this.props.store.vehicleDetails.id,
      },
    });
  }

  handleChangeField = (event, propertyKey) => {
    this.setState({
      editVehicle: {
        ...this.state.editVehicle,
        [propertyKey]: event.target.value,
      },
    });
  };

  saveVehicleDetails = (event) => {
    this.props.dispatch({
      type: 'PUT_VEHICLE',
      payload: this.state.editVehicle,
    });
    this.props.history.push(`/vehicle/details/${this.state.editVehicle.id}`);
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <h2>Edit {this.props.store.vehicleDetails.name}</h2>
          <pre>{JSON.stringify(this.state.editVehicle)}</pre>
        </div>
        <div>
          <TextField
            className={this.props.classes.vehicleInput}
            label="Vehicle Name"
            variant="filled"
            value={this.state.editVehicle.name}
            name="name"
            onChange={(event) => this.handleChangeField(event, 'name')}
          />
        </div>
        <div>
          <TextField
            className={this.props.classes.vehicleInput}
            label="Vehicle Image"
            variant="filled"
            value={this.state.editVehicle.image}
            name="image"
            style={{ width: '700px' }}
            onChange={(event) => this.handleChangeField(event, 'image')}
          />
        </div>
        <div>
          <Button
            variant="contained"
            style={{ margin: '10px' }}
            onClick={this.saveVehicleDetails}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styling)(
  connect(mapStoreToProps)(VehicleDetailsEditPage)
);
