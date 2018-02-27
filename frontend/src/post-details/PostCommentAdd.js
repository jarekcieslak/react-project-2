import React from "react";
import {Button, Paper, TextField, withStyles} from "material-ui";
import {postNewComment} from "../api/Api";
import {connect} from "react-redux";

const styles = theme => ({
  container: {},
  input: {
    width: '100%'
  }
});

export class PostCommentAdd extends React.Component {

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

  submitNewComment = (event, postId) => {
    event.preventDefault();
    this.props.dispatch(postNewComment(postId, this.state.comment, this.state.author));
    this.setState({
      comment: '',
      author: ''
    });
  };

  render() {
    const {classes, postId} = this.props;

    return (
      <Paper style={{marginBottom: 50, padding: 20}}>
        <form className={classes.container} noValidate autoComplete="off"
              onSubmit={(event) => this.submitNewComment(event, postId)}>
          <TextField
            id="textarea"
            label="Your comment..."
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
            value={this.state.author}
            className={classes.input}
            margin="normal"
          />
          <br/><br/>
          <Button type="submit" variant="raised" color="primary">Comment</Button>
        </form>
      </Paper>
    )
  }
}

export default connect((state) => state)(withStyles(styles)(PostCommentAdd));
