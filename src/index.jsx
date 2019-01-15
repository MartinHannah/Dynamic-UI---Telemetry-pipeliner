import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';

import { loadViews } from './actions/views/actions';

const store = configureStore();
store.dispatch(loadViews()); //Load the routes

ReactDOM.render(
  <Provider store={store}><App /></Provider>
    , document.getElementById('root'));
