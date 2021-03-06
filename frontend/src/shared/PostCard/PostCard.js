import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {Link} from "react-router-dom";
import Comment from 'material-ui-icons/Comment';
import {connect} from "react-redux";
import {ThumbDown, ThumbUp} from "material-ui-icons";
import MoreVertIcon from "material-ui-icons/MoreVert";
import {Api} from "../../api/Api";
import {IconButton, Menu, MenuItem} from "material-ui";
import DateFormat from "../Date/Date";
import {withRouter} from "react-router";

const styles = theme => ({
    card: {
        maxWidth: 'auto',
    },
    media: {
        height: 200,
    },
    title: {},
    body: {
        marginBottom: 20
    },
    category: {
        marginBottom: 0,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },

});


class PostCard extends React.Component {

    state = {
        menuAnchorEl: null,
    };

    handleMenuOpen = event => {
        this.setState({menuAnchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({menuAnchorEl: null});
    };

    vote = (postId, isUpVote) => {
        this.props.dispatch(Api.votePost(postId, isUpVote));
    };

    deletePost = (postId) => {
        this.props.dispatch(Api.deletePost(postId))
    };

    editPost = (postId, category) => {
        this.props.history.push(`${category}/${postId}/edit`);
    };


    render() {
        const {classes, data, index} = this.props;
        const {menuAnchorEl} = this.state;

        return (
            <div>
                <Card className={classes.card}>
                    <Link to={`/${data.category}/${data.id}`}>
                        <CardMedia
                            className={classes.media}
                            image={"https://picsum.photos/850/200/?image=" + (parseInt(index, 10) + 40)}
                            title="Contemplative Reptile"
                        />
                    </Link>
                    <CardContent>
                        <Typography className={classes.title} variant="headline"
                                    component="h2">{data.title}</Typography>
                        <Typography className={classes.body} component="p">{data.body}</Typography>
                        <Typography className={classes.category}>Category: {data.category},
                            Author: {data.author}, <DateFormat time={data.timestamp}/></Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/${data.category}/${data.id}`}><Button size="medium" color="primary">Show
                            More</Button></Link>
                        <Button size="small" color="default">Likes: {data.voteScore}</Button>
                        <Button onClick={() => this.vote(data.id, true)} size="small"
                                color="default"><ThumbUp/></Button>
                        <Button onClick={() => this.vote(data.id, false)} size="small"
                                color="default"><ThumbDown/></Button>
                        <Button size="small" color="default"><Comment/>&nbsp;{data.commentCount}</Button>

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
                            <MenuItem onClick={() => this.editPost(data.id, data.category)}>Edit post</MenuItem>
                            <MenuItem onClick={() => this.deletePost(data.id)}>Delete post</MenuItem>
                        </Menu>

                    </CardActions>
                </Card>
            </div>
        );
    }

}


PostCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(PostCard)));
