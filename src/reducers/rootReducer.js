import { combineReducers } from 'redux';
import viewReducer from './viewReducer';

const rootReducer = combineReducers({
  viewReducer,
});

export default rootReducer;
