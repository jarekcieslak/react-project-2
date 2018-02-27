import React from "react";
import {Divider, Grid, Typography} from "material-ui";
import PostCommentAdd from "./PostCommentAdd";
import PostCommentItem from "./PostCommentItem";
import {fetchPostComments} from "../../api/Api";
import ErrorMessage from "../../shared/ErrorMessage/ErrorMessage";
import {connect} from "react-redux";

export class PostComments extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchPostComments(this.props.postId));
  }

  render() {
    const {postId, comments, status} = this.props;
    return (
      <Grid item xs={12}>
        <br/><br/>
        <Typography variant="title" component="h2">Comments:</Typography><br/>
        <Divider/>
        <PostCommentAdd postId={postId}></PostCommentAdd>
        {
          status === 'ok' && comments.map(comment => (
            <PostCommentItem key={comment.id} data={comment}></PostCommentItem>))
        }
        {status === 'error' && <ErrorMessage what="comments"></ErrorMessage>}
      </Grid>
    )
  }
}


function mapStateToProps(state) {
  const slice = state.postDetails;
  return {
    comments: slice.comments,
    status: slice.statusComments
  };
}

export default connect(mapStateToProps)(PostComments)
