import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class VehicleDetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VEHICLE_DETAILS',
      payload: this.props.match.params.id,
    });
    console.log(this.props.store.vehicleDetails);
  }

  render() {
    return (
      <div>
        <h2>{this.props.store.vehicleDetails.name}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(VehicleDetailsPage);
