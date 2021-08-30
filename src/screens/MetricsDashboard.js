import React, { useEffect } from "react";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import MetricsCard from "../components/Card/MetricsCard";
import {
  getMetricsByTypeAndName,
} from "../prometheus-rest/PrometheusService.js";
import { Chart } from "react-google-charts";

// const numberMetrics = [
//   "inbound_throughput",
//   "watermark_counter",
//   "epoch_counter",
//   "error_counter",
//   "incoming_message_rate",
//   "sources",
//   "nodes",
//   "last_checkpoint_size",
//   "bytes_read"
// ];

const histogramMetricsList = [
  "cpu_cycles",
  "instructions",
  "cache_references",
  "cache_misses",
  "branch_instructions",
  "branch_misses",
  "bus_cycles",
  "stalled_cycles_frontend",
  "stalled_cycles_backend",
  "ref_cpu_cycles",
  "batch_execution_time",
  "checkpoint_execution_time_ms",
];

export default function MetricsDashboard(props) {
  const getMetrics = () => {
    getMetricsByTypeAndName(
      props.match.params.nodeName,
      props.location.state.type
    ).then((response) => {
      setMetricData(response.data.data.result);
    });
  };

  const getActiveHardwareMetrics = () => {
    return histogramMetricsList.filter((hardwareMetric) => {
      let flag = false;
      for (let i = 0; i < metricData.length; i++) {
        if (metricData[i].metric.__name__.includes(hardwareMetric)) {
          flag = true;
          break;
        }
      }
      return flag;
    });
  };

  const createHistogramData = (metricName) => {
    const histogramData = [["quantiles", "value"]];
    const filteredMetricData = metricData.filter((metricDataObject) =>
      metricDataObject.metric.__name__.includes(metricName)
    );
    for (let i = 0; i < filteredMetricData.length; i++) {
      if (filteredMetricData[i].metric.hasOwnProperty("quantile")) {
        histogramData.push([
          filteredMetricData[i].metric.quantile,
          parseFloat(filteredMetricData[i].value[1]),
        ]);
      }
    }
    return histogramData;
  };

  // const filterMetricsByType = (type) => {
  //   if (type === "value") {
  //     return metricData.filter((metricDataObject) =>
  //       numberMetrics.includes(metricDataObject.metric.__name__)
  //     );
  //   } else if (type === "histogram") {
  //     return metricData.filter((metricDataObject) =>
  //       numberMetrics.includes(metricDataObject.metric.__name__)
  //     );
  //   }
  // };
  useEffect(() => {
    getMetrics();

    const interval = setInterval(() => {
      getMetrics();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [metricData, setMetricData] = React.useState([]);

  return (
    <div>
      <h3 style={{ color: "green" }}>
        Metrics for the { props.location.state.type}: {props.match.params.nodeName} 
      </h3>
      <GridContainer>
        {metricData.map((nodeMetric) => {
          return (
            <GridItem xs={12} sm={6} md={3}>
              <MetricsCard
                value={nodeMetric.value[1]}
                metricName={nodeMetric.metric.__name__}
              />
            </GridItem>
          );
        })}
      </GridContainer>
      <GridContainer>
        {getActiveHardwareMetrics().map((hardwareMetric) => {
          return (
            <GridItem xs={12} sm={6} md={3}>
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="Histogram"
                loader={<div>Loading Chart</div>}
                data={createHistogramData(hardwareMetric)}
                options={{
                  title: hardwareMetric,
                  legend: { position: "none" },
                  colors: ["blue"],
                }}
                rootProps={{ "data-testid": "2" }}
              />
            </GridItem>
          );
        })}
      </GridContainer>
    </div>
  );
}
