import * as React from 'react';
//import PropTypes from 'prop-types';
//Components
import Grid from '@material-ui/core/Grid';
import { getBuildings } from '../../utils/api';
import BuildingItem from '../BuildingItem/BuildingItem';

class Building extends React.Component {

  constructor(props) { 
    super(props);
    this.state = { 
      buildings: []
    }
  }

  componentWillMount(){
    let buildings; 
    getBuildings().then((result) => {
      buildings = result.data;
      this.setState({ buildings });
    })
    
  }

  render() { 
    const { buildings } = this.state;
    return (
      <Grid 
        container
        direction='row'
      >
        {buildings.map((building) => <BuildingItem key={building.name} name={building.name} isCommercial={building.isCommercial} />)}
        
      </Grid>
    );
  }

}

Building.propTypes = { 
}

export default Building;