import React from "react";
import {Paper, Typography, withStyles} from "material-ui";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  }
});


export class ErrorMessage extends React.Component {
  render() {
    const {what, classes} = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Can't load {what}. Try refreshing the page.
        </Typography>
      </Paper>
    )
  }
}


export default withStyles(styles)(ErrorMessage);
