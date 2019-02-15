const reducer = (store = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.color
    default:
      return store
  }
}

export const messageColor = color => dispatch => {
  dispatch({
    type: 'CHANGE',
    color
  })
}

export default reducer
