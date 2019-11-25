import { combineReducers } from 'redux';

const eventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORG_EVENTS':
            return action.payload;
        default:
            return state;
    }
};

const userEventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_EVENTS':
            return action.payload;
        default:
            return state;
    }
};

const eventDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EVENT_DETAILS':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    eventsReducer,
    userEventsReducer,
    eventDetailsReducer
});
