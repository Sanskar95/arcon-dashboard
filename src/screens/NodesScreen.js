import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import { getNodeNames } from "../utils/Utils.js";
import { Link } from "react-router-dom";
import { getInboundThrougput } from "../prometheus-rest/PrometheusService.js";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(nodeName) {
  const type = nodeName.includes("source") ? "SOURCE" : "NODE";
  return { nodeName, type };
}

export default function NodesScreen() {
  const classes = useStyles();
  const [nodeNames, setNodeNames] = React.useState(null);

  useEffect(() => {
    getInboundThrougput("inbound_throughput").then((response) => {
      setNodeNames(getNodeNames(response));
    });
    console.log(nodeNames);
  }, []);

  const getRows = () => {
    return nodeNames ? nodeNames.map((nodeName) => createData(nodeName)) : null;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Node Name</TableCell>
            <TableCell align="right">Type</TableCell>
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
  );
}
