import * as React from "react";
import './DrawerWrapper.scss';

import Drawer from '@material-ui/core/Drawer';

type Props = { 
  children: Node,
  anchor: string,
  isOpen: boolean,
  onClose: Function,
  overrides: Object
}

const DrawerWrapper = (props: Props) => { 
    const { overrides, children, anchor, isOpen, onClose } = props;
    return (
      <Drawer 
        anchor={anchor} 
        open={isOpen} 
        onClose={onClose}
        disablePortal
        classes={overrides}
      >
        {children}
      </Drawer>
    );
}

export default DrawerWrapper;