import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getNodeNames, getSourceNames } from "../utils/Utils.js";
import { Link } from "react-router-dom";
import {
  getInboundThrougput,
  getNodeManagers,
  getSourceManagers,
} from "../prometheus-rest/PrometheusService.js";

const useStyles = makeStyles({
  table: {
   
    
    width: "100%",
   
  },
});

function createData(nodeName) {
  const type = nodeName.includes("source") ? "Source" : "Node";
  return { nodeName, type };
}

export default function NodesScreen() {
  const classes = useStyles();
  const [nodeNames, setNodeNames] = React.useState(null);
  const [nodeManagers, setNodeManagers] = React.useState([]);
  const [sourceManagers, setSourceManagers] = React.useState([]);

  useEffect(() => {
    getNodesAndSources();
    getNodeManagerNames();
    getSourceManagerNames();
  }, []);

  const getRows = () => {
    return nodeNames ? nodeNames.map((nodeName) => createData(nodeName)) : null;
  };

  const getNodesAndSources = async () => {
    const [nodes, sources] = await Promise.all([
      getInboundThrougput("inbound_throughput"),
      getInboundThrougput("error_counter"),
    ]);
    setNodeNames(getNodeNames(nodes).concat(getSourceNames(sources)));
  };

  const getNodeManagerNames = () => {
    getNodeManagers().then((response) => {
      setNodeManagers(
        response.data.data.result.map((metricObejct) => {
          return metricObejct.metric.node_manager;
        })
      );
    });
  };

  const getSourceManagerNames = () => {
    getSourceManagers().then((response) => {
      setSourceManagers(
        response.data.data.result.map((metricObejct) => {
          return metricObejct.metric.source_manager;
        })
      );
    });
  };


  return (
    <div style={{ display: "flex" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell align="right"><strong>Type</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows() &&
              getRows().map((row) => (
                <TableRow key={row.nodeName}>
                  <TableCell component="th" scope="row">
                    <Link to={`/metrics/${row.nodeName}`}>{row.nodeName}</Link>
                  </TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Manager</strong></TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodeManagers &&
            nodeManagers.map((row) => (
              <TableRow key={row}>
                <TableCell component="th" scope="row">
                  <Link to={`/metrics/${row.nodeName}`}>{row}</Link>
                </TableCell>
                <TableCell align="right">{'Node Manager'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Manager</strong></TableCell>
            <TableCell align="right"><strong>Type</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sourceManagers &&
            sourceManagers.map((row) => (
              <TableRow key={row}>
                <TableCell component="th" scope="row">
                  <Link to={`/metrics/${row}`}>{row}</Link>
                </TableCell>
                <TableCell align="right">{'Source Manager'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      </TableContainer>

    </div>
  );
}
