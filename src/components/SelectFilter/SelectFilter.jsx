import * as React from 'react';
import './SelectFilter.scss';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  value: string,
  name: string,
  onChange: Function,
  options: Array,
  required: boolean,
  inputProps: Object
}

class  SelectFilter extends React.Component<Props> { 
  constructor(props) { 
    super(props);
    this.state = { 
      val: props.value
    }
  }

  change = (event) => { 
    const { onChange, name } = this.props;
    this.setState({val: event.target.value});
    console.log(event.target.value);
    onChange(event.target.value, name);
  }

  render() { 
    const {required, options, inputProps} = this.props;
    const { val } = this.state;
      return (
        <Select
          value={val}
          onChange={(event) => this.change(event)}
          inputProps={{
            required: required,
            ...inputProps
          }}
        >
          {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem> )}
        </Select>
      );    
  }

}

export default SelectFilter;