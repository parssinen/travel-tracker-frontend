const reducer = (store = { title: '', text: '' }, action) => {
  switch (action.type) {
    case 'UPDATEMARKER':
      return action.markerInfo
    case 'CLEARMARKER':
      return {
        title: '',
        text: ''
      }
    case 'UPDATETITLE':
      return {
        title: action.title,
        text: store.text
      }
    case 'UPDATETEXT':
      return {
        title: store.title,
        text: action.text
      }
    default:
      return store
  }
}

export const updateMarkerInfo = markerInfo => dispatch => {
  dispatch({
    type: 'UPDATEMARKER',
    markerInfo: markerInfo
  })
}

export const clearMarkerInfo = () => dispatch => {
  dispatch({
    type: 'CLEARMARKER'
  })
}

export const updateTitle = title => dispatch => {
  dispatch({
    type: 'UPDATETITLE',
    title: title
  })
}

export const updateText = text => dispatch => {
  dispatch({
    type: 'UPDATETEXT',
    text: text
  })
}

export default reducer
