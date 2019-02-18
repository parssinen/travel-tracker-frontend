const reducer = (store = { title: '', text: '' }, action) => {
  switch (action.type) {
    case 'MARKER_TITLE':
      return { ...store, title: action.title }
    case 'MARKER_TEXT':
      return { ...store, text: action.text }
    case 'MARKER_TEXT':
      return action.form
    case 'MARKER_CLEAR':
      return { title: '', text: '' }
    default:
      return store
  }
}

export const updateTitle = title => dispatch => {
  dispatch({
    type: 'MARKER_TITLE',
    title
  })
}

export const updateText = text => dispatch => {
  dispatch({
    type: 'MARKER_TEXT',
    text
  })
}

export const updateForm = form => dispatch => {
  dispatch({
    type: 'MARKER_FORM',
    form
  })
}

export const clearForm = () => dispatch => {
  dispatch({
    type: 'MARKER_CLEAR'
  })
}

export default reducer
