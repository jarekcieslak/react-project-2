import {POST_VOTE_SUCCESS, POSTS_LOAD_ERROR, POSTS_LOAD_START, POSTS_LOAD_SUCCESS} from "./PostListActions";
import {POST_DELETE_LOAD_SUCCESS} from "../post-details/PostDetailsActions";

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
            posts[id] = {...posts[id], voteScore: action.data.voteScore};

            return {
                ...state,
                data: posts
            };

        case POST_DELETE_LOAD_SUCCESS:
            const post = action.data;
            const allPosts = Object.assign({}, state.data);
            delete allPosts[post.id];
            return {
                ...state,
                data: allPosts
            };

        default:
            return state
    }
}

export default postListReducer;
