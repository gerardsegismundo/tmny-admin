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
      console.log('ADD_POST')
      console.log(state)
      console.log(payload)
      return {
        ...state
        // items: [...state.items, payload]
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
