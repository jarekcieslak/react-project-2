export const POST_ADD_START = 'POST_ADD_START';
export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';
export const POST_ADD_ERROR = 'POST_ADD_ERROR';
export const POST_EDIT_START = 'POST_EDIT_START';
export const POST_EDIT_SUCCESS = 'POST_EDIT_SUCCESS';
export const POST_EDIT_ERROR = 'POST_EDIT_ERROR';



export const postAddLoad = () => {
    return {
        type: POST_ADD_START,
    }
};

export const postAddReceived = (data) => {
    return {
        type: POST_ADD_SUCCESS,
        data
    }
};

export const postAddError = (data) => {
    return {
        type: POST_ADD_ERROR,
        data: null
    }
};

export const postEditLoad = () => {
    return {
        type: POST_EDIT_START,
    }
};

export const postEditReceived = (data) => {
    return {
        type: POST_EDIT_SUCCESS,
        data
    }
};

export const postEditError = (data) => {
    return {
        type: POST_EDIT_ERROR,
        data: null
    }
};

