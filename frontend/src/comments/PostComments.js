import React from "react";
import {Divider, Grid, Typography} from "material-ui";
import PostCommentForm from "./PostCommentForm";
import PostCommentItem from "./PostCommentItem";
import {Api} from "../api/Api";
import ErrorMessage from "../shared/ErrorMessage/ErrorMessage";
import {connect} from "react-redux";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";

export class PostComments extends React.Component {

    componentDidMount() {
        this.props.dispatch(Api.fetchPostComments(this.props.postId));
    }

    vote = (id, isUpVote) => {
        this.props.dispatch(Api.voteComment(id, isUpVote));
    };

    delete = (id) => {
        this.props.dispatch(Api.deleteComment(id));
    };

    render() {
        const {postId, comments, status} = this.props;
        return (
            <Grid item xs={12}>
                <br/><br/>
                <Typography variant="title" component="h2">Comments:</Typography><br/>
                <Divider/>
                {status === 'ok' && <PostCommentForm postId={postId}></PostCommentForm>}
                {status === 'ok' && comments.map(comment => (
                    <PostCommentItem key={comment.id} data={comment} vote={this.vote}
                                     delete={this.delete}></PostCommentItem>
                ))}
                {status === 'loading' && <LoadingSpinner></LoadingSpinner>}
                {status === 'error' && <ErrorMessage what="comments"></ErrorMessage>}
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const slice = state.postComments;
    return {
        comments: slice.data ? Object.values(slice.data) : null,
        status: slice.status
    };
}

export default connect(mapStateToProps)(PostComments)
