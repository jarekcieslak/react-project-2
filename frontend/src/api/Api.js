import {allPostsError, allPostsLoad, allPostsReceived} from "../post-list/PostListActions";
import {mapJsonToPosts} from "../post-list/PostListMappers";
import {AUTH_HEADER, BASE_URL} from "../Constants";


// POST LIST
export const fetchAllPosts = () => dispatch => {
  dispatch(allPostsLoad());
  fetch(`${BASE_URL}/posts`, {headers: AUTH_HEADER})
    .then(res => res.json())
    .then(data => mapJsonToPosts(data))
    .then(data => new Promise(resolve => setTimeout(() => resolve(dispatch(allPostsReceived(data))), 500)))
    .catch(error => dispatch(allPostsError()))
};


// POST DETAILS
export function fetchPostDetails(id) {
  if (id) {
    return fetch(`${BASE_URL}/posts/${id}`, {headers: AUTH_HEADER})
      .then((res) => res.json())
  }
}

export function fetchPostComments(id) {
  if (id) {
    return fetch(`${BASE_URL}/posts/${id}/comments`, {headers: AUTH_HEADER})
      .then((res) => res.json())
  }
}
