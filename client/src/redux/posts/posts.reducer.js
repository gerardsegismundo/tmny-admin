const initialState = {
  items: []
}

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_POSTS':
      return {
        ...state,
        items: payload
      }
    case 'ADD_POST':
      return {
        ...state,
        items: [...state.items, payload]
      }

    default:
      return state
  }
}

export default postsReducer
