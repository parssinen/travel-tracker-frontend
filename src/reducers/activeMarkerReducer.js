const reducer = (store = {}, action) => {
  switch (action.type) {
    case 'ADDMARKER':
      return action.marker
    case 'REMOVEMARKER':
      return null
    default:
      return store
  }
}

export const addActiveMarker = marker => dispatch => {
  dispatch({
    type: 'ADDMARKER',
    marker
  })
}

export const clearActiveMarker = () => dispatch => {
  dispatch({
    type: 'REMOVEMARKER'
  })
}

export default reducer
