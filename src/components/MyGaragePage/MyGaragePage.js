import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import VehicleList from '../VehicleList/VehicleList';
import './MyGaragePage.css';

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
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>{this.state.heading}</h1>
        <div className="addbtn">
          <button onClick={this.addVehicleClick}>Add a Vehicle</button>
        </div>
        <div>
          <VehicleList />
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyGaragePage);
