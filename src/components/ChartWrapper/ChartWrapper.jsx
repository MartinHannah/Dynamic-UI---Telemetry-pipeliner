import * as React from 'react';
import './ChartWrapper.scss';

//Components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import SelectFilter from '../SelectFilter/SelectFilter';
import * as components from '../../utils/views';
// import { getBuildings, getEnergyData  } from '../../utils/api';

type Props = { 
    widget: Object,
    options: Object
}

class ChartWrapper extends React.Component<Props> { 

    state = {
        data: [],
        building: 'all',
        buildingData: [],
        chartType: 'AreaBarChart',
    }
    
    componentWillMount(){
        //const { building } = this.state;
        const { options } = this.props;
        this.setState({ chartType: options.chartType });
        // getBuildings().then((result) => { 
        //     let buildings = result.data;
        //     buildings = buildings.map((building) => ({ 
        //            value: building.id,
        //            name: building.name
               
        //     }));
        //     buildings.push({name: 'All Buildings', value: 'all'});
        //     this.setState({buildingData: buildings});
        //     this.filterData(building);
        // })
        
    }

    filter = (event, state) => { 
        this.setState({[state] : event.target.value });
        this.filterData(event.target.value);
    }

    //Currently only filtering by building as we only have dummy month data.
    filterData = () => { 
        // getEnergyData(building).then((result) => { 
        //     let data = result.data;
        //     this.setState({data});
        // })
    }

    render() { 
        const { widget } = this.props;
        const { data, building, buildingData, chartType } = this.state;
        const Chart = components[chartType];
        return (
          <Grid container>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel>Select Building</InputLabel>
                <SelectFilter value={building} filter={this.filter} options={buildingData} state='building' />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="chart-wrapper">
              <Chart data={data} options={widget.options} />
            </Grid>
          </Grid>
        );
    }
}

export default ChartWrapper;