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
    color: 'rgb(243, 108, 3, 0.8 )'
  },
  link: {
    textDecoration: 'none'
  },
  text: { 
    paddingLeft: '25px'
  }
});

//()
class SidebarItem extends React.Component {
  getContainer(name, containers){
    return containers.find((container) => {
      return container.id == name;
    })
  }

  render() { 
    const { path, name, icon, classes, click, containers } = this.props;
    return (
      <NavLink to={path} className={classes.link} onClick={() => click(name, containers, this.getContainer)}>
        <ListItem button>
          <Icon className={classNames(icon, classes.icon)} />
          <ListItemText primary={name} className={classes.text} />
        </ListItem>
      </NavLink>
    );
  }
    
}

SidebarItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    classes: PropTypes.shape.isRequired,
    click: PropTypes.func.isRequired,
    containers: PropTypes.isRequired
}
export default withStyles(styles)(SidebarItem);