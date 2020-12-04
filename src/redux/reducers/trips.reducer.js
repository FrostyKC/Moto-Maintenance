const tripReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRIPS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default tripReducer;
