import React from "react";
import {Button, Divider, IconButton, Menu, MenuItem, Paper} from "material-ui";
import {ThumbDown, ThumbUp} from "material-ui-icons";
import DateFormat from "../shared/Date/Date";
import MoreVertIcon from "material-ui-icons/MoreVert";
import PostCommentAdd from "./PostCommentForm";

export class PostCommentItem extends React.Component {

    state = {
        menuAnchorEl: null,
        edit: false
    };

    handleMenuOpen = event => {
        this.setState({menuAnchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({menuAnchorEl: null});
    };
    deleteComment = (id) => {
        this.props.delete(id);
        this.handleMenuClose()
    };

    editComment = (id) => {
        this.setState({
            edit: true,
            menuAnchorEl: null
        })
    };

    handleCancelEdit = () => {
        this.setState({
            edit: false,
            menuAnchorEl: null
        })
    };


    render() {
        const {data, vote} = this.props;
        const {menuAnchorEl, edit} = this.state;
        return (
            <Paper style={{'padding': 20, 'marginBottom': 20}} elevation={1}>
                {!!edit && <PostCommentAdd handleCancelEdit={this.handleCancelEdit} comment={data}
                                           postId={data.id}></PostCommentAdd>}
                {!edit && <div>
                    <p><strong>~{data.author}</strong> on <DateFormat time={data.timestamp}/>
                        &nbsp; | &nbsp;
                        <Button size="small" color="default">Likes: {data.voteScore}</Button>
                        <Button onClick={() => vote(data.id, true)} size="small" color="default"><ThumbUp/></Button>
                        <Button onClick={() => vote(data.id, false)} size="small" color="default"><ThumbDown/></Button>
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
                            <MenuItem onClick={(event) => this.editComment(data.id, event)}>Edit comment</MenuItem>
                            <MenuItem onClick={(event) => this.deleteComment(data.id, event)}>Delete comment</MenuItem>
                        </Menu></p>

                    <Divider></Divider>
                    <p>{data.body}</p>
                </div>}
            </Paper>
        )
    }
}

export default PostCommentItem;
