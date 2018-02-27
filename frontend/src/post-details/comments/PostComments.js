import React from "react";
import {Divider, Grid, Typography} from "material-ui";
import PostCommentAdd from "./PostCommentAdd";
import PostCommentItem from "./PostCommentItem";
import {fetchPostComments} from "../../api/Api";
import ErrorMessage from "../../shared/ErrorMessage/ErrorMessage";
import {connect} from "react-redux";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

export class PostComments extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchPostComments(this.props.postId));
    }

    vote = (id, isUpVote) => {
        console.log('voting comment', id)
    };

    render() {
        const {postId, comments, status} = this.props;
        return (
            <Grid item xs={12}>
                <br/><br/>
                <Typography variant="title" component="h2">Comments:</Typography><br/>
                <Divider/>
                {status === 'ok' && <PostCommentAdd postId={postId}></PostCommentAdd>}
                {status === 'ok' && comments.map(comment => (
                    <PostCommentItem key={comment.id} data={comment} vote={this.vote}></PostCommentItem>
                ))}
                {status === 'loading' && <LoadingSpinner></LoadingSpinner>}
                {status === 'error' && <ErrorMessage what="comments"></ErrorMessage>}
            </Grid>
        )
    }
}


function mapStateToProps(state) {
    const slice = state.postComments;
    console.log(slice);
    return {
        comments: slice.data,
        status: slice.status
    };
}

export default connect(mapStateToProps)(PostComments)
