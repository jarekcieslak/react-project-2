import React from "react";
import {Button, Divider, IconButton, Menu, MenuItem, Paper} from "material-ui";
import {ThumbDown, ThumbUp} from "material-ui-icons";
import DateFormat from "../../shared/Date/Date";
import MoreVertIcon from "material-ui-icons/MoreVert";

export class PostCommentItem extends React.Component {

    state = {
        menuAnchorEl: null,
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


    render() {
        const {data, vote} = this.props;
        const {menuAnchorEl} = this.state;
        return (
            <Paper style={{'padding': 20, 'marginBottom': 20}} elevation={1}>
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
                        <MenuItem onClick={this.handleMenuClose}>Edit comment</MenuItem>
                        <MenuItem onClick={() => this.deleteComment(data.id) }>Delete comment</MenuItem>
                    </Menu></p>

                <Divider></Divider>
                <p>{data.body}</p>
            </Paper>
        )
    }
}

export default PostCommentItem;
