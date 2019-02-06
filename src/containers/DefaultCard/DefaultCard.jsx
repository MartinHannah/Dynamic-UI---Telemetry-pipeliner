import React from 'react';
//import { findKey } from 'lodash';
import * as components from '../../utils/views';
import { getWidgetInstanceConfig, getWidget, getWidgetConfig } from '../../utils/api';
import { getObjectByProp, castValue } from '../../utils/util';

type Props = { 
  // /** Used by reactdnd library to allow this to be a drop target */
  // connectDropTarget: Function,
  // /** Allows this container to be draggable */
  // connectDragSource: Function,
  // /** Is the card currently being dragged */
  // isDragging: boolean,
  /** The widget that this card contains */
  widget: Object,
}

const getComponent = id => components[id];

/** A Draggable container for widgets. 
All widgets are wrapped in this and if they are draggable it will provide the functionality for this.
Draggable Cards are both drop targets and drag sources to allow for reordering and moving to different sections. 
*/
class DefaultCard extends React.Component<Props> { 

  constructor(props) { 
    super(props);
    this.state = { 
      options: undefined,
      Widget: undefined
    }

    getWidget(props.widget.uiWidgetId).then((result) => { 
      this.setState({Widget: getComponent(result.data.name)})
    })
  }

  componentDidMount = () => { 
    this.getOptions();
  }

  getOptions = () => { 
    const { widget } = this.props;
    const config = {}
    getWidgetInstanceConfig(widget.id).then(async (result) => { 
      const options = result.data;
      return { options: options, optionConfig: await getWidgetConfig(widget.uiWidgetId)};
    })
    .then((result) =>  {
      result.options.map(option => {
        const con = getObjectByProp(result.optionConfig.data, 'id', option.uiWidgetOptionId);
        config[con.name] = castValue(option.value, con.valueType);
      })
     this.setState({options: config});
    })
  }

  render() { 
    const { Widget, options } = this.state;
    console.log(Widget, options);
    return (
      <div className='draggable-card' ref={(node) => (this.widgetRef = node)}>
        {Widget !== undefined ? <Widget {...options} /> : null }
      </div>
    );
  }
}



export default DefaultCard;