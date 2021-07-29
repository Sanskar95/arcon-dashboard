import axios from 'axios'

export const getInboundThrougput =() =>{
    const url = `http://localhost:9090/api/v1/query?query=inbound_throughput`;
    return axios.get(url);
}