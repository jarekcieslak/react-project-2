import React from "react";
import {connect} from "react-redux";
import {Button, Paper, TextField, Typography, withStyles} from "material-ui";
import {withRouter} from "react-router";
import {Api} from "../api/Api";


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
    input: {
        width: '100%'
    }

});


class PostCreate extends React.Component {

    state = {
        title: '',
        body: '',
        author: '',
        category: ''
    };

    submitPost = (event) => {
        event.preventDefault();
        this.props.dispatch(Api.addPost(this.state));
        this.props.history.push('/');
    };

    handleAuthorChange = (event) => this.setState({author: event.target.value});
    handleTitleChange = (event) => this.setState({title: event.target.value});
    handleBodyChange = (event) => this.setState({body: event.target.value});
    handleCategoryChange = (event) => this.setState({category: event.target.value});
    testData = (event) => this.setState({
        author: 'Tester',
        title: 'The Hitchhikers Guide to the Galaxy',
        body: 'The Hitchhiker\'s Guide to the Galaxy, The Hitchhikers Guide to the Galaxy',
        category: 'Sci-Fi'
    });


    render() {
        let {classes} = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline">Create new post &nbsp;&nbsp;&nbsp;&nbsp; <Button
                        onClick={(event) => this.testData(event)}>Fill with test data</Button></Typography>
                    <form className={classes.container} noValidate autoComplete="off"
                          onSubmit={(event) => this.submitPost(event)}>
                        <TextField
                            id="input"
                            label="Title"
                            placeholder="Post title goes here..."
                            onChange={this.handleTitleChange}
                            value={this.state.title}
                            className={classes.input}
                            margin="normal"
                        />
                        <TextField
                            id="textarea"
                            label="Body"
                            placeholder="Type in your post body..."
                            multiline
                            rows="3"
                            onChange={this.handleBodyChange}
                            value={this.state.body}
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
                        <TextField
                            id="input"
                            label="Category"
                            placeholder="Category"
                            onChange={this.handleCategoryChange}
                            value={this.state.category}
                            className={classes.input}
                            margin="normal"
                        />
                        <br/><br/>
                        <Button type="submit" variant="raised" color="primary">Create Post</Button>
                    </form>
                </Paper>
            </div>)
    }
}

function mapStateToProps(state) {
    const slice = state.postDetails;
    return {
        status: slice.status,
        details: slice.data
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostCreate)));

