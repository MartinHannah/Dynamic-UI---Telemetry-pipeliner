import * as React from "react";
import "./DropContainer.scss";
import * as randomstring from "randomstring";
import { DropTarget } from "react-dnd";
import classNames from 'classnames';


//Components
import Grid from "@material-ui/core/Grid";
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

  generateKeys = num => {
    let keys = [];
    for (let i = 0; i < num; i++) {
      keys.push(
        randomstring.generate({
          length: 5,
          charset: "alphabetic"
        })
      );
    }
    console.log(keys);
    return keys;
  };

  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      sectionId,
      removeWidget,
      moveWidget,
      list
    } = this.props;
    const isActive = canDrop && isOver;
    let classes = classNames({ "drop-container": true, 'active-container': isActive });
    return connectDropTarget(
      <div className={classes}>
        {list !== undefined
          ? list.map((widget, i) => {
              return (
                <Grid item key={widget.options.id} className="draggable-card">
                  <DraggableCard
                    position={i}
                    sectionId={sectionId}
                    widget={widget}
                    removeWidget={removeWidget}
                    moveWidget={moveWidget}
                  />
                </Grid>
              );
            })
          : null}
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
    if (sectionId !== sourceObj.sectionId)
      pushWidget(sourceObj.widget, sectionId);
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
