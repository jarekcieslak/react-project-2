import {combineReducers} from "redux";
import postListReducer from "../post-list/PostListReducer";
import postDetailsReducer from "../post-details/PostDetailsReducer";
import categoriesReducer from "../categories/CategoriesReducer";
import postCommentsReducer from "../comments/PostCommentsReducer";


export default combineReducers({
    postList: postListReducer,
    postDetails: postDetailsReducer,
    postComments: postCommentsReducer,
    categories: categoriesReducer
});
