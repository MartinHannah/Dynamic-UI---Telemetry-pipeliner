import * as React from "react";
import ReactDataGrid from "react-data-grid";

import "./DataGrid.scss";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

//Components
import DefaultModal from "../../components/DefaultModal/DefaultModal";
import IconWithText from "../../components/IconWithText/IconWithText";
import DataGridToolbar from "../../components/DataGridToolbar/DataGridToolbar";
import FormViewer from "../FormViewer/FormViewer";
import DragDropContainer from '../../components/DragDropContainer/DragDropContainer';
//import DraggableDataGridContainer from '../DraggableDataGridContainer/DraggableDataGridContainer';

//This function will retrieve user rows or customer rows from the mock backend api.
import { get } from "../../utils/api";
import { hasValues, isEmptyArray } from '../../utils/util';
import groupRows from '../../utils/RowGrouper';


//const DraggableContainer = Draggable.Container;
//const GroupedColumnsPanel = ToolsPanel.GroupedColumnsPanel;
//const selectors = Data.Selectors;

type Props = {
  /** The data string that the grid uses to retrive data. Current test values: 'customers', 'users' */
  datasource: string,
  columns: Array,
  /** Set true if the rows in the grid are selectable. This will enable to ability to select multiple rows */
  rowsSelectable?: boolean,
  /** Set true if the rows in the grid should be editable. This will allow for a click to open an editing form */
  isEditable?: boolean,
  /** Set true if you want to be able to export the data to a CSV */
  canExport?: boolean,
  /** a valid submission action to take after editing a row on the grid */
  submission?: string,
  /** A selection of components to render if this grid is editable.  */
  formComponents?: Array,
  /** Set true if the columns should be resizeable */
  columnsResizeable?: boolean,
  /** Are you able to sort columns (clicking on the header to sort) */
  columnsSortable?: boolean,
  /** sort by descending instead of ascending */
  columnDescSortFirst?: boolean,
  /** Are we able to search through the columns */
  columnsFilterable?: boolean, 
};

/**
 * Data Grid Widget. Displays table data in accordance with a variety of optional functionality.
 */
