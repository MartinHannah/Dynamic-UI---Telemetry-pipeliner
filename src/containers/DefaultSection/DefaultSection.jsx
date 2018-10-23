import * as React from 'react';
import './DefaultSection.scss';
import Grid from '@material-ui/core/Grid';
import DropContainer from '../../components/DropContainer/DropContainer';

type Props = { 
    xs: number,
    md: number,
    direction: string,
    list: Array,
    id: number,
    justify: string,
    updateSection: Function
}


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

  render () {
    const {id, direction, xs, md, justify, list } = this.props;
    //const sectionWidgets = this.getSectionWidgets();
    return (
      <Grid className="widget-section" container item direction={direction} xs={xs} md={md} justify={justify}>
        <DropContainer sectionId={id} list={list} removeWidget={this.removeWidget} pushWidget={this.pushWidget} moveWidget={this.moveWidget} />
      </Grid>
    );
  }

}

export default DefaultSection;