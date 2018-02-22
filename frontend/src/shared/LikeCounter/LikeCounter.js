import {Button} from "material-ui";
import React from "react";
import ThumbUp from 'material-ui-icons/ThumbUp';

class LikeCounter extends React.Component {
  render() {
    const {voteScore} = this.props;
    return (<Button size="small" color="default"><ThumbUp/>&nbsp;{voteScore}</Button>)
  }
}

export default LikeCounter;
