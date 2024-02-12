const initialState = {
  product: []
}

const  productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "product":
      return {
        ...state,
		    product: action.data
      };
    default:
      return state
  }
}

export default productReducer;