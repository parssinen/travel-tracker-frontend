const reducer = (store = {}, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return action.message
    case 'REMOVE_MESSAGE':
      return {}
    default:
      return store
  }
}

export const showMessage = message => {
  return dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      })
    }, 2000)
  }
}

export default reducer
