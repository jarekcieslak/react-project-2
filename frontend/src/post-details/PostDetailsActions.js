export const POST_LOAD_START = 'POST_LOAD_START';
export const POST_LOAD_SUCCESS = 'POST_LOAD_SUCCESS';
export const POST_LOAD_ERROR = 'POST_LOAD_ERROR';

export const POST_COMMENT_LOAD_START = 'POST_COMMENT_LOAD_START';
export const POST_COMMENT_LOAD_SUCCESS = 'POST_COMMENT_LOAD_SUCCESS';
export const POST_COMMENT_LOAD_ERROR = 'POST_COMMENT_LOAD_ERROR';

export const POST_DELCOMMENT_LOAD_START = 'POST_DELCOMMENT_LOAD_START';
export const POST_DELCOMMENT_LOAD_SUCCESS = 'POST_DELCOMMENT_LOAD_SUCCESS';
export const POST_DELCOMMENT_LOAD_ERROR = 'POST_DELCOMMENT_LOAD_ERROR';


export const postDetailsLoad = () => {
  return {
    type: POST_LOAD_START,
  }
};

export const postDetailsReceived = (data) => {
  return {
    type: POST_LOAD_SUCCESS,
    data
  }
};

export const postDetailsError = (data) => {
  return {
    type: POST_LOAD_ERROR,
    data: null
  }
};


export const postCommentsLoad = () => {
  return {
    type: POST_COMMENT_LOAD_START,
  }
};

export const postCommentsReceived = (data) => {
  return {
    type: POST_COMMENT_LOAD_SUCCESS,
    data
  }
};

export const postCommentsError = (data) => {
  return {
    type: POST_COMMENT_LOAD_ERROR,
    data: null
  }
};




export const postDeleteCommentLoad = () => {
    return {
        type: POST_DELCOMMENT_LOAD_START,
    }
};

export const postDeleteCommentReceived = (data) => {
    return {
        type: POST_DELCOMMENT_LOAD_SUCCESS,
        data
    }
};

export const postDeleteCommentError = (data) => {
    return {
        type: POST_DELCOMMENT_LOAD_ERROR,
        data: null
    }
};





