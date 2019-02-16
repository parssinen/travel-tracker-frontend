import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import loginUserReducer from './reducers/loginUserReducer'
import registerUserReducer from './reducers/registerUserReducer'
import markerInfoReducer from './reducers/markerInfoReducer'
import modalReducer from './reducers/modalReducer'
import menuReducer from './reducers/menuReducer'
import confirmReducer from './reducers/confirmReducer'
import activeMarkerReducer from './reducers/activeMarkerReducer'
import markersReducer from './reducers/markersReducer'

const reducer = combineReducers({
  message: messageReducer,
  user: userReducer,
  userToLogin: loginUserReducer,
  userToRegister: registerUserReducer,
  markerInfo: markerInfoReducer,
  modal: modalReducer,
  confirm: confirmReducer,
  menu: menuReducer,
  activeMarker: activeMarkerReducer,
  markers: markersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
