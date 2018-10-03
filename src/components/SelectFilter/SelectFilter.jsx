import * as React from 'react';
import './SelectFilter.scss';
import PropTypes from 'prop-types'; 
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectFilter = ({value, filter, options, state}) => { 
    return (
      <Select
        value={value}
        onChange={(event) => filter(event, state)}
      >
        {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem> )}
      </Select>
    );    
}

SelectFilter.propTypes = { 
    value: PropTypes.string.isRequired,
    filter: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    state: PropTypes.string.isRequired
}

export default SelectFilter;