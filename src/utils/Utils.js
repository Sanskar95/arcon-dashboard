export  function getNodeNames(responseData) {
  return responseData.data.data.result.map((metricObject) => metricObject.metric.node);
}
