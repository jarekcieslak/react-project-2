import {
  POST_COMMENT_LOAD_ERROR,
  POST_COMMENT_LOAD_START,
  POST_COMMENT_LOAD_SUCCESS,
  POST_LOAD_ERROR,
  POST_LOAD_START,
  POST_LOAD_SUCCESS
} from "./PostDetailsActions";
import {POST_VOTE_SUCCESS} from "../post-list/PostListActions";
import {POST_ADDCOMMENT_SUCCESS} from "./PostCommentAddActions";

const postDetailsInitialState = {
  status: null,
  data: null,
  comments: null,
  statusComments: null
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

    case POST_VOTE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          voteScore: action.data.voteScore
        }
      };
    case POST_COMMENT_LOAD_START:
      return {
        ...state,
        comments: null,
        statusComments: 'loading'
      };
    case POST_COMMENT_LOAD_ERROR:
      return {
        ...state,
        comments: null,
        statusComments: 'error'
      };
    case POST_COMMENT_LOAD_SUCCESS:
      return {
        ...state,
        comments: action.data,
        statusComments: 'ok'
      };
    case POST_ADDCOMMENT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          commentCount: state.data.commentCount + 1
        },
        comments: [...state.comments, action.data]
      };


    default:
      return state
  }
}

export default postDetailsReducer;
