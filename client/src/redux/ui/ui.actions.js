export const setIsLoading = isLoading => dispatch => {
  dispatch({ type: 'SET_ISLOADING', payload: isLoading })
}
