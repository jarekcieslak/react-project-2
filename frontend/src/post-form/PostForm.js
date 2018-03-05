import React from "react";
import {connect} from "react-redux";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, withStyles} from "material-ui";
import {withRouter} from "react-router";
import {Api, fetchPostDetails} from "../api/Api";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";


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
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        width: '100%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    }

});


class PostForm extends React.Component {

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
        category: 'udacity'
    });


    componentDidMount() {
        this.props.dispatch(Api.fetchAllCategories());

        const params = this.props.match.params;
        const isEdit = this.props.match.url.indexOf('edit') !== -1;
        if (isEdit && params.id) {
            this.props.dispatch(fetchPostDetails(params.id));
        }
    };

    componentWillReceiveProps(props, content) {
        const isEdit = props.match.url.indexOf('edit') !== -1;
        const params = props.match.params;

        if (isEdit && params.id && props.status === 'ok') {
            this.setState({
                author: props.details.author,
                title: props.details.title,
                body: props.details.body,
                category: props.details.category
            })
        }
    }


    render() {
        let {classes, categories, categoriesStatus} = this.props;
        const isEdit = this.props.match.url.indexOf('edit') !== -1;

        return (
            <div>
                {categoriesStatus === 'loading' && (<LoadingSpinner></LoadingSpinner>)}
                {categoriesStatus === 'ok' &&
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline">
                        {isEdit && <span>Edit post</span>}
                        {!isEdit && <span>Create new post</span>}
                        &nbsp;&nbsp;&nbsp;&nbsp; <Button
                        onClick={(event) => this.testData(event)}>Test data</Button></Typography>
                    <form className={classes.container} noValidate autoComplete="off"
                          onSubmit={(event) => this.submitPost(event)}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="input"
                                label="Title"
                                placeholder="Post title goes here..."
                                onChange={this.handleTitleChange}
                                value={this.state.title}
                                className={classes.input}
                                margin="normal"
                            /></FormControl>
                        <FormControl className={classes.formControl}>
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
                            /></FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="input"
                                label="Author"
                                placeholder="Johny Bravo"
                                onChange={this.handleAuthorChange}
                                value={this.state.author}
                                className={classes.input}
                                margin="normal"
                            /></FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                                inputProps={{
                                    name: 'category',
                                    id: 'category',
                                }}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                {categories && categories.length && categories.map((cat, index) => (
                                    <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <br/><br/>
                            <Button type="submit" variant="raised" color="primary">
                                {isEdit && <span>Save</span>}
                                {!isEdit && <span>Create</span>}
                                &nbsp;Post</Button>
                        </FormControl>


                    </form>
                </Paper>}
            </div>)
    }
}

function mapStateToProps(state) {
    const postDetails = state.postDetails;
    const categories = state.categories;

    return {
        status: postDetails.status,
        details: postDetails.data,
        categories: categories.data,
        categoriesStatus: categories.status
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostForm)));

