const reducer = (store = '', action) => {
  switch (action.type) {
    case 'CHANGE_TAB':
      return action.tab
    default:
      return store
  }
}

export const changeTab = tab => dispatch => {
  dispatch({
    type: 'CHANGE_TAB',
    tab
  })
}

export default reducer
