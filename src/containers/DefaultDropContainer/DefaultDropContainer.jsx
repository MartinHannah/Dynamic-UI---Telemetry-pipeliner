import * as React from "react";
import "./DefaultDropContainer.scss";

//Components
import Grid from "@material-ui/core/Grid";
import DefaultCard from "../DefaultCard/DefaultCard";

type Props = {
  /** List of widgets that this component contains */
  list: Array,
  /** id of the section that this container is a part of */
  sectionId: number,
  /** Removes a widget from the section */
  removeWidget: Function,
  /** Moves the position of a widget */
  moveWidget: Function
};

/** A container for widgets loaded by a section that is able to provide drop functionality for droppable widgets */
const DefaultDropContainer = (props:Props) => {
    const {
      sectionId,
      removeWidget,
      moveWidget,
      list
    } = props;
    return (
      <div>
        {list !== undefined
          ? list.map((widget, i) => {
              return (
                <Grid item key={widget.id} className="draggable-card">
                  <DefaultCard
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

export default DefaultDropContainer;