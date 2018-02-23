import {POSTS_LOAD_ERROR, POSTS_LOAD_START, POSTS_LOAD_SUCCESS} from "./PostListActions";

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

    default:
      return state
  }
}

export default postListReducer;
