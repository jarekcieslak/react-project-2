import React from "react";
import {fetchPostComments, fetchPostDetails} from "../api/Api";
import {withRouter} from "react-router-dom";

class PostDetails extends React.Component {

  state = {
    details: null,
    comments: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    fetchPostDetails(id).then(data => {
      this.setState({
        details: data
      })
    });
    fetchPostComments(id).then(data => {
      this.setState({
        comments: data
      })
    });
  }

  render() {
    return <div>Post details
      <p>Details: {JSON.stringify(this.state.details)}</p>
      <p>Comments: {JSON.stringify(this.state.comments)}</p>
    </div>
  }
}

export default withRouter(PostDetails)
