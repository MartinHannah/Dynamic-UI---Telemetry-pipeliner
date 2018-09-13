import * as React from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'; 
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { updateCurrentView } from '../../actions/views/actions';

const styles = ({
  icon: {
    color: '#ccc'
  },
  link: {
    textDecoration: 'none'
  },
  text: { 
    paddingLeft: '25px'
  }
});

function SidebarItem({ path, name, icon, classes }) {
    return (
      <NavLink to={path} className={classes.link} onClick={() => updateCurrentView(name)}>
        <ListItem button>
          <Icon className={classNames(icon, classes.icon)} />
          <ListItemText primary={name} className={classes.text} />
        </ListItem>
      </NavLink>
    );
}

SidebarItem.propTypes = {
    path: PropTypes.isRequired,
    name: PropTypes.isRequired,
    icon: PropTypes.isRequired,
    classes: PropTypes.isRequired
}
export default withStyles(styles)(SidebarItem);