const reducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_MARKERS':
      return action.markers
    case 'ADD_MARKER':
      return [...store, action.marker]
    case 'REPLACE_MARKER':
      const editedMarkers = store.filter(m => m.id !== action.id)
      return editedMarkers.concat(action.marker)
    case 'REMOVE_MARKER':
      return store.filter(m => m.id !== action.id)
    default:
      return store
  }
}

export const initMarkers = markers => dispatch => {
  dispatch({
    type: 'INIT_MARKERS',
    markers
  })
}

export const addMarker = marker => dispatch => {
  dispatch({
    type: 'ADD_MARKER',
    marker
  })
}

export const replaceMarker = (id, marker) => dispatch => {
  dispatch({
    type: 'REPLACE_MARKER',
    id,
    marker
  })
}

export const removeMarker = id => dispatch => {
  dispatch({
    type: 'REMOVE_MARKER',
    id
  })
}

export default reducer
