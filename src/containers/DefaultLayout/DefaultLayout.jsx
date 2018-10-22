import * as React from 'react';
import './DefaultLayout.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from "react-router-dom";
import { DefaultTopBar, DefaultComponent, DefaultSideBar } from '../../utils/views';

const DefaultLayout = ({ views }) => { 
  return (
    <div className='root'>
      <DefaultTopBar />
      <DefaultSideBar />
      <main className='content'>
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
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </div>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
    return {
      views: state.viewReducer.views
    };
  }

DefaultLayout.propTypes = {
    views: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        exact: PropTypes.bool.isRequired,
        icon: PropTypes.string.isRequired
      })
    ).isRequired
};

export default connect(mapStateToProps)(DefaultLayout);