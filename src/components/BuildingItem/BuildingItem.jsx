import * as React from 'react';
import PropTypes from 'prop-types';
import './BuildingItem.scss';
import * as shortid from 'shortid';

//Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Business from '@material-ui/icons/Business';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';
import { getEnergyData } from '../../utils/api';
import { calculateAverage } from '../../utils/util';

//These values need to move to being configurable. 
const types = [
  { name: "Average Monthly Cost", value: "cost"}, 
  { name: "Average Monthly Usage", value: "energy"}
]
class BuildingItem extends React.Component {

  constructor(props) { 
    super(props);
    this.state = { 
      buildingInfo: []
    }
  }

  componentWillMount = () => {
    const {id} = this.props;
    getEnergyData(id).then((result) => { 
      const buildingInfo = this.returnAverageDataTypes(result.data);
      this.setState({buildingInfo});
    })
  }

  returnAverageDataTypes = (data) => { 
    let total = types.map((type) => ({ 
        'name': type.name,
        'value': calculateAverage(data, type.value)
    }))
    return total;
  }

  render() {
    const {name, type} = this.props;
    const { buildingInfo } = this.state; 
    return (
      <Grid item xs={4}>
        <Paper className="building-item">
          <Grid 
            container
            justify='space-between'
          >
            <Typography variant="title">{name}</Typography>
            <IconButton
              className='icon-button'
            >
              <Edit />
            </IconButton>
          </Grid>
          <Grid 
            container
            justify='center'
            className='overview'
            alignItems='center'
            alignContent='center'
          >
            <Grid item xs={12}>
              { type ? <Business className='building-type-icon' /> : <Home className='building-type-icon' />}
            </Grid>
            { buildingInfo.map((info) => 
              (
                <Grid xs={6} item key={shortid.generate()}>
                  <Typography align='center' variant='subheading'>{info.name}</Typography>
                  <Typography align='center' variant='headline'>{info.value}</Typography>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Grid>
    );
  }
    
}

BuildingItem.propTypes = { 
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default BuildingItem;