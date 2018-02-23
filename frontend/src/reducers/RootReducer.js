import {combineReducers} from "redux";
import postListReducer from "../post-list/PostListReducer";


export default combineReducers({
  postList: postListReducer
});
