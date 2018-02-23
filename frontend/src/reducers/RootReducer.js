import {combineReducers} from "redux";
import postListReducer from "../post-list/PostListReducer";
import postDetailsReducer from "../post-details/postDetailsReducer";


export default combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer
});
