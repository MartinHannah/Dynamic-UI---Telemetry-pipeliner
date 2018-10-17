import * as React from "react";
import "./DropContainer.scss";
//import * as shortid from "shortid";
import { DropTarget } from "react-dnd";
import update from "react-addons-update";
//Components
//import Grid from '@material-ui/core/Grid';
import ItemTypes from "../../utils/itemTypes";
import DraggableCard from "../DraggableCard/DraggableCard";
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';

type Props = {
  connectDropTarget: Function,
  //widgets: Array,
  canDrop: Function,
  isOver: Function,
  list: Array,
  sectionId: number
};

class DropContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { widgets: props.list };
    this.moveWidget = this.moveWidget.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
  }

  //This needs to add the widget to a different section.
  pushWidget = widget => {
    console.log(widget);
    // this.setState(
    //     update(this.state, {widgets: {
    // 		$push: [ widget ]
    // 	} }));
  };

  removeWidget = index => {
    console.log(index);
    // this.setState(
    //     update(this.state, {
    //         widgets: {
    //             $splice: [
    //                 [index, 1]
    //             ]
    //         }
    //     })
    // );
  };

  getWidget = (section, position) => {
    console.log(section, position);
    //     const { widgets } = this.props;
    //     const widget = widgets.find((widget) => {
    //         if(widget.options.section == section && widget.options.position == position)
    //           return widget;
    //     });
    //     return widget;
  };

  //Currently only accounting for section one.
  moveWidget = (dragIndex, hoverIndex) => {
    const { widgets } = this.state;
    const dragCard = widgets[dragIndex];

    this.setState(
      update(this.state, {
        widgets: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  };

  render() {
    const { widgets } = this.state;
    const { canDrop, isOver, connectDropTarget, sectionId } = this.props;
    const isActive = canDrop && isOver;
    const style = {
      width: "200px",
      height: "404px",
      border: "1px dashed gray"
    };

    const backgroundColor = isActive ? "lightgreen" : "#FFF";

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {widgets.map((widget, i) => {
          return (
            <DraggableCard
              key={widget.id}
              index={i}
              listId={sectionId}
              widget={widget}
              removeCard={this.removeCard}
              moveCard={this.moveCard}
            />
          );
        })}
      </div>
    );
  }
}
// { widgets ?
//     this.generatePositions(section.id)
//       : null }
const widgetTarget = {
  drop(props, monitor, component) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    console.log(sourceObj);
    if (id !== sourceObj.listId) component.pushWidget(sourceObj.widget);
    return {
      listId: id
    };
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

export default DropTarget(ItemTypes.DASHBOARDWIDGET, widgetTarget, collect)(
  DropContainer
);

//DropTarget(ItemTypes.DASHBOARDWIDGET, sectionTarget, collect)

/* <div>
<Grid className='box' key={shortid.generate()} item xs={xs} md={md}>
  <Grid 
    container
    direction={direction}
  >
    {this.getSectionWidgets()}
    {isActive}
  </Grid>
</Grid>
</div>

{widgets.map((widget, i) => <DashboardWidget key={widget.id} index={i} listId={id} widget={widget} removeWidget={this.removeWidget} moveWidget={this.moveWidget} options={widget.options} />)} */
