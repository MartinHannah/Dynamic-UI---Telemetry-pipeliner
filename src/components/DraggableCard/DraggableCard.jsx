import React from 'react';
import compose from 'recompose/compose';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../../utils/itemTypes';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	margin: '.5rem',
	backgroundColor: 'white',
};

type Props = { 
  connectDropTarget: Function,
  connectDragSource: Function,
  isDragging: boolean,
  widget: Object,
}

class DraggableCard extends React.Component<Props> { 
  constructor(props) { 
    super(props);
    this.widgetRef = React.createRef();
    // this.state = {
    //    anchorEl: null,
    //  };
  }

  render() { 
    const { widget, isDragging, connectDragSource, connectDropTarget} = this.props;
     // const { anchorEl } = this.state;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }} ref={(node) => (this.widgetRef = node)}>
        {widget.text}
      </div>
    ));
  }
}

const widgetSource = {
  beginDrag(props) {
    console.log('begin dragging widget', props);
    return {
      position: props.position,
      sectionId: props.sectionId,
      widget: props.widget
    };
  }, 
  endDrag(props, monitor) { 
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log(dropResult, item);
    if ( dropResult && dropResult.sectionId !== item.sectionId ) {
			props.removeWidget(item.position);
		}
  }
};

const widgetTarget = { 
  hover(props, monitor, component) {
    console.log(props);
    console.log(monitor.getItem());
    const dragIndex = monitor.getItem().position;
		const hoverIndex = props.position;
		const sourceListId = monitor.getItem().sectionId;	
 
		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}
 
		// Determine rectangle on screen
		const hoverBoundingRect = component.getDecoratedComponentInstance().widgetRef.getBoundingClientRect();
 
		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
 
		// Determine mouse position
		const clientOffset = monitor.getClientOffset();
 
		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;
 
		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
 
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}
 
    // Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}
  console.log(props, sourceListId);
		// Time to actually perform the action
		if ( props.sectionId === sourceListId ) {
			props.moveWidget(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
      console.log(monitor.getItem());
			monitor.getItem().index = hoverIndex;
		}	
  }
}

export default compose(
  DropTarget(ItemTypes.DASHBOARDWIDGET, widgetTarget, (connect)=> ({
    connectDropTarget: connect.dropTarget()
  })),
 DragSource(ItemTypes.DASHBOARDWIDGET, widgetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
  })),
 //DragTarget(ItemTypes.DASHBOARDWIDGET, widgetTarget, collect)
)(DraggableCard);