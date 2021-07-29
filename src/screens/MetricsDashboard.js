import React, { useEffect } from "react";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import MetricsCard from "../components/MetricsCard/MetricsCard";
import MetricsGraph from "../components/MetricsCard/MetricsGraph.js";
import { getInboundThrougput } from "../prometheus-rest/PrometheusService.js";

export default function MetricsDashboard() {
  useEffect(() => {
    getInboundThrougput().then((response) => {
      setInboundThroughput(response.data.data.result);
    });
  }, []);

  const [inboundThrougput, setInboundThroughput] = React.useState([]);

  return (
    <div>
      <GridContainer>
        {inboundThrougput.map((metricObject) => {
          return (
            <GridItem xs={12} sm={6} md={3}>
              <MetricsCard
                value={metricObject.value[1]}
                nodeName={metricObject.metric.node}
              />
            </GridItem>
          );
        })}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          {/* <MetricsGraph /> */}
        </GridItem>
      </GridContainer>
    </div>
  );
}
