import * as React from 'react';
import './DefaultSideBar.scss';
import { connect } from 'react-redux';
import classNames from 'classnames';
//Components
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import SidebarItem from '../../components/SidebarItem/SidebarItem';
import * as viewActions from '../../actions/views/actions';

type Props = {
  /** The menu items to load */
  views: Array,
  /** A redux state boolean for opening and closing sidemenu */
  menuOpen: boolean,
  /** The action to open and close menu (shared by topbar and sidebar) */
  toggleMenu: Function, 
  /**  loads a new view into the current state, used by menu items to change the page navigation */
  updateRoute: Function
}
/** The DefaulySideBar is a container component that loads in the menu items for the sidebar menu section of the appliation */
const DefaultSideBar = (props: Props) => { 
  const { views, menuOpen, toggleMenu, updateRoute } = props;
  return (
    <div>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames('drawer-paper', !menuOpen && 'drawer-paper-close'),
        }}
        open={menuOpen}
      >
        <div className='toolbar'>
          <IconButton onClick={() => toggleMenu(!menuOpen)}>
            { !menuOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          {views.map((view) => <SidebarItem key={view.id} path={view.path} name={view.label} icon={view.icon} id={view.id} click={updateRoute} />)}
        </List>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    views: state.viewReducer.views,
    menuOpen: state.viewReducer.menuOpen
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    toggleMenu: (isOpen) => { 
        dispatch(viewActions.toggleMenu(isOpen));
    },
    updateRoute: (id) => { 
        dispatch(viewActions.updateRoute(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSideBar);