import React from 'react';
import Paper from '@material-ui/core/Paper';
import * as components from '../../utils/views';


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

const getComponent = component => components[component];

/** A Draggable container for widgets. 
All widgets are wrapped in this and if they are draggable it will provide the functionality for this.
Draggable Cards are both drop targets and drag sources to allow for reordering and moving to different sections. 
*/
class DefaultCard extends React.Component<Props> { 

  constructor(props) { 
    super(props);
  }

  convertOptions = () => { 
    const { widget } = this.props;
    widget.options = widget.options.replace(/'/g, '"');
    return JSON.parse(widget.options);
  }

  render() { 
    const { widget } = this.props;
    const Widget = getComponent(widget.name);
    return (
      <div className='draggable-card' ref={(node) => (this.widgetRef = node)}>
        <Paper>
          <Widget widget={widget} {...this.convertOptions()} />
        </Paper>
      </div>
    );
  }
}



export default DefaultCard;