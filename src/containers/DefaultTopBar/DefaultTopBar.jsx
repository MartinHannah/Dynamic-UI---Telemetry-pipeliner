import * as React from 'react';
import './DefaultTopBar.scss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import * as viewActions from '../../actions/views/actions';

type Props = { 
  /** The information about the current page we are on. Should contain info for loading correct widgets etc. */
  currentView: Object, 
  /** redux boolean for opening and closing menu, shared with sidebar component */
  menuOpen: boolean,
  /** opens/closes the sidemenu, shared with sidebar component. */
  toggleMenu: Function
}

/** The DefaultTopBar is a container component that loads the relevant information for the top bar section of the application */
const DefaultTopBar = (props: Props) => { 
  const { menuOpen, toggleMenu, currentView } = props;
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
          {currentView.label}
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultTopBar);