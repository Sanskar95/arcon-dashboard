import React, { useEffect } from "react";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import MetricsCard from "../components/MetricsCard/MetricsCard";
import MetricsGraph from "../components/MetricsCard/MetricsGraph.js";
import { getInboundThrougput } from "../prometheus-rest/PrometheusService.js";

const nodeMetrics = [
  "inbound_throughput",
  "watermark_counter",
  "epoch_counter",
];

export default function MetricsDashboard(props) {
  const getValue = (response) => {
    for (var key in response.data.data.result) {
      let object = response.data.data.result[key];
      if (object.metric.node === props.match.params.nodeName) {
        return object.value[1];
      }
    }
  };

  const getMetricByNode = async () => {
    const [inbound_throughput, watermark_counter, epoch_counter] =
      await Promise.all(
        nodeMetrics.map((nodeMetric) => getInboundThrougput(nodeMetric))
      );

    const data = { ...metricData };
    data["inbound_throughput"] = getValue(inbound_throughput);
    data["watermark_counter"] = getValue(watermark_counter);
    data["watermark_counter"] = getValue(epoch_counter);

    setMetricData(data);
  };
  useEffect(() => {
    console.log(props.match.params.nodeName);
    getMetricByNode();

    const interval = setInterval(() => {
      getMetricByNode();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [metricData, setMetricData] = React.useState({
    inbound_throughput: 0,
    watermark_counter: 0,
    epoch_counter: 0,
  });

  return (
    <div>
      <GridContainer>
        {nodeMetrics.map((nodeMetric) => {
          return (
            <GridItem xs={12} sm={6} md={3}>
              <MetricsCard
                value={metricData[nodeMetric]}
                nodeName={props.match.params.nodeName}
                metricName={nodeMetric}
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
