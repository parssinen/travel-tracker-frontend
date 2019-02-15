import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import messageReducer from './reducers/messageReducer'

const reducer = combineReducers({
  message: messageReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store
