import axios from 'axios'

export const getInboundThrougput =(metricName) =>{
    const url = `http://localhost:9090/api/v1/query?query=`+metricName;
    return axios.get(url);
}