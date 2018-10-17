import * as React from 'react';
import './DefaultSection.scss';
//import { connect } from 'react-redux';
import * as shortid from 'shortid';
import Grid from '@material-ui/core/Grid';
//import PropTypes from 'prop-types';
import DropContainer from '../../components/DropContainer/DropContainer';
//import { modifyWidgetPosition } from '../../actions/views/actions';


type Props = { 
    xs: number,
    md: number,
    direction: string,
    list: Array,
    id: number,
    widgets: Array,
    modifyPosition: Function
}

class DefaultSection extends React.Component<Props> { 
  constructor(props) { 
    super(props);
    
    this.moveWidget = this.moveWidget.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
  }

  getWidget = (section, position) => { 
    const { widgets } = this.props;
    const widget = widgets.find((widget) => { 
        if(widget.options.section == section && widget.options.position == position)
          return widget;
    });
    return widget;
  }
//This needs to update the widget section in the db
  removeWidget = (position) => {
    const { id, modifyPosition } = this.props;
    const widget = this.getWidget(id, position);
    modifyPosition(widget.widget.id, 'DashboardDraggable', );

    
    // this.setState(
    //   update(this.state, {
    //     widgets: {
    //       $splice: [
    //         [index, 1]
    //       ]
    //     } 
    //   })
    // );
  }

//This needs to update the widget position in the db
  moveWidget = (dragIndex, hoverIndex) => { 
    const { id, modifyPosition } = this.props;
    console.log(dragIndex, hoverIndex);
    const widget = this.getWidget(id, dragIndex);
    const options = {
      section: id,
      position: hoverIndex
    }
    console.log(options);
    modifyPosition('DashboardDraggable', widget.widget.id, options);
    // const dragCard = widgets[dragIndex];
    // this.setState(
    //   update(this.state, {
    //     widgets: {
    //       $splice: [
    //         [dragIndex, 1],
    //         [hoverIndex, 0, dragCard]
    //       ]
    //     } 
    //   })
    // );
  }

  getSectionWidgets = () => { 
    const { id, widgets } = this.props;
    let positions = [];
    positions = widgets.filter((widget) => {
        if(widget.options.section == id) { 
          return widget;
        }
    });
    
    positions = positions.map((widget) => { 
        return <widget.widget.component key={shortid.generate()} widget={widget.widget} options={widget.options} moveWidget={this.moveWidget} removeWidget={this.removeWidget} />
    })
    return positions;
  }

  render (){
    const {id, list, direction, xs, md } = this.props;
    //const sectionWidgets = this.getSectionWidgets();
    return (
      <Grid className="section" item direction={direction} xs={xs} md={md}>
        <DropContainer sectionId={id} list={list} />
      </Grid>
    );
  }

}

export default DefaultSection;