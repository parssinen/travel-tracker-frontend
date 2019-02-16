const reducer = (store = '', action) => {
  switch (action.type) {
    case 'CHANGETAB':
      return action.tab
    default:
      return store
  }
}

export const changeTab = tab => dispatch => {
  dispatch({
    type: 'CHANGETAB',
    tab: tab
  })
}

export default reducer
