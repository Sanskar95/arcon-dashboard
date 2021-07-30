import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MetricCard from 'react-metric-card'
import 'react-metric-card/dist/index.css'



const useStyles = makeStyles({
  root: {
    width: "450px",
    margin: "10px",
  },
});



export default function MetricsCard(props) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
        <MetricCard
          value={props.value}
          trend={{
            slope: 1,
            description: props.nodeName,
            
          }}
          title={props.metricName}
          fetching={false}
          error={null}
        />
     
    </div>
  );
}
