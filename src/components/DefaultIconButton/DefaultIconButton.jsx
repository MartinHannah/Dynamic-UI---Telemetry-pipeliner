import * as React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
//import * as submissions from '../../utils/formSubmission';


type Props = {
 children: Node;
 click: Function
}

const DefaultIconButton =(props:Props) => { 
  const { children, click } = props;
    return(
      <IconButton
        onClick={() => click()}
        classes={{
          root: classNames('default-icon-button'),
          label: classNames('default-icon-button-text')
        }}
      >
        {children}
      </IconButton>
    );
}

export default DefaultIconButton;
