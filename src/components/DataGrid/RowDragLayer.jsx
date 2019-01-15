import React, { Component } from "react";
import * as shortid from 'shortid';
import { DragLayer } from "react-dnd";
import { Data } from "react-data-grid-addons";

const Selectors = Data.Selectors;

type Props = {
  item: Object,
  //itemType: string,
  currentOffset: Object,
  isDragging: boolean,
  rowSelection: Object,
  rows: Array,
  columns: Array
};

const layerStyles = {
  cursor: "-webkit-grabbing",
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: "none"
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer extends Component<Props> {
  getDraggedRows() {
    let draggedRows;
    let { rowSelection, rows, item } = this.props;
    if (rowSelection && rowSelection.selectBy.keys) {
      let rows = rows;
      let { rowKey, values } = rowSelection.selectBy.keys;
      let selectedRows = Selectors.getSelectedRowsByKey({
        rowKey: rowKey,
        selectedKeys: values,
        rows: rows
      });
      draggedRows = this.isDraggedRowSelected(selectedRows)
        ? selectedRows
        : [rows[item.idx]];
    } else {
      draggedRows = [rows[item.idx]];
    }
    return draggedRows;
  }
  isDraggedRowSelected(selectedRows) {
    let { item, rowSelection } = this.props;
    if (selectedRows && selectedRows.length > 0) {
      let key = rowSelection.selectBy.keys.rowKey;
      return selectedRows.filter(r => r[key] === item.data[key]).length > 0;
    }
    return false;
  }

  renderDraggedRows() {
    const { columns } = this.props;
    const cols = columns;
    return this.getDraggedRows().map((r, i) => {
      return (
        <tr key={shortid.generate()}>
          {this.renderDraggedCells(r, i, cols)}
        </tr>
      );
    });
  }

  renderDraggedCells(item, rowIdx, columns) {
    let cells = [];
    if (item != null) {
      columns.forEach(c => {
        if (item.hasOwnProperty(c.key)) {
          if (c.formatter) {
            const Formatter = c.formatter;
            const dependentValues =
              typeof c.getRowMetaData === "function"
                ? c.getRowMetaData(item, c)
                : {};
            cells.push(
              <td
                key={`dragged-cell-${rowIdx}-${c.key}`}
                className="react-grid-Cell"
                style={{ padding: "5px" }}
              >
                <Formatter
                  dependentValues={dependentValues}
                  value={item[c.key]}
                />
              </td>
            );
          } else {
            cells.push(
              <td
                key={`dragged-cell-${rowIdx}-${c.key}`}
                className="react-grid-Cell"
                style={{ padding: "5px" }}
              >
                {item[c.key]}
              </td>
            );
          }
        }
      });
    }
    return cells;
  }

  render() {
    const { isDragging, currentOffset } = this.props;
    if (!isDragging) {
      return null;
    }
    let draggedRows = this.renderDraggedRows();
    return (
      <div style={layerStyles} className="rdg-dragging">
        <div style={getItemStyles(currentOffset)} className="rdg-dragging">
          <table>
            <tbody>{draggedRows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
