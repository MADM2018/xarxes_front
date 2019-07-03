import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  }
};

class Panels extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.pageSubcategoriesTitle}>Información</h3>
            <br />
            <NavPills
              color="warning"
              alignCenter
              tabs={[
                {
                  tabButton: "Descripción",
                  tabIcon: Info,
                  tabContent: (
                    <Card>
                      <CardHeader>
                        <h4 className={classes.cardTitle}>
                          Sobre la Aplicación
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <b>TWITTER POLITICAL</b> es una aplicación que muestra
                        el análisis de los 5 partidos mas importantes en España
                        en la campaña electoral del año 2019, estos son PP,
                        PSOE, Ciudadanos, VOX y Podemos.
                        <br />
                        <br />
                        La información que mostramos fue recopilada de la API de
                        Twitter durante las meses de Febrero a Junio del 2019.
                        Se descargaron todos los Tweets que hacian mencion a
                        cada uno de los partidos políticos anteriores o a su
                        líder.
                        <br />
                        <br />
                        Nuestra base de datos cuenta con mas de 5 millones de
                        Tweets únicos.
                      </CardBody>
                    </Card>
                  )
                },
                {
                  tabButton: "Información Legal",
                  tabIcon: Gavel,
                  tabContent: (
                    <Card>
                      <CardHeader>
                        <h4 className={classes.cardTitle}>
                          Información legal sobre la App
                        </h4>
                      </CardHeader>
                      <CardBody>
                        Toda la información descargada se hizo con el
                        consentimiento de Twitter y es solo para fines
                        académicos.
                        <br />
                      </CardBody>
                    </Card>
                  )
                },
                {
                  tabButton: "Acerca de...",
                  tabIcon: HelpOutline,
                  tabContent: (
                    <Card>
                      <CardHeader>
                        <h4 className={classes.cardTitle}>Acerca de...</h4>
                      </CardHeader>
                      <CardBody>
                        <h4>Autor</h4>
                        <p>
                          Reinier César Mujica Hernández <br /> Estudiante del
                          Master de Análisis de Datos Masivos de la UIB <br />
                          reinier.mujica@gmail.com
                        </p>
                        <br />
                        <br />
                        <h4>Tutor</h4>
                        Toni Bibiloni
                      </CardBody>
                    </Card>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Panels.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Panels);
