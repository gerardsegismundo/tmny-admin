const initialState = {
  items: []
}

const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_MESSAGES': {
      return {
        ...state,
        messages: payload
      }
    }
    default:
      return state
  }
}

export default messagesReducer
