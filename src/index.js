import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import { loadViews, loadContainers }from './actions/views/actions';

const store = configureStore();
store.dispatch(loadViews('admin'));
store.dispatch(loadContainers(10));

ReactDOM.render(
  <Provider store={store}><App /></Provider>
    , document.getElementById('root'));
