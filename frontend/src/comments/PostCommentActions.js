export const POST_ADDCOMMENT_START = 'POST_ADDCOMMENT_START';
export const POST_ADDCOMMENT_SUCCESS = 'POST_ADDCOMMENT_SUCCESS';
export const POST_ADDCOMMENT_ERROR = 'POST_ADDCOMMENT_ERROR';

export const POST_VOTECOMMENT_START = 'POST_VOTECOMMENT_START';
export const POST_VOTECOMMENT_SUCCESS = 'POST_VOTECOMMENT_SUCCESS';
export const POST_VOTECOMMENT_ERROR = 'POST_VOTECOMMENT_ERROR';


export const POST_EDITCOMMENT_START = 'POST_EDITCOMMENT_START';
export const POST_EDITCOMMENT_SUCCESS = 'POST_EDITCOMMENT_SUCCESS';
export const POST_EDITCOMMENT_ERROR = 'POST_EDITCOMMENT_ERROR';


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


export const postVoteCommentLoad = (id) => {
    return {
        type: POST_VOTECOMMENT_START,
    }
};

export const postVoteCommentReceived = (data) => {
    return {
        type: POST_VOTECOMMENT_SUCCESS,
        data
    }
};

export const postVoteCommentError = (data) => {
    return {
        type: POST_VOTECOMMENT_ERROR,
        data: null
    }
};


export const postEditCommentLoad = (id) => {
    return {
        type: POST_EDITCOMMENT_START,
    }
};

export const postEditCommentReceived = (data) => {
    return {
        type: POST_EDITCOMMENT_SUCCESS,
        data
    }
};

export const postEditCommentError = (data) => {
    return {
        type: POST_EDITCOMMENT_ERROR,
        data: null
    }
};












