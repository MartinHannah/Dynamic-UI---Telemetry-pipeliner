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
    this.state = { 
      selectedIndexes: []
    }

    //Example of retrieving the data
    getChartData(props.options.data).then((result) => { 
      console.log(result.data);
    })
  }

  rowGetter = (index) => {
    return rows[index];
  }

  onRowsSelected = (rowsS) => { 
    console.log('select');
    const { selectedIndexes } = this.state;
    this.setState({ selectedIndexes: selectedIndexes.concat(rowsS.map(r => r.rowIdx))});
  }

  onRowsDeselected = (rowsS) => {
    const { selectedIndexes } = this.state;
    const rowIndexes = rowsS.map(r => r.rowIdx);
    this.setState({selectedIndexes: selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1)});
  }

  returnSelectable = () => { 
    const { options } = this.props; 
    const { selectedIndexes } = this.state;
    console.log(options.rowsSelectable);
    return options.rowsSelectable ? {
      showCheckbox: true,
      enableShiftSelect: true, 
      onRowsSelected: this.onRowsSelected,
      onRowsDeselected: this.onRowsDeselected,
      selectBy: { 
        indexes: selectedIndexes
      }
    } : null;
  }

  render() { 
      return (
        <div>
          <ReactDataGrid
            rowKey="id"
            className="data-grid"
            columns={columns} 
            rowGetter={this.rowGetter} 
            rowsCount={rows.length} 
            minHeight={500} 
            minWidth={1200}
            rowSelection={this.returnSelectable()}
          />
        </div>
      );
  }
}

export default DataGrid;