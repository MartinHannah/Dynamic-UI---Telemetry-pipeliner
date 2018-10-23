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
  views: Array,
  menuOpen: boolean,
  toggleMenu: Function, 
  loadNewView: Function
}

const DefaultSideBar = (props: Props) => { 
  const { views, menuOpen, toggleMenu, loadNewView } = props;
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
          {views.map((view) => <SidebarItem key={view.id} path={view.path} name={view.id} icon={view.icon} click={loadNewView} />)}
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
    loadNewView: (name) => { 
        dispatch(viewActions.loadNewView(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSideBar);