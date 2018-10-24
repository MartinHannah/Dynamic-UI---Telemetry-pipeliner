import * as React from 'react';
import ReactDataGrid from 'react-data-grid';
import './DataGrid.scss';

//This function will retrieve user rows or customer rows from the mock backend api.
import { getChartData } from '../../utils/api';

type Props = { 
  //options contains the widgets configurable options
  // currently a data grid only has a data option to choose which data to retrieve.
  options: Object 
}

const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }, {key: 'name', name: 'Name'}];
const rows = [{ id: 1, title: 'Title 1', name: 'John' },{ id: 2, title: 'Title 2', name: 'Jane' }];

class DataGrid extends React.Component<Props> {
  constructor(props) { 
    super(props);

    //Example of retrieving the data
    getChartData(props.options.data).then((result) => { 
      console.log(result);
    })
  }

  rowGetter = (rowNumber) => {
    return rows[rowNumber];
  }

  render() { 
      return (
        <ReactDataGrid columns={columns} rowGetter={this.rowGetter} rowsCount={rows.length} minHeight={500} minWidth={1200} />
      );
  }
}

export default DataGrid;