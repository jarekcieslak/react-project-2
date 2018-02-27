import {combineReducers} from "redux";
import postListReducer from "../post-list/PostListReducer";
import postDetailsReducer from "../post-details/PostDetailsReducer";


export default combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer
});
