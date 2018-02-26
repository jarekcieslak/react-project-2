import {POST_VOTE_SUCCESS, POSTS_LOAD_ERROR, POSTS_LOAD_START, POSTS_LOAD_SUCCESS} from "./PostListActions";

const postsListInitialState = {
  status: null,
  data: null
};

function postListReducer(state = postsListInitialState, action) {
  switch (action.type) {
    case POSTS_LOAD_START:
      return {
        ...state,
        status: 'loading'
      };
    case POSTS_LOAD_SUCCESS:
      return {
        data: action.data,
        status: 'ok'
      };

    case POSTS_LOAD_ERROR:
      return {
        data: null,
        status: 'error'
      };

    case POST_VOTE_SUCCESS:
      const posts = Object.assign({}, state.data);
      const id = action.data.id;
      posts[id] = {...posts[id], voteScore: posts[id].voteScore + 1};

      return {
        ...state,
        data: posts
      };

    default:
      return state
  }
}

export default postListReducer;
