import * as React from 'react';
import './WidgetInfoItem.scss';
import PropTypes from 'prop-types'; 
//Components
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'
//import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
//import MenuItem from '@material-ui/core/MenuItem';
import SelectFilter from '../SelectFilter/SelectFilter';

import { arrayToObject } from '../../utils/util';

class  WidgetInfoItem extends React.Component {

  constructor(props) { 
    super(props);

    this.state = { 
      options: {}
    }
  }


  componentDidMount = () => { 
    const { widget } = this.props;
    if(widget.userOptions !== undefined) { 
      const options = arrayToObject(widget.userOptions);
      this.setState({ options });
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

WidgetInfoItem.propTypes = {
  widget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    userOptions: PropTypes.shape.isRequired
  }).isRequired,
  add: PropTypes.func.isRequired,
}
export default WidgetInfoItem;


/* <Button className="available-widget" onClick={() => this.setOptions(id, add, userOptions)}>
<Grid 
  container
  justify="space-between"
>
  <Grid item xs={12}><Typography variant="subheading">{name}</Typography></Grid>
  <Grid item xs={12}><Typography variant="body1">{info}</Typography></Grid>
</Grid>
</Button>
<Select key={option.name} value={options[option.name]} onChange={(event) => this.setOptions(event, option.name)}>
                    {option.values.map((value) => <MenuItem key={value} value={value}>{value}</MenuItem> )} 
                  </Select> 
*/