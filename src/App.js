import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, BrowserRouter } from "react-router-dom";
import MetricsDashboard from "./screens/MetricsDashboard";
import ApplicationsScreen from "./screens/ApplicationsScreen";
import NodesScreen from "./screens/NodesScreen";
import AllocatorMetricsDashboard from "./screens/AllocatorMetricsDashboard";
import ProcessesScreen from "./screens/ProcessesScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <Route exact path="/" component={ApplicationsScreen} />
        <Route exact path="/nodes/:processId" component={NodesScreen} />
        <Route exact path="/metrics/:nodeName" component={MetricsDashboard} />
        <Route exact path="/allocator-metrics/:processId" component={AllocatorMetricsDashboard} />
        <Route exact path="/processes/:applicationId" component={ProcessesScreen} />

      </BrowserRouter>
    </div>
  );
}

export default App;
