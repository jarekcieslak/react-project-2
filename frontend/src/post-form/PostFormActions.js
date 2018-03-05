export const POST_ADD_START = 'POST_ADD_START';
export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';
export const POST_ADD_ERROR = 'POST_ADD_ERROR';


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
