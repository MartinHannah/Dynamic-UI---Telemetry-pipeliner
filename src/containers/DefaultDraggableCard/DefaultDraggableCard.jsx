import React from 'react';
import compose from 'recompose/compose';
import { DragSource, DropTarget } from 'react-dnd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ItemTypes from '../../utils/itemTypes';


type Props = { 
  /** Used by reactdnd library to allow this to be a drop target */
  connectDropTarget: Function,
  /** Allows this container to be draggable */
  connectDragSource: Function,
  /** Is the card currently being dragged */
  isDragging: boolean,
  /** The widget that this card contains */
  widget: Object,
}

/** A Draggable container for widgets. 
All widgets are wrapped in this and if they are draggable it will provide the functionality for this.
Draggable Cards are both drop targets and drag sources to allow for reordering and moving to different sections. 
*/
class DefaultDraggableCard extends React.Component<Props> { 

  constructor(props) { 
    super(props);
    this.widgetRef = React.createRef();
    this.state = {
       anchorEl: null,
     };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() { 
    const { widget, isDragging, connectDragSource, connectDropTarget, removeWidget, position} = this.props;
    const { anchorEl } = this.state;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <div className='draggable-card' style={{ opacity }} ref={(node) => (this.widgetRef = node)}>
        <Paper>
          { widget.options.isRemovable ?
            (
              <Grid
                container
                justify='flex-end'
                className="widget-header"
              >
                <IconButton
                  className='icon-button'
                  aria-owns={anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => this.handleClose(widget.id)}
                >
                  <MenuItem onClick={() => removeWidget(position)}>Remove from Dashboard</MenuItem>
                </Menu>
              </Grid>
            ) 
            : null }
          <widget.widget.component widget={widget.widget} {...widget.options} />
        </Paper>
      </div>
    ));
  }
}

const widgetSource = {
  canDrag(props) {
    return props.widget.isDraggable;
  },
  beginDrag(props) {
    console.log('begin dragging widget', props);
    return {
      id: props.widget.id,
      position: props.position,
      sectionId: props.sectionId,
      widget: props.widget
    };
  }, 
  endDrag(props, monitor) { 
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('end drag');
    //console.log(dropResult, item);
    if ( dropResult && dropResult.sectionId !== item.sectionId ) {
      console.log('remove');
			props.removeWidget(item.position);
		}
  }
};

const widgetTarget = { 
  hover(props, monitor, component) {
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
  //console.log(props, sourceListId);
		// Time to actually perform the action
		if ( props.sectionId === sourceListId ) {
      //console.log('move');
			props.moveWidget(dragIndex, hoverIndex);
			monitor.getItem().position = hoverIndex;
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
)(DefaultDraggableCard);