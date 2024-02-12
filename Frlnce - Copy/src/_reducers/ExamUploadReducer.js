const initialState = {
  examupload: []
}

const  examUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "examupload":
      return {
        ...state,
		    examupload: action.data
      };
    default:
      return state
  }
}

export default examUploadReducer;