import * as React from 'react';
import './InputField.scss';

//Components
import TextField from '@material-ui/core/TextField';

type Props = { 
  change: Function,
  readOnly?: boolean,
  placeholder?: string,
  helperText?: string,
  isMultiline?: boolean,
  inputType: string,
  isRequired?: boolean,
  rowsMax?: number,
  label: string,
  inputComponent: Function,
  name: string,
  value: any
}

class InputField extends React.Component<Props> { 
  static defaultProps = { 
    readOnly: false,
    placeholder: '',
    helperText: '',
    isRequired: false,
    rowsMax: 1, 
    isMultiline: false,
  }

    constructor(props) { 
        super(props);
    }

    componentDidMount = () =>  {

    }

    handleChange = (event) => { 
      const { change } = this.props; 
      if(change === undefined) return;
      change(event);
    }

    generateInputProps = () => {
      let inputProps = {}
      const { readOnly, inputComponent } = this.props;
      if(readOnly !== undefined) inputProps.readOnly = readOnly;
      if(inputComponent !== undefined) inputProps.inputComponent = inputComponent;
      return inputProps;
    }


    render() { 
      const { change, placeholder, helperText, isMultiline, inputType, isRequired,
      rowsMax, label, name, value} = this.props;
      console.log(name, value);
        return(
          <TextField 
            label={label}
            name={name}
            className='input-field'
            onChange={change}
            margin="normal"
            multiline={isMultiline}
            rowsMax={rowsMax}
            placeholder={placeholder}
            helperText={helperText}
            type={inputType}
            required={isRequired}
            InputProps={this.generateInputProps}
            value={value}
          />
      );
    }   
}

export default InputField;