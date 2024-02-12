const initialState = {
  biometricattendance: []
}

const  biometricAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "biometricattendance":
      return {
        ...state,
		    biometricattendance: action.data
      };
    default:
      return state
  }
}

export default biometricAttendanceReducer;