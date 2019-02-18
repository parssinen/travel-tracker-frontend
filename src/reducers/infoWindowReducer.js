const reducer = (store = false, action) => {
  switch (action.type) {
    case 'OPEN_WINDOW':
      return true
    case 'CLOSE_WINDOW':
      return false
    default:
      return store
  }
}

export const openWindow = () => dispatch => {
  dispatch({
    type: 'OPEN_WINDOW'
  })
}

export const closeWindow = () => dispatch => {
  dispatch({
    type: 'CLOSE_WINDOW'
  })
}

export default reducer
