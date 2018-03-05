import {
    POST_COMMENT_LOAD_ERROR,
    POST_COMMENT_LOAD_START,
    POST_COMMENT_LOAD_SUCCESS,
    POST_DELCOMMENT_LOAD_SUCCESS
} from "../PostDetailsActions";
import {POST_ADDCOMMENT_SUCCESS, POST_EDITCOMMENT_SUCCESS, POST_VOTECOMMENT_SUCCESS} from "./PostCommentActions";

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
            const comments = {...state.data};
            comments[action.data.id] = action.data;
            return {
                ...state,
                data: comments
            };
        case POST_VOTECOMMENT_SUCCESS:
            const data = {...state.data};
            data[action.data.id] = action.data;
            return {
                ...state,
                data
            };
        case POST_DELCOMMENT_LOAD_SUCCESS:
            let data2 = {...state.data};
            delete data2[action.data.id];
            return {
                ...state,
                data: data2
            };


        case POST_EDITCOMMENT_SUCCESS:
            const commentsCopy = Object.assign({}, state.data);
            commentsCopy[action.data.id] = action.data;
            return {
                ...state,
                data: commentsCopy
            };


        default:
            return state
    }
}

export default postCommentsReducer;
