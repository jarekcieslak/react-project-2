import {CATEGORIES_LOAD_ERROR, CATEGORIES_LOAD_START, CATEGORIES_LOAD_SUCCESS} from "./CategoriesActions";

const categoriesInitialState = {
    status: null,
    data: []
};

function categoriesReducer(state = categoriesInitialState, action) {
    switch (action.type) {
        case CATEGORIES_LOAD_START:
            return {
                ...state,
                status: 'loading'
            };
        case CATEGORIES_LOAD_SUCCESS:
            return {
                data: action.data.categories,
                status: 'ok'
            };

        case CATEGORIES_LOAD_ERROR:
            return {
                data: null,
                status: 'error'
            };

        default:
            return state
    }
}

export default categoriesReducer;
