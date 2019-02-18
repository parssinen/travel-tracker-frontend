const reducer = (store = null, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.user
    case 'REMOVE_USER':
      return null
    default:
      return store
  }
}

export const login = user => dispatch => {
  dispatch({
    type: 'ADD_USER',
    user
  })
}

export const logout = () => dispatch => {
  dispatch({
    type: 'REMOVE_USER'
  })
}

export default reducer
