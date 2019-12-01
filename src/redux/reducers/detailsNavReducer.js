const detailsNavReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_NAV':
            return Number(action.payload);
        default:
            return state;
    }
};

export default detailsNavReducer;
