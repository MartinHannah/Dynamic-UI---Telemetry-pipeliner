import * as React from 'react';
import './DefaultTopBar.scss';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import * as viewActions from '../../actions/views/actions';

const DefaultTopBar = ({ menuOpen, toggleMenu, currentView }) => { 
  return (
    <AppBar
      position="absolute"
      className={classNames('app-bar', menuOpen && 'app-bar-shift')}
    >
      <Toolbar disableGutters={!menuOpen}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => toggleMenu(true)}
          className={classNames('menu-button', menuOpen && 'hide')}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          {currentView.id}
        </Typography>
      </Toolbar>
    </AppBar>
  );
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

DefaultTopBar.propTypes = {
  currentView: PropTypes.shape({
    id: PropTypes.string.isRequired,
    widgets: PropTypes.array.isRequired }).isRequired,
    menuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultTopBar);