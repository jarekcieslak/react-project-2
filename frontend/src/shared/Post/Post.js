import SimpleCard from '../Card/Card'
import React from "react";

class Post extends React.Component {
  render() {
    return (<div>
      <SimpleCard data={this.props.post}></SimpleCard></div>)
  }
}

export default Post;
