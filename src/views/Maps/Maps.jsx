import React from "react";
import PropTypes from "prop-types";

import { getTweetsPlaces } from "../../requests/Maps";

// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddLocation from "@material-ui/icons/AddLocation";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 40.42423, lng: -3.710463 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          title={marker.text}
          onClick={() => props.onMarkerOpen(index)}
          position={{
            lat: marker.coordinates[1],
            lng: marker.coordinates[0]
          }}
        >
          {props.showMarkerIndex === index && (
            <InfoWindow onCloseClick={() => props.onMarkerClose()}>
              <div className="">
                <b>{marker.text}</b>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ))
);

class GoogleMaps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweetsMarkers: null,
      showMarkerIndex: null
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.getPlaces();
  };

  getPlaces = async () => {
    try {
      const data = await getTweetsPlaces();
      this.setState({
        tweetsMarkers: data
      });
    } catch (Ex) {
      // eslint-disable-next-line no-console
      console.log(Ex);
    }
  };

  onMarkerOpen = index => {
    this.setState({
      showMarkerIndex: index
    });
  };

  onMarkerClose = () => {
    this.setState({
      showMarkerIndex: null
    });
  };

  render() {
    const { tweetsMarkers, showMarkerIndex } = this.state;

    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <AddLocation />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Tweets por Paises</h4>
            </CardHeader>
            <CardBody>
              {tweetsMarkers && (
                <RegularMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOiSQGPsuyY14OUcoYb4yydS1i_6ejIhA"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{
                        height: `600px`,
                        borderRadius: "6px",
                        overflow: "hidden"
                      }}
                    />
                  }
                  showMarkerIndex={showMarkerIndex}
                  mapElement={<div style={{ height: `100%` }} />}
                  markers={tweetsMarkers}
                  onMarkerOpen={this.onMarkerOpen}
                  onMarkerClose={this.onMarkerClose}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

GoogleMaps.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(GoogleMaps);
