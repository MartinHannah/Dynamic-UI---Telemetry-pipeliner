import * as React from 'react';
import './DashboardLayout.scss';
import PropTypes from 'prop-types';
//import { DropTarget } from 'react-dnd';
//import ItemTypes from '../../utils/itemTypes';


class LayoutPosition extends React.Component { 
    constructor(props) { 
        super(props);

        this.state = {
            widget: {}
        }
    }

    componentWillMount(){
        console.log('loading');
        this.getWidget();
    }

    getWidget() { 
        const { widgets, position } = this.props;
        const widget = widgets.find((widget) => { 
            if(widget.options.position == position)
                return widget;
        })
        this.setState({widget: widget});
    }

    render() { 
       // const { connectDropTarget } = this.props;
        const { widget } = this.state;
        return (
          <div>
            { widget.widget !== undefined ? 
              <widget.widget.component widget={widget.widget} options={widget.options} /> : 
            null }
          </div>
        );
    }
}

/*const layoutTarget = {
    drop(props) { 
        console.log(props);
    } 
}

const collect = (connect,  monitor) => ({
    connectDropTarget: connect.dropTarget(),
    highlighted: monitor.canDrop(),
  });
*/
LayoutPosition.propTypes = { 
    position: PropTypes.number.isRequired,
    widgets: PropTypes.arrayOf(PropTypes.shape).isRequired,
   // connectDropTarget: PropTypes.func.isRequired
}

export default LayoutPosition;

//            <widget.component {...widget} />
// DropTarget(ItemTypes.DASHBOARDWIDGET, layoutTarget, collect)