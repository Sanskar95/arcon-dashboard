import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      width: "450px",
      margin: "10px",
    },
  });


export default function ApplicationCard() {
    const classes = useStyles();

  const history = useHistory();

  const handleClick = () => history.push(`metrics/testApp`);
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            Application Name
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClick} size="medium">
            SEE METRICS
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
