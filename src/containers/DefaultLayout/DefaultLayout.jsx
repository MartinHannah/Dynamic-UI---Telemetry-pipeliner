import * as React from 'react';
import './DefaultLayout.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import DefaultTopBar from '../DefaultTopBar/DefaultTopBar';
import DefaultSideBar from '../DefaultSideBar/DefaultSideBar';
import DefaultComponent from '../DefaultComponent/DefaultComponent';

type Props = { 
  views: Array,
  menuOpen: boolean
}

const DefaultLayout = (props: Props) => { 
  const { views, menuOpen } = props;
  return (
    <div className='root'>
      <DefaultSideBar />
      <DefaultTopBar /> 
      <main className={classNames('content', menuOpen && 'sidebar-closed', !menuOpen && 'sidebar-open')}>
        <div className='spacer'>
          <Switch>
            {views.map((view) => (
              <Route
                key={view.id}
                path={view.path}
                exact={view.exact}
                name={view.id}
                component={DefaultComponent}
              />
              ))}
            <Redirect from="/" to="/customers" />
          </Switch>
        </div>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
    return {
      views: state.viewReducer.views,
      menuOpen: state.viewReducer.menuOpen
    };
  }

export default connect(mapStateToProps)(DefaultLayout);