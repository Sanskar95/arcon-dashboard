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
    'http://localhost:9090/api/v1/query?query={node="' + sourceName + '"}';
  return axios.get(url);
};

export const getAllocatorMetricByMetricName = (metricNames) => {
  let requestsIterable = metricNames.map((metricName) =>
    axios.get(`http://localhost:9090/api/v1/query?query=${metricName}`)
  );
  return axios.all(requestsIterable);
};
