import * as React from 'react';
import './SidebarItem.scss';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'; 
import classNames from 'classnames';
//Components
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SidebarItem = ({path, name, icon, click}) => {
    return (
      <NavLink to={path} className='link' onClick={() => click(name)}>
        <ListItem button>
          <Icon className={classNames(icon, 'icon')} />
          <ListItemText primary={name} className='text' />
        </ListItem>
      </NavLink>
    ); 
}

SidebarItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
}

export default SidebarItem;