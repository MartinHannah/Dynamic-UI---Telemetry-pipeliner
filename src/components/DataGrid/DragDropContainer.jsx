import React, { Component } from 'react';

import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';
import { isColumnsImmutable } from '../../utils/util';

type Props = { 
    children: Node,
    getDragPreviewRow: Function
}

class DraggableContainer extends Component<Props> {

  getRows(rowsCount, rowGetter) {
    const rows = [];
    for (let j = 0; j < rowsCount; j++) {
      rows.push(rowGetter(j));
    }
    return rows;
  }

  renderGrid() {
      const { children } = this.props;
    return React.cloneElement(
      React.Children.only(children), {
        draggableHeaderCell: DraggableHeaderCell
      }
    );
  }

  render() {
    const { getDragPreviewRow } = this.props;
    const grid = this.renderGrid();
    const rowGetter = getDragPreviewRow || grid.props.rowGetter;
    const rowsCount = grid.props.rowsCount;
    const columns = grid.props.columns;
    const rows = this.getRows(rowsCount, rowGetter);
    return (
      <div>
        {grid}
        <RowDragLayer
          rowSelection={grid.props.rowSelection}
          rows={rows}
          columns={isColumnsImmutable(columns) ? columns.toArray() : columns}
        />
      </div>
    );
  }
}

export default DraggableContainer;
