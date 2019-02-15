const reducer = (store = '', action) => {
  switch (action.type) {
    case 'ADD':
      return action.user
    case 'REMOVE':
      return null
    default:
      return store
  }
}

export const loginUser = user => dispatch => {
  dispatch({
    type: 'ADD',
    user
  })
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: 'REMOVE'
  })
}

export default reducer
