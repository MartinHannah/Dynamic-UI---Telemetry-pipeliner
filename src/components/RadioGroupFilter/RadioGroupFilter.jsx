import * as React from 'react';
import PropTypes from 'prop-types'; 
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RadioGroupFilter = ({value, filter, options, state}) => {
    return (
      <RadioGroup
        value={value}
        onChange={(event) => filter(event, state)}
      >
        { options.map((option) => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.name} /> )}
      </RadioGroup>
    );
}

RadioGroupFilter.propTypes = { 
    value: PropTypes.string.isRequired,
    filter: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    state: PropTypes.string.isRequired
}

export default RadioGroupFilter;

