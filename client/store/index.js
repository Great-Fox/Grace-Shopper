import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allRingtonesReducer from './redux/allRingtones';
import auth from './auth';
import singleRingtoneReducer from './redux/singleRingtone';

const reducer = combineReducers({ 
  auth, 
  ringtones: allRingtonesReducer,
  ringtone: singleRingtoneReducer  
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
