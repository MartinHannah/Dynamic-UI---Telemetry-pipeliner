import React from "react";
import classNames from 'classnames';
import * as moment from 'moment';
import './DataGridToolbar.scss';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input';
import EditIcon from '@material-ui/icons/Edit';

//Components
import DefaultButton from '../DefaultButton/DefaultButton';
import DefaultIconButton from '../IconButton/IconButton';
import GroupColumnPanel from './GroupColumnPanel';
import { downloadCSV } from '../../utils/util';


type Props = {
  /** this determines whether the export button will appear in the toolbar */
  exportable: boolean,
  groupBy: Array,
  /** action to add a group to the list */
  groupAdded: Function, 
  /** action to delete a group from the list */
  groupDeleted: Function,
  /** the list of current filters in the search bar */
  filters: Object,
  /** add a filter to the list */
  addFilter: Function, 
  /** remove a filter from the list */
  removeFilter: Function,
  /** if filtering is allowed, searchbar will not appear if false */
  allowFilter: boolean,
  /** the current data on the grid for exporting.  */
  currentData: Array,
  /** opens the modal for turning columns on and off */
  toggleVisibility: Function,

};

class DataGridToolbar extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      enableGrouping: false
    }
  }

  exportData = () => {
    const { currentData } = this.props;
    const filename = `Export_${moment().format()}.csv`
    downloadCSV(currentData, filename);
  };

  render() {
    const { allowFilter, exportable, groupBy, groupAdded, groupDeleted, filters, addFilter, removeFilter, toggleVisibility } = this.props;
    const { enableGrouping } = this.state;
    return (
      <Grid
        container
        justify='flex-end'
        classes={{
          container: classNames('data-grid-toolbar'),
        }}
      >
        <Grid
          item
          classes={{
            item: classNames('toolbar-item'),
          }}
        >
          { allowFilter ? (
            <ChipInput
              value={filters}
              onAdd={(filter) => addFilter(filter)}
              onDelete={(filter) => removeFilter(filter)}
              placeholder='Search...'
              classes={{
                chip: classNames('toolbar-chip')
              }}
            />) : null }
        </Grid>
        <Grid
          item
          classes={{
            item: classNames('toolbar-item'),
          }}
        >
          { exportable ? <DefaultButton label='Export' click={() => this.exportData()} /> : null }
        </Grid>
        <Grid
          item
          classes={{
            item: classNames('toolbar-item'),
          }}
        >
          <DefaultIconButton click={() => toggleVisibility()}><EditIcon /></DefaultIconButton>
        </Grid>
        <Grid
          item
          classes={{
            item: classNames('toolbar-item'),
          }}
        >
          <DefaultButton label='Group By Column' click={() => this.setState({enableGrouping: !enableGrouping})} />
          { enableGrouping ? (
            <GroupColumnPanel
              groupBy={groupBy}
              onColumnGroupAdded={groupAdded}
              onColumnGroupDeleted={groupDeleted}
              className='toolbar-group-panel'
            />) : null } 
        </Grid>
      </Grid>

    );
  }
}

export default DataGridToolbar;
