import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { modifyDashboardWidget } from '../../actions/views/actions';
import ItemTypes from '../../utils/itemTypes';


type Props = { 
  connectDropTarget: Function,
  connectDragSource: Function,
  isDragging: boolean,
  widget: Object,
  modifyWidget: Function
}

class DraggableCard extends React.Component<Props> { 
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
    const { widget, isDragging, connectDragSource, connectDropTarget, modifyWidget, removeWidget, position, ...other} = this.props;
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
          <widget.widget.component widget={widget.widget} options={widget.options} {...other} />
        </Paper>
      </div>
    ));
  }
}

const widgetSource = {
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
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
      //console.log(monitor.getItem());
			monitor.getItem().position = hoverIndex;
		}	
  }
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
      modifyWidget: (widgetId, child, add) => { 
        dispatch(modifyDashboardWidget(widgetId, child, add));
      }
    }
  }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.DASHBOARDWIDGET, widgetTarget, (connect)=> ({
    connectDropTarget: connect.dropTarget()
  })),
 DragSource(ItemTypes.DASHBOARDWIDGET, widgetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
  })),
 //DragTarget(ItemTypes.DASHBOARDWIDGET, widgetTarget, collect)
)(DraggableCard);