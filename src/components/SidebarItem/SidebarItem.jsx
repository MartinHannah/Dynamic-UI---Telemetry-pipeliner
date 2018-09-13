import * as React from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'; 
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

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

function SidebarItem({ path, name, icon, classes, click }) {
    return (
      <NavLink to={path} className={classes.link} onClick={() => click(name)}>
        <ListItem button>
          <Icon className={classNames(icon, classes.icon)} />
          <ListItemText primary={name} className={classes.text} />
        </ListItem>
      </NavLink>
    );
}

SidebarItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    classes: PropTypes.shape.isRequired,
    click: PropTypes.func.isRequired
}
export default withStyles(styles)(SidebarItem);