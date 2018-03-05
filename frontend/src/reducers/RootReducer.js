import {combineReducers} from "redux";
import postListReducer from "../post-list/PostListReducer";
import postDetailsReducer from "../post-details/PostDetailsReducer";
import postCommentsReducer from "../post-details/comments/PostCommentsReducer";
import categoriesReducer from "../categories/CategoriesReducer";


export default combineReducers({
    postList: postListReducer,
    postDetails: postDetailsReducer,
    postComments: postCommentsReducer,
    categories: categoriesReducer
});
