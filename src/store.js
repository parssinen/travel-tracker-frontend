import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
  message: messageReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store
