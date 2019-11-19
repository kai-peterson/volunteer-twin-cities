const setOrgsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORGS':
            return action.payload;
        default:
            return state;
    }
};

export default setOrgsReducer;
