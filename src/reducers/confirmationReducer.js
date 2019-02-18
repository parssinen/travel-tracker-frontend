const reducer = (store = false, action) => {
  switch (action.type) {
    case 'OPEN_CONFIRMATION':
      return true
    case 'CLOSE_CONFIRMATION':
      return false
    default:
      return store
  }
}

export const openConfirmation = () => dispatch => {
  dispatch({
    type: 'OPEN_CONFIRMATION'
  })
}

export const closeConfirmation = () => dispatch => {
  dispatch({
    type: 'CLOSE_CONFIRMATION'
  })
}

export default reducer
