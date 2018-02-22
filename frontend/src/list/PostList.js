import React from "react";
import {Grid, Paper, Typography, withStyles} from "material-ui";

import {fetchPosts} from "../api/Api";
import Post from "../shared/Post/Post";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

class PostList extends React.Component {
  state = {
    posts: null
  };

  componentDidMount() {
    fetchPosts().then(data => {
      this.setState({
        posts: data
      })
    })
  }


  render() {
    const {classes} = this.props;

    return (<div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="headline" component="h1">
            Post List
          </Typography>
        </Grid>

        {!!this.state.posts && this.state.posts.map((post,index) => <Grid item xs={12} sm={4} key={post.id}>
          <Post post={post}></Post>
        </Grid>)}



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
    </div>);
  }
}

export default withStyles(styles)(PostList);
