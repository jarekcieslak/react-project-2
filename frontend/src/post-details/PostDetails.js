import React from "react";
import {fetchPostDetails} from "../api/Api";
import {connect} from "react-redux";
import {Button, CircularProgress, Grid, Paper, Typography, withStyles} from "material-ui";
import {withRouter} from "react-router";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: 140,
    width: 100,
  },
});


class PostDetails extends React.Component {

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.dispatch(fetchPostDetails(postId));
  }

  render() {
    const {classes} = this.props;

    return (
      <div>

        {this.props.status === 'loading' && <CircularProgress className={classes.progress}/>}
        {this.props.status === 'ok' &&
        <div>
          <Grid container justify="center" spacing={24}>
            <Grid item xs={6}>
              <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h1">{this.props.details.title}</Typography>
              <Typography component="p">{this.props.details.body}</Typography>
              <p>Details: {JSON.stringify(this.props.details)}</p>
              </Paper>
            </Grid>

          </Grid>


        </div>}
        {this.props.status === 'error' &&
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Can't load the data.
          </Typography>
          <Button>Try again</Button>
        </Paper>}
      </div>)

  }
}

function mapStateToProps(state) {
  const slice = state.postDetails;
  console.log(slice);
  return {
    status: slice.status,
    details: slice.data
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostDetails)));

