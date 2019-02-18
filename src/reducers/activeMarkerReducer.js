const reducer = (store = { title: '', text: '' }, action) => {
  switch (action.type) {
    case 'ADD_ACTIVE_MARKER':
      return action.marker
    case 'REMOVE_ACTIVE_MARKER':
      return { title: '', text: '' }
    default:
      return store
  }
}

export const addActiveMarker = marker => dispatch => {
  dispatch({
    type: 'ADD_ACTIVE_MARKER',
    marker
  })
}

export const removeActiveMarker = () => dispatch => {
  dispatch({
    type: 'REMOVE_ACTIVE_MARKER'
  })
}

export default reducer
