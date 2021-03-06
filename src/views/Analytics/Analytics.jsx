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

import {
  getTweetsByParty,
  getTweetsByLeader,
  getTweetsTimeLineByParty,
  getTweetsTimeLineByLeader
} from "../../requests/Analytics";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partyPieChart: {
        data: null,
        options: {
          height: "230px"
        }
      },
      leaderPieChart: {
        data: null,
        options: {
          height: "230px"
        }
      },
      leaderTimeLineData: null,
      partyTimeLineData: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.loadLeaderTimeLineBarChart();
    this.loadPartyTimeLineBarChart();
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

  loadLeaderTimeLineBarChart = async () => {
    try {
      const leaderTimeLineData = await getTweetsTimeLineByLeader();

      this.setState({ leaderTimeLineData });
    } catch (Ex) {
      console.log(Ex);
    }
  };

  loadPartyTimeLineBarChart = async () => {
    try {
      const partyTimeLineData = await getTweetsTimeLineByParty();

      this.setState({ partyTimeLineData });
    } catch (Ex) {
      console.log(Ex);
    }
  };

  parseTotalChartData = () => {
    const { partyTimeLineData, leaderTimeLineData } = this.state;
    if (!partyTimeLineData || !leaderTimeLineData) return null;

    const mergedSeries = this.getMergedSeries();

    return {
      ...partyTimeLineData,
      series: mergedSeries
    };
  };

  getMergedSeries = () => {
    const { partyTimeLineData, leaderTimeLineData } = this.state;

    return partyTimeLineData.series.map((serie, index) => {
      const sum = this.sumTwoArrays(serie, leaderTimeLineData.series[index]);
      return sum;
    });
  };

  sumTwoArrays = (first, second) => {
    return first.map((item, index) => item + second[index]);
  };

  getPartyPieChart = () => {
    const { partyTimeLineData } = this.state;
    if (!partyTimeLineData) return null;

    const series = this.aggrSeries(partyTimeLineData.series);
    const labels = this.getLegendTexts(partyTimeLineData.parties, series);
    const options = this.getOptionsPieChart();

    const data = {
      data: {
        series,
        labels
      },
      options
    };

    return data;
  };

  getLeaderPieChart = () => {
    const { leaderTimeLineData } = this.state;
    if (!leaderTimeLineData) return null;

    const series = this.aggrSeries(leaderTimeLineData.series);
    const labels = this.getLegendTexts(leaderTimeLineData.leaders, series);
    const options = this.getOptionsPieChart();

    const data = {
      data: {
        series,
        labels
      },
      options
    };

    return data;
  };

  aggrSeries = data => {
    return data.map(serie => {
      let sum = 0;
      for (let i = 0; i < serie.length; i++) {
        sum += serie[i];
      }
      return sum;
    });
  };

  getOptionsPieChart = () => {
    return {
      height: "300px",
      chartPadding: 60,
      labelOffset: 50,
      labelDirection: "explode"
    };
  };

  getLegendTexts = (names, series) => {
    return names.map((name, index) => {
      return `${name} ${series[index]}`;
    });
  };

  render() {
    const { classes } = this.props;
    const totalChartData = this.parseTotalChartData();

    const partyPieChart = this.getPartyPieChart();
    const leaderPieChart = this.getLeaderPieChart();

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
                  {partyPieChart ? (
                    <Timeline />
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Tweets por Partido</h4>
              </CardHeader>
              <CardBody>
                {partyPieChart && (
                  <ChartistGraph
                    data={partyPieChart.data}
                    type="Pie"
                    options={partyPieChart.options}
                  />
                )}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  {this.state.partyTimeLineData ? (
                    <Timeline />
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets por Partido <small>- En el tiempo</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={this.state.partyTimeLineData}
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
                  {leaderPieChart ? (
                    <Timeline />
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets por Lider Político
                </h4>
              </CardHeader>
              <CardBody>
                {leaderPieChart && (
                  <ChartistGraph
                    data={leaderPieChart.data}
                    type="Pie"
                    options={leaderPieChart.options}
                  />
                )}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  {this.state.leaderTimeLineData ? (
                    <Timeline />
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets por Dirigente <small>- En el tiempo</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={this.state.leaderTimeLineData}
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
                  {totalChartData ? (
                    <Timeline />
                  ) : (
                    <i className="fa fa-sync fa-spin" />
                  )}
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Tweets Total <small>- En el tiempo</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={totalChartData}
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
