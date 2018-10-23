import * as React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = { 
  value: string,
  filter: Function,
  options: Array,
  state: string
}

const RadioGroupFilter = (props: Props) => {
  const {value, filter, options, state} = props;
    return (
      <RadioGroup
        value={value}
        onChange={(event) => filter(event, state)}
      >
        { options.map((option) => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.name} /> )}
      </RadioGroup>
    );
}

export default RadioGroupFilter;

