const initialState = {
  messages: []
}

const  messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "messages":
      return {
        ...state,
		    messages: action.data
      };
    default:
      return state
  }
}

export default messagesReducer;