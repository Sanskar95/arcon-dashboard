import React from "react";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import ProcessCard from "../components/ProcessCard.js";

export default function ProcessesScreen() {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <ProcessCard />
        </GridItem>
      </GridContainer>
    </div>
  );
}
