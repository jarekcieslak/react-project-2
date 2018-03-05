import React from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography, withStyles} from "material-ui";
import {fetchAllPosts} from "../api/Api";
import {connect} from "react-redux";
import PostCard from "../shared/PostCard/PostCard";
import {Link} from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import {withRouter} from "react-router";

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
        float: 'right'
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
        const {classes, posts} = this.props;
        const category = this.props.match.params.category;
        let postsToDisplay = posts;
        if (category && posts && posts.length) {
            postsToDisplay = postsToDisplay.filter(post => post.category === category)
        }

        return (<div>
            {this.props.status === 'loading' && <LoadingSpinner></LoadingSpinner>}

            {this.props.status === 'ok' &&
            <Grid container spacing={24} alignContent='flex-end' alignItems='flex-end'>
                <Grid item xs={9}>
                    <Typography variant="headline" component="h1">
                        Post List {category && (<span>({category})</span>)}&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/post/new'><Button>Create post</Button></Link>
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <form autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="sort-by">Sort by</InputLabel>
                            <Select
                                autoWidth={true}
                                value={this.state.sortBy}
                                onChange={this.handleSort}
                                inputProps={{
                                    name: 'sortBy',
                                    id: 'sort-by',
                                }}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={1}>Likes (desc)</MenuItem>
                                <MenuItem value={2}>Likes(asc)</MenuItem>
                                <MenuItem value={3}>Date (desc)</MenuItem>
                                <MenuItem value={4}>Date (asc)</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </Grid>


                {!!postsToDisplay && postsToDisplay.map((post, index) =>
                    <Grid item md={6} sm={12} xs={12} key={post.id}><PostCard index={index}
                                                                              data={post}></PostCard></Grid>)}
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostList)));