class DataGrid extends React.Component<Props> {
  static defaultProps = {
    rowsSelectable: false,
    isEditable: false,
    canExport: true,
    submission: "none",
    formComponents: [],
    columnsResizeable: true,
    columnsSortable: true,
    columnDescSortFirst: false,
    columnsFilterable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndexes: [],
      editing: false,
      columns: [],
      rows: [],
      filters: [],
      groupBy: [],
      groupByChips: [],
      columnVisibilityDialog: false
    };
    //parse datasource 
  // const customerID = 1; 
  //  const regex = /\$id/gi;
   // const data = props.datasource.replace(regex, customerID);
    //Get data
    console.log(props);
    get(props.datasource).then((result) => {
      console.log(result.data);
      const columns = props.columns.map(col => {
        return {
          key: col,
          name: col
        }
      });
      // const cols = Object.keys(result.data[0]).map((key) =>  {
      //   console.log(key);
      //   return { 
      //     key: key,
      //     name: key
      //   }
      // });
      // console.log(cols);

      this.setState({ rows: result.data, columns: columns}, () => { 
        this.initialiseColumns();
      })
    });
  }

  initialiseColumns = () => {
    const {
      columnsResizeable,
      columnsSortable,
      columnDescSortFirst,
      columnsFilterable
    } = this.props;
    const { columns } = this.state;
    console.log(columns);
    const defaultColumnProps = {
      resizable: columnsResizeable,
      sortable: columnsSortable,
      sortDescendingFirst: columnDescSortFirst,
      filterable: columnsFilterable,
      draggable: true, visibility: true
    };
    const cols = columns.map(c => ({ ...c, ...defaultColumnProps }));
    this.setState({ columns: cols });
  };

  handleFilterChange = filter => {
    const { filters } = this.state;
    let newFilters = filters;
    newFilters.push(filter);
    this.setState({ filters: newFilters });
  };

  removeFilter = (filter) => {
    const { filters } = this.state;
    let newFilters = filters; 
    const index = newFilters.indexOf(filter);
    if(index !== -1) {
      newFilters.splice(index, 1);
    }
    this.setState({ filters: newFilters})
  }

  getValidFilterValues = (rows, columnId) => {
    return rows
      .map(r => r[columnId])
      .filter((item, i, a) => {
        return i === a.indexOf(item);
      });
  };

  onHeaderDrop = (source, target) => {
    const { columns } = this.state;
    const stateCopy = Object.assign({}, this.state);
    const columnSourceIndex = columns.findIndex(i => i.key === source);
    const columnTargetIndex = columns.findIndex(i => i.key === target);

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0]
    );

    const emptyColumns = Object.assign({}, this.state, { columns: [] });
    this.setState(emptyColumns);

    const reorderedColumns = Object.assign({}, this.state, {
      columns: stateCopy.columns
    });
    this.setState({ columns: reorderedColumns });
  };

  rowGetter = index => {
    const { rows } = this.state;
    return rows[index];
  };

  columnGetter = () => { 
    const { columns } = this.state;
    return columns.filter(col => col.visibility === true);
  }

  getRows = (rows, filters) => {
    const { groupBy } = this.state;
    const filteredRows = this.filterRows(rows);
    const groupedRows = this.getFlattenedGroupedRows(filteredRows, groupBy);
    return (filters.length > 0) ? groupedRows : this.getFlattenedGroupedRows(rows, groupBy); 
  };

  filterRows = (rows) => {
    const { filters } = this.state;
    let exportable = this.exportableRows(rows);
    const newRows = exportable.filter(r => {
      return hasValues(r, filters);
    });
    return newRows;
  };

  getFlattenedGroupedRows = (rows, groupedColumns, expandedRows = []) => {
    if (!groupedColumns || isEmptyArray(groupedColumns)) {
      return rows;
    }
    return groupRows(rows, groupedColumns, expandedRows);
  };

  filterColumns = (column, index) => { 
    const { columns } = this.state;
    let cols = columns;
    if (columns[index].key === column.key) {
      cols[index].visibility = !columns[index].visibility
      this.setState({ columns: cols});
    }
  }

  onRowsSelected = rows => {
    const { selectedIndexes } = this.state;
    this.setState({
      selectedIndexes: selectedIndexes.concat(rows.map(r => r.rowIdx))
    });
  };

  onRowsDeselected = rows => {
    const { selectedIndexes } = this.state;
    const rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1)
    });
  };

  returnSelectable = () => {
    const { rowsSelectable } = this.props;
    const { selectedIndexes } = this.state;
    return rowsSelectable
      ? {
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: this.onRowsSelected,
          onRowsDeselected: this.onRowsDeselected,
          selectBy: {
            indexes: selectedIndexes
          }
        }
      : null;
  };

  rowClickable = row => {
    const { isEditable } = this.props;
    if (isEditable) {
      this.setState({ editing: true });
      this.displaySelectedRow(row);
    }
  };

  displaySelectedRow = row => {
    const { rows } = this.state;
    const { formComponents } = this.props;
    let data = rows[row];
    let fields = formComponents.map(field => {
      field.options.value = data[field.options.name];
      return field;
    });
    return fields;
  };

  closeRow = () => {
    this.setState({ editing: false });
  };

  groupColumn = columnKey => {
    const { groupBy, columns, groupByChips } = this.state;
    let chips = groupByChips;
    const columnGroups = groupBy.slice(0);
    const activeColumn = columns.find(c => c.key === columnKey);
    const isNotInGroups =
      columnGroups.find(c => activeColumn.key === c.key) == null;
    if (isNotInGroups) {
      columnGroups.push({ key: activeColumn.key, name: activeColumn.name });
      chips.push(activeColumn.name);
    }
    this.setState({ groupBy: columnGroups, groupByChips: chips });
  };

  ungroupColumn = (columnKey) => {
    const { groupBy } = this.state;
    let ungroup = groupBy.filter(g => {
      return typeof g === "string" ? g !== columnKey : g.name !== columnKey
    });

    let chips = ungroup.flatMap((col) => {

      return col.name;
    }); 

    this.setState({ groupBy: ungroup, groupByChips: chips });
  };

  handleGridSort = (sortColumn, sortDirection) => {
    let { rows } = this.state;
    const comparer = (a, b) => {
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    rows = sortDirection === "NONE" ? rows.slice() : rows.sort(comparer);

    this.setState({ rows });
  };

  exportableRows = (filteredRows) => {
    const visibleCols = this.columnGetter().map((col) => { return col.key});
    return filteredRows.map((row) => {
      let visible = {};
      visibleCols.forEach((col) => {
        visible[col] = row[col];
      })
      return visible;
    })
  };


  render() {
    const { editing, columns, rows, filters, groupBy, columnVisibilityDialog, groupByChips } = this.state;
    const {
      submission,
      formComponents,
      canExport,
      columnsFilterable
    } = this.props;

    const filteredRows = this.getRows(rows, filters, groupBy);
    return (
      <div className="data-grid">
        <DragDropContainer onHeaderDrop={this.onHeaderDrop}>
          <ReactDataGrid
            toolbar={(
              <DataGridToolbar 
                toggleVisibility={() => this.setState({columnVisibilityDialog: !columnVisibilityDialog})}
                allowFilter={columnsFilterable}
                filters={filters}
                addFilter={(filter) => this.handleFilterChange(filter)}
                removeFilter={(filter) => this.removeFilter(filter)}
                exportable={canExport} 
                groupBy={groupByChips} 
                groupAdded={columnKey =>
                      this.groupColumn(columnKey)} 
                groupDeleted={(columnKey, columnName) =>
                      this.ungroupColumn(columnKey, columnName)}
                currentData={this.exportableRows(filteredRows)}
              />
            )}
            rowKey="id"
            columns={this.columnGetter()}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            minHeight={500}
            minWidth={1200}
            rowSelection={this.returnSelectable()}
            onGridSort={this.handleGridSort}
            onFilter={() => {
              console.log("filter!");
            }}
            onAddFilter={filter => this.handleFilterChange(filter)}
            onClearFilters={() => this.setState({ filters: {} })}
            getValidFilterValues={columnKey =>
              this.getValidFilterValues(rows, columnKey)
            }
            emptyRowsView={IconWithText}
            enableDragAndDrop
          />
        </DragDropContainer>
        <DefaultModal open={columnVisibilityDialog} close={() => {this.setState({columnVisibilityDialog: false})}}>
          <div>
            <List>
              {columns.map((column, index) => (
                <ListItem button onClick={() => this.filterColumns(column, index)} key={column.key}>
                  <Switch checked={column.visibility} />
                  <ListItemText primary={column.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </DefaultModal>
        <DefaultModal open={editing} close={this.closeRow}>
          <div>
            Edit
            <FormViewer
              submission={submission}
              formComponents={formComponents}
            />
          </div>
        </DefaultModal>
      </div>
    );
  }
}

export default DataGrid;
