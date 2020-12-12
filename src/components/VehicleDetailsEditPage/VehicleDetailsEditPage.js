import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { withStyles, createStyles } from '@material-ui/core/styles';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const styling = (theme) =>
  createStyles({
    vehicleInput: {
      width: '700px',
      margin: '10px',
    },
  });

const imgUploadStyle = {
  width: '200px',
  height: '113px',
  border: '3px inset #22b1c2',
  display: 'inline-block',
};

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
    this.props.history.push(
      `/vehicle/details/${this.props.store.vehicleDetails.id}`
    );
  };
  cancelVehicleDetails = (event) => {
    this.props.history.push(
      `/vehicle/details/${this.props.store.vehicleDetails.id}`
    );
  };

  deleteVehicle = (event) => {
    Swal.fire({
      title: `Are you sure you want to DELETE ${this.props.store.vehicleDetails.name}?`,
      text:
        "This will DELETE all MAINTENANCE and TRIP history. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.props.dispatch({
          type: 'DELETE_VEHICLE',
          payload: this.props.store.vehicleDetails.id,
        });
        this.props.history.push('/garage');
      }
    });
  };

  handleFinishedUpload = (info) => {
    this.setState({
      editVehicle: {
        ...this.state.editVehicle,
        image: info.fileUrl,
      },
    });
  };

  render() {
    const uploadOptions = {
      // server: 'https://serene-springs-24528.herokuapp.com',
      server: 'http://localhost:5000',
    };
    const s3Url = 'https://frostybucket.s3.amazonaws.com';
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <h2>Edit {this.props.store.vehicleDetails.name}</h2>
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
            label="Vehicle Image URL"
            variant="filled"
            value={this.state.editVehicle.image}
            name="image"
            style={{ width: '700px' }}
            onChange={(event) => this.handleChangeField(event, 'image')}
          />
          <h5>or</h5>
          <h5 style={{ color: '#e7363f' }}>Click box below to upload IMG</h5>
          <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            style={imgUploadStyle}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
            onClick={this.cancelVehicleDetails}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: '10px' }}
            onClick={this.saveVehicleDetails}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
            onClick={this.deleteVehicle}
          >
            Delete {this.props.store.vehicleDetails.name}
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styling)(
  connect(mapStoreToProps)(VehicleDetailsEditPage)
);
