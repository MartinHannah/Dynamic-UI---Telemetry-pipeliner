import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';


import './App.scss';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';


class App extends React.Component {
  
  componentDidMount(){
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </Router>
    );
  }
}


export default DragDropContext(MultiBackend(HTML5toTouch))(App);

