import * as React from 'react';
import './BuildingSummary.scss';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

//import { getEnergyData, getBuilding } from '../../utils/api';
//import { calculateTotal } from '../../utils/util';

type Props = { 

}

class BuildingSummary extends React.Component<Props> { 

    constructor(props){
        super(props);
        console.log(props);
        this.state = { 
            data: 'No Data',
            buildingName: 'No Building',
        }
    }

    componentWillMount = () =>{
        this.getBuildingData();
    }

    getBuildingData = () => { 
       // const { buildingId, dataType } = this.props; 
        // getBuilding(buildingId).then((result) => { 
        //     this.setState({buildingName: result.data.name});
        // });

        // getEnergyData(buildingId).then((result) => { 
        //    const data = calculateTotal(result.data, dataType);
        //    this.setState({ data: data});
        // })
    }

    render() { 
        const { data, buildingName } = this.state;
        console.log(this.props);
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

export default BuildingSummary;