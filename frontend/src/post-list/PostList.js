import React from "react";
import {Button, CircularProgress, Grid, Paper, Typography, withStyles} from "material-ui";
import {fetchAllPosts} from "../api/Api";
import {connect} from "react-redux";
import PostCard from "../shared/PostCard/PostCard";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

class PostList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchAllPosts());
  }

  render() {
    const {classes} = this.props;

    return (<div>
      {this.props.status === 'loading' && <CircularProgress className={classes.progress}/>}

      {this.props.status === 'ok' &&
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="headline" component="h1">
            Post List
          </Typography>
        </Grid>
        {!!this.props.posts &&
        this.props.posts.map((post, index) =>
          <Grid item xs={12} sm={6} key={post.id}><PostCard index={index} data={post}></PostCard></Grid>)}

        {/*<Grid item xs={6} sm={3}>*/}
        {/*<Paper className={classes.paper}>xs=6 sm=3</Paper>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={6} sm={3}>*/}
        {/*<Paper className={classes.paper}>xs=6 sm=3</Paper>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={6} sm={3}>*/}
        {/*<Paper className={classes.paper}>xs=6 sm=3</Paper>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={6} sm={3}>*/}
        {/*<Paper className={classes.paper}>xs=6 sm=3</Paper>*/}
        {/*</Grid>*/}
      </Grid>
      }

      {this.props.status === 'error' &&
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Can't load the data.
        </Typography>
        <Button>Try again</Button>
      </Paper>}


    </div>);
  }
}

function mapStateToProps(state) {
  const postListState = state.postList;
  const posts = postListState.data ? Object.values(postListState.data) : null;
  return {
    posts: posts,
    status: postListState.status
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PostList));
