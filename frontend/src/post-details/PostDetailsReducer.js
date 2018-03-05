import {POST_LOAD_ERROR, POST_LOAD_START, POST_LOAD_SUCCESS} from "./PostDetailsActions";
import {POST_VOTE_SUCCESS} from "../post-list/PostListActions";
import {POST_ADDCOMMENT_SUCCESS} from "../comments/PostCommentActions";

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

        case POST_ADDCOMMENT_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    commentCount: state.data.commentCount + 1
                },
            };

        default:
            return state
    }
}

export default postDetailsReducer;
