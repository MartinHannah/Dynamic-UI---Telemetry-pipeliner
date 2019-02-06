import { DragSource } from 'react-dnd';
import React, { Component } from 'react';
import ItemTypes from "../../utils/itemTypes";

type Props = { 
    children: Node,
    connectDragSource: Function,
    connectDragPreview: Function,
    isDragging: boolean,
}

class DraggableHeaderCell extends Component<Props> {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    const img = new Image();
    img.src = './assets/images/drag_column_full.png';
    img.onload = () => connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging, children } = this.props;
    if (isDragging) {
      return null;
    }
    return connectDragSource(<div style={{ cursor: 'move' }}>{children}</div>);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

const headerCellSource = {
  beginDrag(props) {
    return props.column;
  },
  endDrag(props) {
    return props.column;
  }
};

export default DragSource(ItemTypes.COLUMN, headerCellSource, collect)(DraggableHeaderCell);
