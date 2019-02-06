import * as React from 'react';
import './DefaultTopBar.scss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

type Props = { 
  /** The information about the current page we are on. Should contain info for loading correct widgets etc. */
  currentView: Object, 
  /** redux boolean for opening and closing menu, shared with sidebar component */
  menuOpen: boolean,
}

/** The DefaultTopBar is a container component that loads the relevant information for the top bar section of the application */
const DefaultTopBar = (props: Props) => { 
  const { menuOpen, currentView } = props;
  return (
    <AppBar
      position="fixed"
      classes={{
        root: classNames('app-bar', menuOpen && 'app-bar-shift')}}
    >
      <Toolbar disableGutters={!menuOpen}>
        <Typography 
          variant="title" 
          color="inherit" 
          noWrap
          classes={{
            title: classNames('app-bar-title'),
          }}
        >
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

const mapDispatchToProps = () => {
  return { 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultTopBar);