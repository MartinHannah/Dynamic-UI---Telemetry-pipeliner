import * as React from 'react';
import './BuildingSummary.scss';
import PropTypes from 'prop-types'; 

//Components
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import { getEnergyData, getBuilding } from '../../utils/api';
import { calculateTotal } from '../../utils/util';




class BuildingSummary extends React.Component { 

    constructor(props){
        super(props);
        this.state = { 
            data: 'No Data',
            buildingName: 'No Building',
        }
    }

    componentWillMount = () =>{
        this.getBuildingData();
    }

    getBuildingData = () => { 
        const { options } = this.props; 
        getBuilding(options.buildingId).then((result) => { 
            this.setState({buildingName: result.data.name});
        });

        getEnergyData(options.buildingId).then((result) => { 
           const data = calculateTotal(result.data, options.dataType);
           this.setState({ data: data});
        })
    }

    render() { 
        const { data, buildingName } = this.state;
        return(
          <Grid item className='building-summary'>
            <Typography variant='subheading'>{buildingName}</Typography>
            <Typography variant="headline" className="data-value">
              {data}
            </Typography>
            <Grid 
              container
              justify="center"
              alignItems="center"
            >
              <ArrowUpward />
              <Typography className="performance" variant="subheading">15%</Typography>
            </Grid>
          </Grid>
        );
    }
}

BuildingSummary.propTypes = { 
    options: PropTypes.shape({
        buildingId: PropTypes.number.isRequired,
        dataType: PropTypes.string.isRequired
    }).isRequired
}

export default BuildingSummary;