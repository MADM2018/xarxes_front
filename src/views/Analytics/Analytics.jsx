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
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart,
  pieChart
} from "variables/charts.jsx";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

class Charts extends React.Component {
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
                  data={pieChart.data}
                  type="Pie"
                  options={pieChart.options}
                />
              </CardBody>
              <CardFooter stats className={classes.cardFooter}>
                <h6 className={classes.legendTitle}>Legend</h6>
                <i className={"fas fa-circle " + classes.info} /> Apple{` `}
                <i className={"fas fa-circle " + classes.warning} /> Samsung
                {` `}
                <i className={"fas fa-circle " + classes.danger} /> Windows
                Phone{` `}
              </CardFooter>
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
                <h4 className={classes.cardIconTitle}>Tweets por Dirigente</h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={pieChart.data}
                  type="Pie"
                  options={pieChart.options}
                />
              </CardBody>
              <CardFooter stats className={classes.cardFooter}>
                <h6 className={classes.legendTitle}>Legend</h6>
                <i className={"fas fa-circle " + classes.info} /> Apple{` `}
                <i className={"fas fa-circle " + classes.warning} /> Samsung
                {` `}
                <i className={"fas fa-circle " + classes.danger} /> Windows
                Phone{` `}
              </CardFooter>
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
