
/* 0 */
import * as React from 'react';
import './DashboardWidget.scss';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
//Components
// import Grid from '@material-ui/core/Grid';
//  import IconButton from '@material-ui/core/IconButton';
//  import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVert from '@material-ui/icons/MoreVert';
// import Paper from '@material-ui/core/Paper';
// import * as components from '../../utils/views';
import { modifyDashboardWidget } from '../../actions/views/actions';
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
  //modifyWidget: Function,
} 

class DashboardWidget extends React.Component<Props> { 
  constructor(props) { 
    super(props);
    this.widgetRef = React.createRef();
    // this.state = {
    //    anchorEl: null,
    //  };
  }

    // handleClick = (event) => {
    //   this.setState({ anchorEl: event.currentTarget });
    // };
  
    // handleClose = () => {
    //   this.setState({ anchorEl: null });
    // };

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

const widgetSource = {
  beginDrag(props) {
    console.log('begin dragging widget', props);
    return {
      position: props.position,
      section: props.sectionId,
      widget: props.widget
    };
  }, 
  endDrag(props, monitor) { 
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if ( dropResult && dropResult.section !== item.section ) {
			props.removeWidget(item.position);
		}
  }
};

const widgetTarget = { 
  hover(props, monitor, component) {
    console.log(props);
    const dragIndex = monitor.getItem().position;
		const hoverIndex = props.options.position;
		const sourceListId = monitor.getItem().section;	
 
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
		if ( props.options.section === sourceListId ) {
      console.log('move widget');
			props.moveWidget(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
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
)(DashboardWidget);

/* <Grid item className="dashboard-widget">
<Paper>
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
      <MenuItem onClick={() => modifyWidget('Dashboard', widget.id, false)}>Remove from Dashboard</MenuItem>
    </Menu>
  </Grid>
  <Grid item className="widget-container">
    <Component widget={widget} {...other} />
  </Grid>
</Paper>
</Grid> */