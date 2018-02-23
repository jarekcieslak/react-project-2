export const POSTS_LOAD_START = 'POSTS_LOAD_START';
export const POSTS_LOAD_SUCCESS = 'POSTS_LOAD_SUCCESS';
export const POSTS_LOAD_ERROR = 'POSTS_LOAD_ERROR';

export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const POST_VOTE_ERROR = 'POST_VOTE_ERROR';

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
    data: null
  }
};

export const postVoteSuccess = (data) => {
  const id = data['id'];
  return {
    type: POST_VOTE_SUCCESS,
    data
  }
};

export const postVoteError = (id) => {
  return {
    type: POST_VOTE_ERROR,
    id
  }
};

