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

    case 'UPDATE_POST':
      console.log('REDUCER: ', payload.title)
      return {
        ...state,
        items: state.items.map(item =>
          item._id === payload._id ? payload : item
        )
      }

    case 'DELETE_POST':
      return {
        ...state,
        items: state.items.filter(items => items._id !== payload)
      }

    default:
      return state
  }
}

export default postsReducer
