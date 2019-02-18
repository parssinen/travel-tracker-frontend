const reducer = (
  store = { username: '', password: '', password2: '' },
  action
) => {
  switch (action.type) {
    case 'REGISTER_USERNAME':
      return { ...store, username: action.username }
    case 'REGISTER_PASSWORD':
      return { ...store, password: action.password }
    case 'REGISTER_PASSWORD2':
      return { ...store, password2: action.password2 }
    case 'REGISTER_CLEAR':
      return { username: '', password: '', password2: '' }
    default:
      return store
  }
}

export const updateUsername = username => dispatch => {
  dispatch({
    type: 'REGISTER_USERNAME',
    username
  })
}

export const updatePassword = password => dispatch => {
  dispatch({
    type: 'REGISTER_PASSWORD',
    password
  })
}

export const updatePassword2 = password2 => dispatch => {
  dispatch({
    type: 'REGISTER_PASSWORD2',
    password2
  })
}

export const clearForm = () => dispatch => {
  dispatch({
    type: 'REGISTER_CLEAR'
  })
}

export default reducer
