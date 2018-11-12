/* eslint react/destructuring-assignment: 0 */
import * as React from 'react';
import './FormViewer.scss';
import * as shortid from 'shortid';

//Components
//import * as submissions from '../../utils/formSubmission';
import * as components from '../../utils/views';
import DefaultButton from '../DefaultButton/DefaultButton';
//import SwitchGroup from '../SwitchGroup/SwitchGroup';

const definition = [
  { 
    component: "InputField", 
    options: {
      name: 'firstName',
      inputType: 'text',
      readOnly: false, 
      placeholder: 'placeholder',
      helperText: 'helping out',
      isMultiline: false,
      isRequired: false, 
      label: 'Testing input text'
    }
  },
  { 
    component: "InputField", 
    options: {
      name: 'age',
      inputType: 'number',
      readOnly: false, 
      placeholder: 'placeholder number',
      helperText: 'this is a number',
      isMultiline: false,
      isRequired: false, 
      label: 'Testing input number'
    } 
  },
  {
    component: "SwitchGroup",
    options: { 
      name: 'switchgroup',
      label: 'switches',
      helperText: 'Helping out',
      data: [
        {name: 'Gilad Gray 1', value: 'gilad', isChecked: true},
        {name: 'Jason Killian 1', value: 'jason', isChecked: false},
        {name: 'Antoine Llorca 1', value: 'antoine'}
    ], 
    }
  },
  { 
    component: "DefaultButton", 
    options: {
      fullWidth: false,
      variant: 'text',
      label: 'Testing input number',
      type: 'submit'
    } 
  }
]

type Props =  {
}

class FormViewer extends React.Component<Props> { 
    constructor(props) { 
        super(props);
        this.state = { 
          formDef: '',
        }
    }

    componentDidMount = () => { 
      this.renderDefinition();
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    renderDefinition = () => { 
      const form = definition.map((element) => {
        const Component = components[element.component];
        return <Component key={shortid.generate()} {...element.options} value={this.state[element.options.name]} change={this.handleChange} />
      });
      this.setState({formDef: form});
    }

    submit = (event) => {
      console.log(this.state);
      event.preventDefault();
    }
    
    render() { 
      const { formDef } = this.state; 
        return (
          <form onSubmit={this.submit}>
            {formDef}
            <DefaultButton 
              fullWidth={false} 
              click={this.buttonTest}
              variant='outline'
              label='Button Test'
            />
          </form>
        );
    }
}

export default FormViewer;