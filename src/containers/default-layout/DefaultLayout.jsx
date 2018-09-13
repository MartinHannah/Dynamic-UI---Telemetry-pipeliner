import * as React from 'react';
import './DefaultLayout.css';
import * as Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import * as viewActions from '../../actions/views/actions';
import Dashboard from '../dashboard/Dashboard';
import Reports from '../reports/Reports';

const styles = theme => ({
    root: {
        height: '100vh',
        zIndex: 1,
        position: 'relative',
        display: 'flex',
      },
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
      },
      appBarSpacer: theme.mixins.toolbar,
});

const LoadableAppBar = Loadable({
    loader: () => import('../../components/topbar/TopBar'),
    loading() {
      return <div>Loading...</div>
    }
  });

const LoadableSideBar = Loadable({
    loader: () => import('../../components/sidebar/Sidebar'),
    loading() {
      return <div>Loading...</div>
    }
  });

class DefaultLayout extends React.Component{ 

    componentWillMount(){
        const { loadViews } = this.props;
        //Load admin view
        loadViews(1);
    }

    handlePageUpdate(view){ 
        const { updateCurrentView } = this.props;
        updateCurrentView(view);
    }
    
    render() {
        const { views, viewsLoaded, classes } = this.props;
        return (
          <Router>
            <div className={classes.root}>
              { viewsLoaded ? (
                <LoadableAppBar />
                ) 
              : null }
              { viewsLoaded ? (
                <LoadableSideBar />
                ) 
              : null }
              <main className={classes.content}>
                <div className={classes.appBarSpacer}>
                  <Switch>
                    {views.map((view) => (
                      <Route
                        key={view.displayName}
                        path={view.path}
                        exact={view.exact}
                        component={view.path === '/dashboard' ? Dashboard : Reports}
                      />
                    
                    ))}
                    <Redirect from="/" to="/dashboard" />
                  </Switch>
                </div>
              </main>
            </div>
          </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      views: state.viewReducer.views,
      viewsLoaded: state.viewReducer.viewsLoaded,
      currentView: state.viewReducer.currentView,
      menuOpen: state.viewReducer.menuOpen
    };
  }
  // 
  const mapDispatchToProps = (dispatch) => {
    return { 
      loadViews: (id) => { 
        dispatch(viewActions.loadViews(id));
      },
      toggleMenu: (isOpen) => { 
          dispatch(viewActions.toggleMenu(isOpen));
      },
      updateCurrentView: (view) => { 
          dispatch(viewActions.updateCurrentView(view));
      }
    }
  }

DefaultLayout.propTypes = {
    classes: PropTypes.isRequired,
    views: PropTypes.isRequired,
    currentView: PropTypes.isRequired,
    viewsLoaded: PropTypes.isRequired,
    loadViews: PropTypes.isRequired,
    menuOpen: PropTypes.isRequired,
    toggleMenu: PropTypes.isRequired,
    updateCurrentView: PropTypes.isRequired
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, {withTheme: true})
)(DefaultLayout);