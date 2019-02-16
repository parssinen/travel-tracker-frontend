const reducer = (
  store = { username: '', password: '', password2: '' },
  action
) => {
  switch (action.type) {
    case 'UPDATEREG':
      return action.userToLogin
    case 'USERNAMEREG':
      return {
        username: action.username,
        password: store.password,
        password2: store.password2
      }
    case 'PASSWORDREG':
      return {
        username: store.username,
        password: action.password,
        password2: store.password2
      }
    case 'PASSWORD2REG':
      return {
        username: store.username,
        password: store.password,
        password2: action.password2
      }
    default:
      return store
  }
}

export const updateRUsername = username => dispatch => {
  dispatch({
    type: 'USERNAMEREG',
    username: username
  })
}

export const updateRPassword = password => dispatch => {
  dispatch({
    type: 'PASSWORDREG',
    password: password
  })
}

export const updateRPassword2 = password2 => dispatch => {
  dispatch({
    type: 'PASSWORD2REG',
    password2: password2
  })
}

export const clearRegister = () => dispatch => {
  dispatch({
    type: 'UPDATEREG',
    userToLogin: {
      username: '',
      password: '',
      password2: ''
    }
  })
}

export default reducer
