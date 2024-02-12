const initialState = {
  attendance: []
}

const  attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "attendance":
      return {
        ...state,
		    attendance: action.data
      };
    default:
      return state
  }
}

export default attendanceReducer;