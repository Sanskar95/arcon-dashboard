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
    backgroundColor: "#fdfd96",
  },

  button: {
    backgroundColor: "#92dff3",
  },
});

export default function ApplicationCard() {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = () => history.push(`/processes/0`);
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            test_application
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            onClick={handleClick}
            size="medium"
          >
            processes
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
