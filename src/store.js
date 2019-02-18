import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import loginFormReducer from './reducers/loginFormReducer'
import registerFormReducer from './reducers/registerFormReducer'
import markerInfoReducer from './reducers/markerInfoReducer'
import modalReducer from './reducers/modalReducer'
import menuReducer from './reducers/menuReducer'
import confirmReducer from './reducers/confirmReducer'
import activeMarkerReducer from './reducers/activeMarkerReducer'
import markersReducer from './reducers/markersReducer'

const reducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  markerInfo: markerInfoReducer,
  modal: modalReducer,
  confirm: confirmReducer,
  menu: menuReducer,
  activeMarker: activeMarkerReducer,
  markers: markersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
