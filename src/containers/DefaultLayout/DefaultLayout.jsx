import * as React from 'react';
import './DefaultLayout.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import DefaultTopBar from '../DefaultTopBar/DefaultTopBar';
import DefaultSideBar from '../DefaultSideBar/DefaultSideBar';
import DefaultComponent from '../DefaultComponent/DefaultComponent';

type Props = { 
  /** Information on the routes that we pull in for the application */
  views: Array, 
  /** redux boolean for opening/closing the sidemenu */
  menuOpen: boolean
}
/**
  DefaultLayout is the top level component of the dynamic interface. It loads all other components. 
  At a top level it loads the [side bar](#defaultsidebar), [top bar](#defaulttopbar) and the main content inside the page [DefaultComponent](#defaultcomponent)
 */
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
                exact={Boolean(view.exact)}
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