
//TODO: Change this to gRPC later
export  function getNodeNames(responseData) {
  return responseData.data.data.result.map((metricObject) => metricObject.metric.node);
}

export  function getSourceNames(responseData) {
  return responseData.data.data.result.map((metricObject) => metricObject.metric.source);
}


export function getActivePerfMetrics(responseData){
  
}
