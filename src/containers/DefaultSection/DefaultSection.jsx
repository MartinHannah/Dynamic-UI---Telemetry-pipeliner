import * as React from 'react';
import './DefaultSection.scss';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';
import DefaultDropContainer from '../DefaultDropContainer/DefaultDropContainer';


type Props = { 
    /** The breakpoint for mobile screens, values of 1-12 accepted.  */
    xs: number,
    /** The breakpoint for medium screens, values of 1-12 accepted */
    md: number,
    /** The direction that the section will load widgets in. Values: 'row', 'column' */
    direction: string,
    /** The list of widgets that the section contains */
    list: Array,
    /** The id of the section */
    id: number,
    /** How to justify the content inside the section. Values: 'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly' */
    justify: string,
    /** Update a section's widgets add/remove. This will be called if a user uses drag & drop to move widget to another section */
    updateSection: Function
}

/** A section is a container that can appear on a page multiple times and that contains a variety of widgets inside of it. */
class DefaultSection extends React.Component<Props> { 
  constructor(props) { 
    super(props);
    this.moveWidget = this.moveWidget.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
    this.pushWidget = this.pushWidget.bind(this);
  }

  //Add a new widget to the section
  pushWidget = (widget) => {
    const { updateSection, list, id } = this.props;
    let widgets = list;
    widgets.push(widget);
    updateSection(widgets, id);
  };

  //Remove the widget in a section
  removeWidget = (index) => {
    const { list, updateSection, id } = this.props; 
    let widgets = list;
    widgets.splice(index, 1);
    updateSection(widgets, id);
  }

  //Reorder the widgets in a section
  moveWidget = (dragIndex, hoverIndex) => {
    const { list, id, updateSection } = this.props; 
    const dragCard = list[dragIndex];
    let widgets = list;
    widgets.splice(dragIndex, 1);
    widgets.splice(hoverIndex, 0, dragCard);
    updateSection(widgets, id);
  };

  generateWidgetIds = () => {
    const { list } = this.props;
    const widgets = list.map((widget) => {
      const wid = Object.assign(widget, {id: shortid.generate()});
      return wid;
    })
    return widgets;
  }

  render () {
    const {id, direction, xs, md, justify, list } = this.props;
    //const sectionWidgets = this.getSectionWidgets();
    return (
      <Grid className="widget-section" container item direction={direction} xs={xs} md={md} justify={justify}>
        <DefaultDropContainer sectionId={id} list={list} removeWidget={this.removeWidget} pushWidget={this.pushWidget} moveWidget={this.moveWidget} />
      </Grid>
    );
  }

}

export default DefaultSection;