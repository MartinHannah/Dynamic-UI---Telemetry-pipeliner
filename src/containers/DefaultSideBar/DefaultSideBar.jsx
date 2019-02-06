import * as React from "react";
import "./DefaultSideBar.scss";
import { connect } from "react-redux";
import classNames from "classnames";
//Components
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import SidebarItem from "../../components/SidebarItem/SidebarItem";
import * as viewActions from "../../actions/views/actions";

type Props = {
  /** The menu items to load */
  views: Array,
  /** A redux state boolean for opening and closing sidemenu */
  menuOpen: boolean,
  /** The action to open and close menu (shared by topbar and sidebar) */
  toggleMenu: Function,
  /**  loads a new view into the current state, used by menu items to change the page navigation */
  updateRoute: Function
};
/** The DefaulySideBar is a container component that loads in the menu items for the sidebar menu section of the appliation */
class DefaultSideBar extends React.Component<Props> {
  constructor(props){ 
    super(props);
    this.state = { 
      open: false
    }
  }
  render() {
    const { views, menuOpen, toggleMenu, updateRoute } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames("drawer-paper", !menuOpen && "drawer-paper-close")
          }}
          open={menuOpen}
        >
          <div className="toolbar">
            <IconButton
              color="inherit"
              onClick={() => toggleMenu(!menuOpen)}
              classes={{
                colorInherit: classNames("menu-toggle")
              }}
            >
              {!menuOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <List>
            {views.map(view => (
              <SidebarItem
                key={view.id}
                path={view.path}
                name={view.label}
                icon={view.icon}
                id={view.id}
                click={updateRoute}
              />
            ))}
          </List>
          <List>
            <ListItem button onClick={() => { this.setState({open: !open})}}>
              <ListItemIcon>
                <Icon className="fas fa-toolbox" />
              </ListItemIcon>
              <ListItemText inset primary="Manage" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <SidebarItem path='/manage/pages' name='Pages' icon='fas fa-columns' click={() => updateRoute('pages')} />
                <SidebarItem path='/manage/widgets' name='Widgets' icon='fas fa-palette' click={() => updateRoute('widgets')} />
              </List>
            </Collapse>
          </List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    views: state.viewReducer.views,
    menuOpen: state.viewReducer.menuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: isOpen => {
      dispatch(viewActions.toggleMenu(isOpen));
    },
    updateRoute: id => {
      dispatch(viewActions.updateRoute(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultSideBar);
