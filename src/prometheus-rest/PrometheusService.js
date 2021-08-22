import axios from "axios";

export const getInboundThrougput = (metricName) => {
  const url = `http://localhost:9090/api/v1/query?query=` + metricName;
  return axios.get(url);
};

export const getMetricsByNodeName = (nodeName) => {
  let url =
    'http://localhost:9090/api/v1/query?query={node="' + nodeName + '"}';

  return axios.get(url);
};

export const getMetricsBySourceName = (sourceName) => {
  let url =
    'http://localhost:9090/api/v1/query?query={source="' + sourceName + '"}';
  console.log(url);
  return axios.get(url);
};

export const getAllocatorMetricByMetricName = (metricNames) => {
  let requestsIterable = metricNames.map((metricName) =>
    axios.get(`http://localhost:9090/api/v1/query?query=${metricName}`)
  );
  return axios.all(requestsIterable);
};

export const getNodeManagers = () => {
  let url = "http://localhost:9090/api/v1/query?query=nodes";
  return axios.get(url);
};

export const getSourceManagers = () => {
  let url = "http://localhost:9090/api/v1/query?query=sources";
  return axios.get(url);
};

export const getMetricsByTypeAndName = (name, type) => {
  let url = `http://localhost:9090/api/v1/query?query={${type}=\"${name}\"}`;

  return axios.get(url);
};
