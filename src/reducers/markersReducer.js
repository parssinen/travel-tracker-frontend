const reducer = (store = [], action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.markers
    default:
      return store
  }
}

export const initMarkers = markers => dispatch => {
  dispatch({
    type: 'UPDATE',
    markers
  })
}

export const addMarker = marker => dispatch => {
  const markers = this.store.markers
  dispatch({
    type: 'UPDATE',
    markers: markers.concat(marker)
  })
}

export default reducer
