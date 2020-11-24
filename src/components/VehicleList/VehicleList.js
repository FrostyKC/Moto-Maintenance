import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import VehicleListItem from '../VehicleListItem/VehicleListItem';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class VehicleList extends Component {
  state = {
    heading: 'Class Component',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VEHICLES',
    });
  }

  render() {
    return (
      <div>
        {this.props.store.vehicles.map((vehicleItem, index) => {
          return <VehicleListItem key={index} vehicleItem={vehicleItem} />;
        })}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(VehicleList);
