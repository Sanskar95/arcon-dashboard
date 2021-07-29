import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, BrowserRouter } from "react-router-dom";
import MetricsDashboard from "./screens/MetricsDashboard";
import ApplicationsScreen from "./screens/ApplicationsScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <Route exact path="/" component={ApplicationsScreen} />
        <Route exact path="/metrics/testApp" component={MetricsDashboard} />
      </BrowserRouter>
    </div>
  );
}

export default App;
