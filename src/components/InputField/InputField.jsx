import * as React from 'react';
import './InputField.scss';

//Components
import TextField from '@material-ui/core/TextField';

type Props = { 
  onChange: Function,
  placeholder?: string,
  description?: string,
  required?: boolean,
  name: string,
  value: any, 
  inputProps: Object
}

class InputField extends React.Component<Props> { 
  static defaultProps = { 
    placeholder: '',
    description: '',
    required: false,
  }

    constructor(props) { 
        super(props);
        this.state = { 
          val: (props.value !== undefined) ? props.value : ''
        }

        const { val } = this.state;
        if(val !== props.value) props.onChange(val, props.name);
    }

    change(e) {
      const { onChange, name } = this.props;
      onChange(e.target.value, name);
      this.setState({val: e.target.value});
    }


    render() { 
      const { inputProps, placeholder, description, required, name } = this.props;
      const { val } = this.state;  
        return(
          <TextField 
            name={name}
            className='input-field'
            onChange={(event) => this.change(event)}
            margin="normal"
            placeholder={placeholder}
            helperText={description}
            variant="outlined"
            inputProps={{
              required: required,
              ...inputProps
            }}
            value={val}
            classes={{
              root: 'input-base'
            }}
          />
      );
    }   
}

export default InputField;