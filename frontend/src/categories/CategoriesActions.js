export const CATEGORIES_LOAD_START = 'CATEGORIES_LOAD_START';
export const CATEGORIES_LOAD_SUCCESS = 'CATEGORIES_LOAD_SUCCESS';
export const CATEGORIES_LOAD_ERROR = 'CATEGORIES_LOAD_ERROR';


export const allCategoriesLoad = () => {
    return {
        type: CATEGORIES_LOAD_START,
    }
};

export const allCategoriesReceived = (data) => {
    return {
        type: CATEGORIES_LOAD_SUCCESS,
        data
    }
};

export const allCategoriesError = (data) => {
    return {
        type: CATEGORIES_LOAD_ERROR,
        data: null
    }
};


