import {POST_LOAD_ERROR, POST_LOAD_START, POST_LOAD_SUCCESS} from "./PostDetailsActions";

const postDetailsInitialState = {
  status: null,
  data: null
};

function postDetailsReducer(state = postDetailsInitialState, action) {
  switch (action.type) {
    case POST_LOAD_START:
      return {
        ...state,
        data: null,
        status: 'loading'
      };
    case POST_LOAD_SUCCESS:
      return {
        data: action.data,
        status: 'ok'
      };

    case POST_LOAD_ERROR:
      return {
        data: null,
        status: 'error'
      };

    default:
      return state
  }
}

export default postDetailsReducer;
