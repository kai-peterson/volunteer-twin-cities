import { combineReducers } from 'redux';

const setOrgsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORGS':
            return action.payload;
        default:
            return state;
    }
};

const orgDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ORG_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

const orgImagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORG_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    setOrgsReducer,
    orgDetailsReducer,
    orgImagesReducer
  });
