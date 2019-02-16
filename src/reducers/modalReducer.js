const reducer = (store = false, action) => {
  switch (action.type) {
    case 'OPENMODAL':
      return true
    case 'CLOSEMODAL':
      return false
    default:
      return store
  }
}

export const openModal = () => dispatch => {
  dispatch({
    type: 'OPENMODAL'
  })
}

export const closeModal = () => dispatch => {
  dispatch({
    type: 'CLOSEMODAL'
  })
}

export default reducer
