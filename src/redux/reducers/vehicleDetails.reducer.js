const vehicleDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default vehicleDetailsReducer;
