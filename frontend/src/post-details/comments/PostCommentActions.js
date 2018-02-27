export const POST_ADDCOMMENT_START = 'POST_ADDCOMMENT_START';
export const POST_ADDCOMMENT_SUCCESS = 'POST_ADDCOMMENT_SUCCESS';
export const POST_ADDCOMMENT_ERROR = 'POST_ADDCOMMENT_ERROR';

export const postAddCommentLoad = () => {
  return {
    type: POST_ADDCOMMENT_START,
  }
};

export const postAddCommentReceived = (data) => {
  return {
    type: POST_ADDCOMMENT_SUCCESS,
    data
  }
};

export const postAddCommentError = (data) => {
  return {
    type: POST_ADDCOMMENT_ERROR,
    data: null
  }
};


