import * as React from 'react';
import './App.css';
import * as Loadable from 'react-loadable';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

const LoadableLayout = Loadable({
  loader: () => import('./containers/default-layout/DefaultLayout'),
  loading() {
    return <div>Loading...</div>
  }
});


class App extends React.Component {
  
  componentDidMount(){
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }
  render() {
    return (
      <div className="App">
        <LoadableLayout />
      </div>
    );
  }
}


export default App;

