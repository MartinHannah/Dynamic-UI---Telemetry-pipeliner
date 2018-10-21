import * as React from "react";
import "./DropContainer.scss";
import * as shortid from "shortid";
import { DropTarget } from "react-dnd";

//Components
//import Grid from '@material-ui/core/Grid';
import ItemTypes from "../../utils/itemTypes";
import DraggableCard from "../DraggableCard/DraggableCard";
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';

type Props = {
  connectDropTarget: Function,
  canDrop: Function,
  isOver: Function,
  list: Array,
  sectionId: number,
  removeWidget: Function,
  moveWidget: Function
};

class DropContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  generateKey = () => { 
      shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-!');
      const key = shortid.generate();
     // console.log(key);
      return key;
  }

  render() {
    const { canDrop, isOver, connectDropTarget, sectionId, removeWidget, moveWidget, list } = this.props;
    const isActive = canDrop && isOver;
    const style = {
      width: "200px",
      height: "404px",
      border: "1px dashed gray"
    };
    const backgroundColor = isActive ? "lightgreen" : "#FFF";
    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {list.map((widget, i) => {
          return (
            <DraggableCard
              key={`${widget.text}${widget.id}`}
              position={i}
              sectionId={sectionId}
              widget={widget}
              removeWidget={removeWidget}
              moveWidget={moveWidget}
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
  drop(props, monitor) {
    const { sectionId, pushWidget } = props;
    const sourceObj = monitor.getItem();
   // console.log(sourceObj);
    if (sectionId !== sourceObj.sectionId) pushWidget(sourceObj.widget, sectionId);
    return {
      sectionId: sectionId
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
