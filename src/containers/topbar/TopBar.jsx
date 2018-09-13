import * as React from 'react';
import './TopBar.css';
import PropTypes from 'prop-types'; 
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import * as viewActions from '../../actions/views/actions';

const drawerWidth = 240;
const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#fff',
        color: '#000'
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
});

class TopBar extends React.Component { 

    componentDidMount(){

    }

    render() {
        const {currentView, classes, menuOpen, toggleMenu } = this.props;

        return (
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, menuOpen && classes.appBarShift)}
          >
            <Toolbar disableGutters={!menuOpen}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={() => toggleMenu(true)}
                className={classNames(classes.menuButton, menuOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {currentView}
              </Typography>
            </Toolbar>
          </AppBar>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    currentView: state.viewReducer.currentView,
    menuOpen: state.viewReducer.menuOpen
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    toggleMenu: (isOpen) => { 
        dispatch(viewActions.toggleMenu(isOpen));
    },
  }
}

TopBar.propTypes = {
    classes: PropTypes.shape.isRequired,
    currentView: PropTypes.string.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(TopBar);