import React from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  withStyles
} from "material-ui";
import {fetchAllPosts} from "../api/Api";
import {connect} from "react-redux";
import PostCard from "../shared/PostCard/PostCard";
import {Link} from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class PostList extends React.Component {

  state = {
    sortBy: ''
  };

  handleSort = (event) => {
    this.setState({
      sortBy: event.target.value
    })
  };

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
            Post List &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/post/new'><Button>Create post</Button></Link>
          </Typography>
          <form autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sort-by">Sort by</InputLabel>
              <Select
                value={this.state.sortBy}
                onChange={this.handleSort}
                inputProps={{
                  name: 'sortBy',
                  id: 'sort-by',
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={1}>Likes (desc)</MenuItem>
                <MenuItem value={2}>Likes(asc)</MenuItem>
                <MenuItem value={3}>Date (desc)</MenuItem>
                <MenuItem value={4}>Date (asc)</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
        {!!this.props.posts && this.props.posts.map((post, index) =>
          <Grid item md={6} sm={12} xs={12} key={post.id}><PostCard index={index} data={post}></PostCard></Grid>)}
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
