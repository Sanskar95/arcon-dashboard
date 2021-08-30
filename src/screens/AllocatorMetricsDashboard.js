import React, { useEffect } from "react";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import MetricsCard from "../components/Card/MetricsCard";
import { getAllocatorMetricByMetricName } from "../prometheus-rest/PrometheusService";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function AllocatorMetricsDashboard() {
  const allocatorMetricNames = [
    "arcon_allocator_alloc_counter",
    "arcon_allocator_total_bytes",
    "arcon_allocator_bytes_remaining",
  ];
  const [allocatorMetrics, setAllocatorMetrics] = React.useState([]);

  const getAllAllocatorMetrics = () => {
    getAllocatorMetricByMetricName(allocatorMetricNames).then((response) => {
      setAllocatorMetrics(response);
    });
  };

  useEffect(() => {
    getAllAllocatorMetrics();

    const interval = getAllAllocatorMetrics(() => {
      getAllAllocatorMetrics();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <GridContainer>
        {allocatorMetrics.map((allocatorMetric) => {
          return (
            <GridItem xs={12} sm={6} md={3}>
              <MetricsCard
                value={allocatorMetric.data.data.result[0].value[1]}
                metricName={allocatorMetric.data.data.result[0].metric.__name__}
              />
            </GridItem>
          );
        })}
      </GridContainer>
    </ErrorBoundary>
  );
}
