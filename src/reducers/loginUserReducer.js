const reducer = (store = { username: '', password: '' }, action) => {
  switch (action.type) {
    case 'CLEARLOGIN':
      return {
        username: '',
        password: ''
      }
    case 'USERNAMELOGIN':
      return {
        username: action.username,
        password: store.password
      }
    case 'PASSWORDLOGIN':
      return {
        username: store.username,
        password: action.password
      }
    default:
      return store
  }
}

export const updateUsername = username => dispatch => {
  dispatch({
    type: 'USERNAMELOGIN',
    username: username
  })
}

export const updatePassword = password => dispatch => {
  dispatch({
    type: 'PASSWORDLOGIN',
    password: password
  })
}

export const clearLogin = () => dispatch => {
  dispatch({
    type: 'CLEARLOGIN'
  })
}

export default reducer
