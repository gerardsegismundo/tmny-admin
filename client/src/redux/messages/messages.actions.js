import axios from 'axios'

// Get messages
export const getMessages = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.get('/api/messages', config)

    console.log(res.data)
    dispatch({
      type: 'GET_MESSAGES',
      payload: res.data
    })
  } catch (err) {
    const { error } = err.response.data

    console.log(error)
  }
}
