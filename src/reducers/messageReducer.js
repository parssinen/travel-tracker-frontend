const reducer = (store = {}, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.message
    case 'CLEAR':
      return {}
    default:
      return store
  }
}

export const updateMessage = message => {
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, 2000)
  }
}

export default reducer
