import * as React from 'react';
import './SelectFilter.scss';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  value: string,
  filter: Function,
  options: Array,
  state: string
}

const SelectFilter = (props: Props) => { 
  const {value, filter, options, state} = props;
    return (
      <Select
        value={value}
        onChange={(event) => filter(event, state)}
      >
        {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem> )}
      </Select>
    );    
}

export default SelectFilter;