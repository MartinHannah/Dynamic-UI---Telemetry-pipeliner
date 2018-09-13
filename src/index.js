import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import { loadViews }from './actions/views/actions';

const store = configureStore();
store.dispatch(loadViews(1));

ReactDOM.render(
  <Provider store={store}><App /></Provider>
    , document.getElementById('root'));
