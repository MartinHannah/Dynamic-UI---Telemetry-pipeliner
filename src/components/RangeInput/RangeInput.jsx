import * as React from "react";
import './RangeInput.scss';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';


type Props = { 
    onChange: Function,
    value: number,
    inputProps: Object,
    name: string
}

class RangeInput extends React.Component<Props> { 
  constructor(props) { 
    super(props);
    this.state = { 
      val: (typeof props.value === 'number') ? props.value : props.inputProps.min
    }

    const { val } = this.state;
    if(val !== props.value) props.onChange(val, props.name)
  }

  change = (e, value) => { 
    const { onChange, name } = this.props;
    this.setState({val: value});
    onChange(value, name); 
  }

  render() { 
    const {inputProps} = this.props;
    const { val } = this.state;
    return (
      <div className="slider">
        <Slider 
          classes={{
          }}
          onChange={this.change}
          value={val}
          {...inputProps}
        />
        <Typography 
          variant="body2"
          classes={{
            body2: 'slider-label'
          }}
        >
          {val}
        </Typography>
      </div>
    );
  }

}

export default RangeInput;