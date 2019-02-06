import * as React from 'react';
import './DefaultSwitch.scss';
import Switch from '@material-ui/core/Switch';

type Props = { 
  onChange: Function, 
  name: string,
  value: boolean, 
  required: boolean,
  inputProps: Object
}

class DefaultSwitch extends React.Component<Props> { 
  constructor(props){ 
    super(props);
    this.state = { 
      val: (props.value !== undefined) ? props.value : false
    }

    const { val } = this.state;
    if(val !== props.value) props.onChange(val, props.name);
  }



  change = () => { 
    const { onChange, name } = this.props;
    const { val } = this.state;
    this.setState({val: !val});
    onChange(!val, name);
  }

  render() { 
    const { value, required, inputProps } = this.props;
    return(
      <Switch
        checked={value}
        onChange={this.change}
        value={value}
        inputProps={{
          required: required,
          ...inputProps
        }}
      />
    );
  }

}

export default DefaultSwitch;
