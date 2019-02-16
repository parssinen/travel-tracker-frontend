const reducer = (store = false, action) => {
  switch (action.type) {
    case 'OPENCONFIRM':
      return true
    case 'CLOSECONFIRM':
      return false
    default:
      return store
  }
}

export const openConfirm = () => dispatch => {
  dispatch({
    type: 'OPENCONFIRM'
  })
}

export const closeConfirm = () => dispatch => {
  dispatch({
    type: 'CLOSECONFIRM'
  })
}

export default reducer
