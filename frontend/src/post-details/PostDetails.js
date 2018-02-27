import React from "react";
import {fetchPostComments, fetchPostDetails, votePost} from "../api/Api";
import {connect} from "react-redux";
import {
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  withStyles
} from "material-ui";
import {withRouter} from "react-router";
import {ThumbDown, ThumbUp} from "material-ui-icons";
import PostComment from "./PostComment";
import DateFormat from "../shared/DateFormat/DateFormat";
import MoreVertIcon from "material-ui-icons/MoreVert";
import PostCommentAdd from "./PostCommentAdd";
import ErrorMessage from "../shared/ErrorMessage/ErrorMessage";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: 140,
    width: 100,
  },
});


class PostDetails extends React.Component {
  state = {
    menuAnchorEl: null,
  };
  handleMenuOpen = event => {
    this.setState({menuAnchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({menuAnchorEl: null});
  };

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.dispatch(fetchPostDetails(postId));
    this.props.dispatch(fetchPostComments(postId));
  }

  vote = (postId, isUpVote) => {
    this.props.dispatch(votePost(postId, isUpVote));
  };

  render() {
    const {classes, details, comments, statusComments} = this.props;
    const {menuAnchorEl} = this.state;

    return (
      <div>
        {this.props.status === 'loading' && <CircularProgress className={classes.progress}/>}
        {this.props.status === 'ok' &&
        <div>
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.root} elevation={4}>
                <CardMedia
                  className={classes.media}
                  image={"https://picsum.photos/800/200/?image=" + Math.floor(Math.random() * 100)}
                  title="Contemplative Reptile"
                />
                <br/>
                <Typography variant="display2" component="h1">{details.title}</Typography>
                <Typography component="p"><DateFormat
                  time={details.timestamp}/> ~<strong>{details.author}</strong></Typography>
                <br/>
                <Typography variant="subheading" component="p">{details.body}</Typography>
                <br/>
                <Divider></Divider>
                <Button size="small" color="default">Likes: {details.voteScore}</Button>
                <Button onClick={() => this.vote(details.id, true)} size="small" color="default"><ThumbUp/></Button>
                <Button onClick={() => this.vote(details.id, false)} size="small" color="default"><ThumbDown/></Button>
                <span>Comments: {details.commentCount}</span>
                <IconButton
                  aria-label="More"
                  aria-owns={menuAnchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenuOpen}
                >
                  <MoreVertIcon/>
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={this.handleMenuClose}>
                  <MenuItem onClick={this.handleMenuClose}>Edit post</MenuItem>
                  <MenuItem onClick={this.handleMenuClose}>Delete post</MenuItem>
                </Menu>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <br/><br/>
              <Typography variant="title" component="h2">Comments:</Typography><br/>
              <Divider/>
              <PostCommentAdd postId={details.id}></PostCommentAdd>
              {
                statusComments === 'ok' && comments.map(comment => (
                  <PostComment key={comment.id} data={comment}></PostComment>))
              }
              {statusComments === 'error' && <ErrorMessage what="comments"></ErrorMessage>}
            </Grid>
          </Grid>
        </div>}
        {this.props.status === 'error' && <ErrorMessage what="post details"></ErrorMessage>}
      </div>)

  }
}

function mapStateToProps(state) {
  const slice = state.postDetails;
  return {
    status: slice.status,
    details: slice.data,
    comments: slice.comments,
    statusComments: slice.statusComments
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostDetails)));

