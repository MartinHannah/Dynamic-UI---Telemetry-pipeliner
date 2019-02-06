import * as React from 'react';
import './SidebarItem.scss';
import { NavLink } from 'react-router-dom'
import classNames from 'classnames';
//Components
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

type Props = { 
 path: string,
 name: string,
 icon: string,
 id: number,
 click: Function
}

const SidebarItem = (props: Props) => {
  const {path, name, icon, click, id} = props;
    return (
      <NavLink to={path} className='link' onClick={() => click(id)}>
        <ListItem 
          button
          classes={{
            root: classNames('menu-item')
          }}
        >
          <Icon className={classNames(icon, 'icon')} />
          <ListItemText primary={name} classes={{ primary: 'text'}} />
        </ListItem>
      </NavLink>
    ); 
}

export default SidebarItem;