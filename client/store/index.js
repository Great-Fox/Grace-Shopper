import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allRingtonesReducer from './redux/allRingtones';
import auth from './auth';
import singleRingtoneReducer from './redux/singleRingtone';
import storageReducer from './redux/storage';
import allUsersReducer from './redux/adminUsers';
import orderHistoryReducer from './redux/orderHistory'

const reducer = combineReducers({
  auth,
  ringtones: allRingtonesReducer,
  ringtone: singleRingtoneReducer,
  storage: storageReducer,
  users: allUsersReducer,
  orders: orderHistoryReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
