import React from "react";
import {Button, Divider, Paper} from "material-ui";
import {ThumbDown, ThumbUp} from "material-ui-icons";
import DateFormat from "../shared/DateFormat/DateFormat";


export class PostComment extends React.Component {

  vote = (id, isUpVote) => {
    console.log('voting comment', id)
  };

  render() {
    const {data} = this.props;

    return (
      <Paper style={{'padding': 20, 'marginBottom': 20}} elevation={1}>
        <p><strong>~{data.author}</strong> on <DateFormat time={data.timestamp}/>
          &nbsp; | &nbsp;
          <Button size="small" color="default">Likes: {data.voteScore}</Button>
          <Button onClick={() => this.vote(data.id, true)} size="small" color="default"><ThumbUp/></Button>
          <Button onClick={() => this.vote(data.id, false)} size="small" color="default"><ThumbDown/></Button></p>
        <Divider></Divider>
        <p>{data.body}</p>
      </Paper>
    )
  }
}

export default PostComment;
