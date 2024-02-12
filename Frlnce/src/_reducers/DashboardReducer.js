const initialState = {
  dashboard: []
}

const  dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "dashboard":
      return {
        ...state,
		    dashboard: action.data
      };
    default:
      return state
  }
}

export default dashboardReducer;