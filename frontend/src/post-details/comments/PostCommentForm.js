import React from "react";
import {Button, Paper, TextField, withStyles} from "material-ui";
import {Api} from "../../api/Api";
import {connect} from "react-redux";

const styles = theme => ({
    container: {},
    input: {
        width: '100%'
    }
});

export class PostCommentForm extends React.Component {

    state = {
        comment: '',
        author: ''
    };

    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    };
    handleAuthorChange = (event) => {
        this.setState({
            author: event.target.value
        })
    };

    submitForm = (event, postId) => {
        event.preventDefault();
        const isEdit = !!this.props.comment;
        if (!isEdit) {
            this.props.dispatch(Api.postNewComment(postId, this.state.comment, this.state.author));
        } else {
            this.props.dispatch(Api.updateComment(this.props.comment.id, this.state.comment));
            this.props.handleCancelEdit()
        }

        this.setState({
            comment: '',
            author: ''
        });
    };

    componentDidMount() {
        const {comment} = this.props;
        if (comment) {
            this.setState({
                author: comment.author,
                comment: comment.body
            })
        }
    }

    render() {
        const {classes, comment, postId} = this.props;
        const isEdit = !!comment;

        return (
            <Paper style={{marginBottom: 50, padding: 20}}>
                <form className={classes.container} noValidate autoComplete="off"
                      onSubmit={(event) => this.submitForm(event, postId)}>
                    <TextField
                        id="textarea"
                        label="Comment"
                        placeholder="Type in your comment."
                        multiline
                        rows="2"
                        onChange={this.handleCommentChange}
                        value={this.state.comment}
                        className={classes.input}
                        margin="normal"
                    />
                    <TextField
                        id="input"
                        label="Author"
                        placeholder="Johny Bravo"
                        onChange={this.handleAuthorChange}
                        disabled={isEdit}
                        value={this.state.author}
                        className={classes.input}
                        margin="normal"
                    />
                    <br/><br/>
                    <Button type="submit" variant="raised" color="primary">{isEdit ? 'Save' : 'Comment'}</Button>
                    {isEdit && <Button type="submit" color="primary" onClick={() => this.props.handleCancelEdit()}>Cancel
                        edit</Button>}
                </form>
            </Paper>
        )
    }
}

export default connect((state) => state)(withStyles(styles)(PostCommentForm));
