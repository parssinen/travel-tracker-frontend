import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import loginFormReducer from './reducers/loginFormReducer'
import registerFormReducer from './reducers/registerFormReducer'
import infoWindowReducer from './reducers/infoWindowReducer'
import menuTabReducer from './reducers/menuTabReducer'
import confirmationReducer from './reducers/confirmationReducer'
import markerFormReducer from './reducers/markerFormReducer'
import activeMarkerReducer from './reducers/activeMarkerReducer'
import markerReducer from './reducers/markerReducer'
import popupReducer from './reducers/popupReducer'

const reducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  infoWindow: infoWindowReducer,
  menuTab: menuTabReducer,
  confirmation: confirmationReducer,
  markerForm: markerFormReducer,
  activeMarker: activeMarkerReducer,
  markers: markerReducer,
  popup: popupReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
