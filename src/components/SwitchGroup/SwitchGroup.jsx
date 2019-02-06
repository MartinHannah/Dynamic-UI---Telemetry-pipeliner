import React from 'react';
import * as shortid from 'shortid';
import { isEmpty } from 'lodash';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import DefaultSwitch from '../DefaultSwitch/DefaultSwitch';

type Props = { 
  label: string,
  data: Array,
 // name: string,
 // onChange: Function
}

class SwitchGroup extends React.Component<Props> {
  constructor(props) { 
    super(props);
    this.state = { 
      options: {}
    }
  }

  

  componentDidMount() { 
    // const { data } = this.props;
    // let filtered = data.map((option) => ({
    //   [option.value]: (option.isChecked !== undefined) ? option.isChecked : false
    // }))
    // .reduce((result, current) =>  { return Object.assign(result, current); }, {});
    // this.setState({options: filtered});
  }

  handleChange = (event) => { 
  //  const { onChange, name } = this.props;
    event.persist();
    this.setState(prevState => ({
      options: { 
        ...prevState.options,
        [event.target.value]: event.target.checked
      }
    }), () => {
     // const { options } = this.state;
    //  onChange(name, val);
    })

  }


  render() {
    const { label, data } = this.props;
    const { options } = this.state; 
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        { 
          !isEmpty(options) ? 
            (
              <FormGroup>
                { data.map((option) => <DefaultSwitch key={shortid.generate()} isChecked={options[option.value]} change={this.handleChange} value={option.value} label={option.name} />)}
              </FormGroup> 
            ) : null
        }
      </FormControl>
    );
  }
}

export default SwitchGroup;