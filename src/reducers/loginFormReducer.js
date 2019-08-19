const reducer = (store = { username: '', password: '' }, action) => {
  switch (action.type) {
    case 'LOGIN_LATITUDE':
      return { ...store, latitude: action.latitude }
    case 'LOGIN_LONGITUDE':
      return { ...store, longitude: action.longitude }
    case 'LOGIN_USERNAME':
      return { ...store, username: action.username }
    case 'LOGIN_PASSWORD':
      return { ...store, password: action.password }
    case 'LOGIN_CLEAR':
      return { username: '', password: '' }
    default:
      return store
  }
}

export const updateLatitude = latitude => dispatch => {
  dispatch({
    type: 'LOGIN_LATITUDE',
    latitude
  })
}

export const updateLongitude = longitude => dispatch => {
  dispatch({
    type: 'LOGIN_LONGITUDE',
    longitude
  })
}

export const updateUsername = username => dispatch => {
  dispatch({
    type: 'LOGIN_USERNAME',
    username
  })
}

export const updatePassword = password => dispatch => {
  dispatch({
    type: 'LOGIN_PASSWORD',
    password
  })
}

export const clearForm = () => dispatch => {
  dispatch({
    type: 'LOGIN_CLEAR'
  })
}

export default reducer
