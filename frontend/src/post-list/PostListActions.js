export const POSTS_LOAD_START = 'POSTS_LOAD_START';
export const POSTS_LOAD_SUCCESS = 'POSTS_LOAD_SUCCESS';
export const POSTS_LOAD_ERROR = 'POSTS_LOAD_ERROR';

export const allPostsLoad = () => {
  return {
    type: POSTS_LOAD_START,
  }
};

export const allPostsReceived = (data) => {
  return {
    type: POSTS_LOAD_SUCCESS,
    data
  }
};

export const allPostsError = (data) => {
  return {
    type: POSTS_LOAD_ERROR,
    posts: null
  }
};


