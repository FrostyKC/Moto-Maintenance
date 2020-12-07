import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styling = (theme) =>
  createStyles({
    imgMedia: {
      height: '330px',
      backgroundSize: 'cover',
    },
  });

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class VehicleListItem extends Component {
  state = {
    heading: 'Class Component',
  };

  vehicleCardClick = (event) => {
    this.props.history.push(`/vehicle/details/${this.props.vehicleItem.id}`);
  };

  render() {
    return (
      <Grid item md={4}>
        <Card onClick={this.vehicleCardClick}>
          <CardActionArea>
            <CardMedia
              className={this.props.classes.imgMedia}
              image={this.props.vehicleItem.image}
              title={this.props.vehicleItem.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="secondary"
              >
                {this.props.vehicleItem.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                component="p"
                display="inline"
                // color="secondary"
              >
                Oil: {}
              </Typography>

              {this.props.vehicleItem.oil_left >
              this.props.vehicleItem.oil_allowed * 0.2 ? (
                <Typography
                  variant="body1"
                  style={{ color: 'green' }}
                  component="p"
                  display="inline"
                >
                  {this.props.vehicleItem.oil_left} mi {}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  style={{ color: 'red' }}
                  component="p"
                  display="inline"
                >
                  {this.props.vehicleItem.oil_left} mi {}
                </Typography>
              )}
              <Typography
                variant="subtitle1"
                color="textPrimary"
                display="inline"
                component="p"
                // color="secondary"
              >
                Tires: {}
              </Typography>
              {this.props.vehicleItem.tires_left >
              this.props.vehicleItem.tires_allowed * 0.2 ? (
                <Typography
                  variant="body1"
                  style={{ color: 'green' }}
                  component="p"
                  display="inline"
                >
                  {this.props.vehicleItem.tires_left} mi {}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  style={{ color: 'red' }}
                  component="p"
                  display="inline"
                >
                  {this.props.vehicleItem.tires_left} mi {}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default withRouter(
  withStyles(styling)(connect(mapStoreToProps)(VehicleListItem))
);
