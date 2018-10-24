import * as React from 'react';
import './WidgetInfoItem.scss';
//Components
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import SelectFilter from '../SelectFilter/SelectFilter';

type Props = {
  widget: Object,
  add: Function
}

class WidgetInfoItem extends React.Component<Props> {

  constructor(props) { 
    super(props);

    this.state = { 
      options: {
      }
    }
  }

  componentDidMount = () => { 
    const { widget } = this.props;
    if(widget.userOptions !== undefined) { 
      const options = widget.userOptions.reduce((obj, item) => {
        obj[item.name] = item.values[0].value
        return obj
      }, {});
      this.setState({options});
    }

  }

  setOptions = (event, name) => {
   this.setState(prevState => ({
      options: {
        ...prevState.options,
        [name]: event.target.value
      }
    }));
  }

  render() { 
    const { widget, add } = this.props;
    const { options } = this.state;
    console.log(options);
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subheading">{widget.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1">{widget.info}</Typography>
            { widget.userOptions !== undefined ? 
            (
              <FormControl>
                { widget.userOptions.map((option) => (
                  <SelectFilter key={option.name} value={options[option.name]} filter={this.setOptions} state={option.name} options={option.values} />
                ))}
                <Button onClick={() => add(widget.id, options)}>Add</Button>
              </FormControl>
            )
            : null}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div> 
    );  
  }
  
}

export default WidgetInfoItem;