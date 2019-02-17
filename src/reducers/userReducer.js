const reducer = (store = null, action) => {
  switch (action.type) {
    case 'ADDUSER':
      return action.user
    case 'REMOVEUSER':
      return null
    default:
      return store
  }
}

export const loginUser = user => dispatch => {
  dispatch({
    type: 'ADDUSER',
    user
  })
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: 'REMOVEUSER'
  })
}

export default reducer
