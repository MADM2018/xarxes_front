/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  multipleBarsChart,
  colouredLinesChart,
  pieChart
} from "variables/charts.jsx";

import { getTweetsByParty, getTweetsByLeader } from "../../requests/Analytics";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import { async } from "q";

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partyPieChart: {
        data: {},
        options: {
          height: "230px"
        }
      },
      leaderPieChart: {
        data: {},
        options: {
          height: "230px"
        }
      }
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.loadPartyPieChart();
    this.loadLeaderPieChart();
  };

  loadPartyPieChart = async () => {
    try {
      const data = await getTweetsByParty();

      const series = this.parseSeries(data);
      const labels = this.getLegendTexts(data);
      const options = this.getOptionsPieChart();

      const partyPieChart = {
        data: {
          series,
          labels
        },
        options
      };
      this.setState({ partyPieChart });
    } catch (Ex) {
      console.log(Ex);
    }
  };

  loadLeaderPieChart = async () => {
    try {
      const data = await getTweetsByLeader();

      const series = this.parseSeries(data);
      const labels = this.getLegendTexts(data);
      const options = this.getOptionsPieChart();

      const leaderPieChart = {
        data: {
          series,
          labels
        },
        options
      };
      this.setState({ leaderPieChart });
    } catch (Ex) {
      console.log(Ex);
    }
  };

  parseSeries = data => {
    return Object.keys(data).map(key => {
      return data[key].tweets;
    });
  };

  getOptionsPieChart = () => {
    return {
      height: "230px"
    };
  };

  getLegendTexts = data => {
    return Object.keys(data).map(key => {
      return `${data[key].party} ${data[key].tweets}`;
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Heading
          textAlign="center"
          title="Estadísticas"
          category={
            <span>
              Aqui mostramos algunas estadísticas útiles sobre la información
              que almacenamos.
            </span>
          }
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Tweets por Partido</h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={this.state.partyPieChart.data}
                  type="Pie"
                  options={this.state.partyPieChart.options}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets por Partido <small>- En el tiempo</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={multipleBarsChart.data}
                  type="Bar"
                  options={multipleBarsChart.options}
                  listener={multipleBarsChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets por Lider Político
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={this.state.leaderPieChart.data}
                  type="Pie"
                  options={this.state.leaderPieChart.options}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets por Dirigente <small>- En el tiempo</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={multipleBarsChart.data}
                  type="Bar"
                  options={multipleBarsChart.options}
                  listener={multipleBarsChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets Total <small>- En el tiempo</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={colouredLinesChart.data}
                  type="Line"
                  options={colouredLinesChart.options}
                  listener={colouredLinesChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Charts.propTypes = {
  classes: PropTypes.object
};

export default withStyles(chartsStyle)(Charts);
