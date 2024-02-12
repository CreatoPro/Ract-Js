const initialState = {
  analysis: []
}

const  analysisReducer = (state = initialState, action) => {
  switch (action.type) {
    case "analysis":
      return {
        ...state,
		    analysis: action.data
      };
    default:
      return state
  }
}

export default analysisReducer;