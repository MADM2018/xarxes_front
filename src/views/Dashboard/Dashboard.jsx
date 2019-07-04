import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { dailySalesChart } from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

// requests
import {
  getTotalTweets,
  getTotalHashtags,
  getTotalRetweets,
  getUsedSpace,
  getTweetsTimeLineAllProfiles
} from "../../requests/Dashboard";

class Dashboard extends React.Component {
  state = {
    value: null,
    tweets: null,
    usedSpace: null,
    reTweets: null,
    hashtags: null,
    chartsData: null
  };

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    this.fetchAndSetInState(getTotalTweets, "tweets");
    this.fetchAndSetInState(getTotalHashtags, "hashtags");
    this.fetchAndSetInState(getTotalRetweets, "reTweets");
    this.fetchAndSetInState(getUsedSpace, "usedSpace");
    this.fetchAndSetInState(getTweetsTimeLineAllProfiles, "chartsData");
  };

  fetchAndSetInState = async (request, field) => {
    try {
      const data = await request();
      this.setFieldInState(field, data.value || data);
    } catch (Ex) {
      // eslint-disable-next-line no-console
      console.log(Ex);
    }
  };

  setFieldInState = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  getSpaceInGb = space => {
    try {
      const gb = space / 1024 / 1024 / 1024;
      return gb.toFixed(2);
    } catch (Ex) {
      return 0;
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    const { chartsData } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  {this.state.tweets ? (
                    <i className="fab fa-twitter" />
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <p className={classes.cardCategory}>Tweets Almacenados</p>
                <h3 className={classes.cardTitle}>{this.state.tweets}</h3>
              </CardHeader>
              <CardFooter stats></CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  {this.state.hashtags ? (
                    <i className="fas fa-hashtag" />
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <p className={classes.cardCategory}>Hashtags</p>
                <h3 className={classes.cardTitle}>{this.state.hashtags}</h3>
              </CardHeader>
              <CardFooter stats></CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  {this.state.reTweets ? (
                    <i className="fas fa-retweet"></i>
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <p className={classes.cardCategory}>Retweets</p>
                <h3 className={classes.cardTitle}>{this.state.reTweets}</h3>
              </CardHeader>
              <CardFooter stats></CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  {this.state.usedSpace ? (
                    <Icon>content_copy</Icon>
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <p className={classes.cardCategory}>Espacio Usado</p>
                <h3 className={classes.cardTitle}>
                  {this.getSpaceInGb(this.state.usedSpace)} <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats></CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {chartsData ? (
            chartsData.map(data => (
              <GridItem key={data.id} xs={12} sm={12} md={4}>
                <Card chart className={classes.cardHover}>
                  <CardHeader color="info">
                    <ChartistGraph
                      className="ct-chart-white-colors"
                      data={data.chart}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>
                      {data.name} (
                      {data.type === "leader" ? "Lider" : "Partido"})
                    </h4>
                    <p className={classes.cardCategory}>{data.party}</p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}></div>
                  </CardFooter>
                </Card>
              </GridItem>
            ))
          ) : (
            <CardIcon color="warning">
              Loading Charts
              <i className="fa fa-sync fa-spin" />
            </CardIcon>
          )}
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
