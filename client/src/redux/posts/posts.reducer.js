const initialState = {
  items: []
}

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_POSTS':
      console.log(payload)
      return {
        ...state,
        items: payload
      }

    default:
      return state
  }
}

export default postsReducer
