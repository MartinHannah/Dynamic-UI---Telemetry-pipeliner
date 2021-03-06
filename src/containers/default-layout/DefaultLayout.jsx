import * as React from 'react';
import './DefaultLayout.css';
import * as Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from "react-router-dom";


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
        marginTop: '25px',
        overflow: 'auto',
      },
      appBarSpacer: theme.mixins.toolbar,
});

const LoadableAppBar = Loadable({
    loader: () => import('../TopBar/TopBar'),
    loading() {
      return <div>Loading...</div>
    }
  });

const LoadableSideBar = Loadable({
    loader: () => import('../Sidebar/Sidebar'),
    loading() {
      return <div>Loading...</div>
    }
  });

class DefaultLayout extends React.Component{ 

    componentWillMount(){
    }
    
    render() {
        const { classes, views } = this.props;
        return (
          <div className={classes.root}>
            <LoadableAppBar />
            <LoadableSideBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer}>
                <Switch>
                  {views.map((view) => (
                    <Route
                      key={view.displayName}
                      path={view.path}
                      exact={view.exact}
                      name={view.displayName}
                      render={props => <view.component {...props} />}
                    />
                    ))}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </div>
            </main>
          </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      views: state.viewReducer.views
    };
  }

const mapDispatchToProps = () => {
    return { 

    }
  }

DefaultLayout.propTypes = {
    classes: PropTypes.shape.isRequired,
    views: PropTypes.shape.isRequired
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, {withTheme: true})
)(DefaultLayout);