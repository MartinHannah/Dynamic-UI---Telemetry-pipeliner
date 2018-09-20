import * as React from 'react';
import * as Loadable from 'react-loadable';
import PropTypes from 'prop-types'; 
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import * as viewActions from '../../actions/views/actions';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
});

const LoadableSidebarItem= Loadable({
    loader: () => import('../../components/SidebarItem/SidebarItem'),
    loading() {
      return <div>Loading...</div>
    }
  });

class DefaultSideBar extends React.Component{ 

    componentWillMount(){

    }

    render() {
        const { classes, views, theme, menuOpen, toggleMenu, updateCurrentView, containers } = this.props;
        return (
          <div>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !menuOpen && classes.drawerPaperClose),
              }}
              open={menuOpen}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={() => toggleMenu(false)}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <List>
                {views.map((view) => <LoadableSidebarItem key={view.displayName} path={view.path} name={view.displayName} icon={view.icon} click={updateCurrentView} containers={containers} />)}
              </List>
            </Drawer>
          </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      views: state.viewReducer.views,
      viewsLoaded: state.viewReducer.viewsLoaded,
      currentView: state.viewReducer.currentView,
      menuOpen: state.viewReducer.menuOpen,
      containers: state.viewReducer.containers
    };
  }
  // 
  const mapDispatchToProps = (dispatch) => {
    return { 
      toggleMenu: (isOpen) => { 
          dispatch(viewActions.toggleMenu(isOpen));
      },
      updateCurrentView: (viewName, containers, find) => { 
          let container = find(viewName, containers);
          //console.log(state.viewReducer.containers);
          dispatch(viewActions.updateCurrentView(container));
      }
    }
  }

DefaultSideBar.propTypes = {
    classes: PropTypes.isRequired,
    theme: PropTypes.isRequired,
    views: PropTypes.shape.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    updateCurrentView: PropTypes.func.isRequired,
    containers: PropTypes.isRequired
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, {withTheme: true})
)(DefaultSideBar);