import {combineReducers} from "redux";
import postListReducer from "../post-list/PostListReducer";
import postDetailsReducer from "../post-details/PostDetailsReducer";
import postCommentsReducer from "../post-details/comments/PostCommentsReducer";


export default combineReducers({
    postList: postListReducer,
    postDetails: postDetailsReducer,
    postComments: postCommentsReducer
});
