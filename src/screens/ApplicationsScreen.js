import React from "react";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import ApplicationCard from "../components/Card/ApplicationCard.js";

export default function ApplicationsScreen() {

  return (
    <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
       <ApplicationCard/>
      </GridItem>
    </GridContainer>
  );
}
