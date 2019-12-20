const initialState = {
  isLoading: false
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ISLOADING':
      return {
        ...state,
        isLoading: payload
      }

    default:
      return state
  }
}

export default uiReducer
