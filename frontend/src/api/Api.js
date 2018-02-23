import {allPostsError, allPostsLoad, allPostsReceived, postVoteSuccess} from "../post-list/PostListActions";
import {mapJsonToPosts} from "../post-list/PostListMappers";
import {AUTH_HEADER, BASE_URL} from "../Constants";
import {
  postCommentsReceived,
  postDetailsError,
  postDetailsLoad,
  postDetailsReceived
} from "../post-details/PostDetailsActions";


// POST LIST
export const fetchAllPosts = () => dispatch => {
  dispatch(allPostsLoad());
  return fetch(`${BASE_URL}/posts`, {headers: AUTH_HEADER})
    .then(res => res.json())
    .then(data => mapJsonToPosts(data))
    .then(data => new Promise(resolve => setTimeout(() => resolve(dispatch(allPostsReceived(data))), 500)))
    .catch(error => dispatch(allPostsError()))
};


// POST DETAILS
export const fetchPostDetails = (id) => dispatch => {
  if (id) {
    dispatch(postDetailsLoad());

    return fetch(`${BASE_URL}/posts/${id}`, {headers: AUTH_HEADER})
      .then((res) => res.json())
      .then(data => dispatch(postDetailsReceived(data)))
      .catch(error => dispatch(postDetailsError()))
  }
};

export const votePost = (id, isVoteUp) => dispatch => {
  if (id) {
    // return fetch(`${BASE_URL}/posts/${id}`, {
    //   body: JSON.stringify({
    //     option: isVoteUp ? 'upVote' : 'downVote'
    //   }),
    //   method: 'POST',
    //   headers: {
    //     ...AUTH_HEADER,
    //     'Content-Type': 'application/json'
    //   }
    // })
    //
    return postData(`${BASE_URL}/posts/${id}`, {option: isVoteUp ? 'upVote' : 'downVote'})
      .then(res => res.json())
      .then(data => {
        return dispatch(postVoteSuccess(data))
      })
  }
};


// // POST COMMENTS
// export function fetchPostComments(id) {
//   if (id) {
//     return fetch(`${BASE_URL}/posts/${id}/comments`, {headers: AUTH_HEADER})
//       .then((res) => res.json())
//   }
// }
//


function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *omit
    headers: {
      ...AUTH_HEADER,
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *same-origin
    redirect: 'follow', // *manual, error
    referrer: 'no-referrer', // *client
  })
}
