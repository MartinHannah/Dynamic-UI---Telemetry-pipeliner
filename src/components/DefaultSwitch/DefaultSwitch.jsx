import * as React from 'react';
import './DefaultSwitch.scss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

type Props = { 
  isChecked: boolean, 
  change: Function, 
  value: any, 
  label: string
}

const DefaultSwitch = (props: Props) => { 
      const { isChecked, change, value, label } = props;
      return(
        <FormControlLabel
          control={
            (
              <Switch
                checked={isChecked}
                onChange={(event) => change(event)}
                value={value}
              />
            )
          }
          label={label}
        /> 
      );
}

export default DefaultSwitch;
