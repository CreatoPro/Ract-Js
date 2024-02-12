const initialState = {
  resource: []
}

const  resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "resource":
      return {
        ...state,
		    resource: action.data
      };
    default:
      return state
  }
}

export default resourceReducer;