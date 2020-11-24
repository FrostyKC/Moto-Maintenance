import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class VehicleListItem extends Component {
  state = {
    heading: 'Class Component',
  };

  vehicleCardClick = (event) => {
    this.props.history.push();
  };

  render() {
    return (
      <div>
        <Card onClick={this.vehicleCardClick}>
          <CardActionArea>
            {/* <CardMedia
              // onClick={this.movieClick}
              image={this.props.vehicleItem.image}
              title={this.props.movieItem.title}
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.vehicleItem.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                oil:idk Tires:idk
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(VehicleListItem);
