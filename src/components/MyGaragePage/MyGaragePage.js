import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import VehicleList from '../VehicleList/VehicleList';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class MyGaragePage extends Component {
  state = {
    heading: 'My Garage',
  };

  addVehicleClick = (event) => {
    this.props.history.push('/addvehicle');
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <button onClick={this.addVehicleClick}>Add a Vehicle</button>
        <VehicleList />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyGaragePage);
