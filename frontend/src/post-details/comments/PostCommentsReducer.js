import {POST_COMMENT_LOAD_ERROR, POST_COMMENT_LOAD_START, POST_COMMENT_LOAD_SUCCESS} from "../PostDetailsActions";
import {POST_ADDCOMMENT_SUCCESS} from "./PostCommentActions";

const postCommentsInitialState = {
    data: null,
    status: null
};

function postCommentsReducer(state = postCommentsInitialState, action) {
    switch (action.type) {
        case POST_COMMENT_LOAD_START:
            return {
                ...state,
                data: null,
                status: 'loading'
            };
        case POST_COMMENT_LOAD_ERROR:
            return {
                ...state,
                data: null,
                status: 'error'
            };
        case POST_COMMENT_LOAD_SUCCESS:
            return {
                ...state,
                data: action.data,
                status: 'ok'
            };
        case POST_ADDCOMMENT_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.data]
            };

        default:
            return state
    }
}

export default postCommentsReducer;
