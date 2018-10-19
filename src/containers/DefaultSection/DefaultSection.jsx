import * as React from 'react';
import './DefaultSection.scss';
import { connect } from 'react-redux';
import * as shortid from 'shortid';
import update from "react-addons-update";
import Grid from '@material-ui/core/Grid';
//import PropTypes from 'prop-types';
import DropContainer from '../../components/DropContainer/DropContainer';
import * as viewActions from '../../actions/views/actions';

type Props = { 
    xs: number,
    md: number,
    direction: string,
    list: Array,
    id: number,
    widgets: Array
}

const mapStateToProps = () => { 
  return { 

  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    updateSection: () => { 
        dispatch(viewActions.updateSection());
      },
  }
}

class DefaultSection extends React.Component<Props> { 
  constructor(props) { 
    super(props);
    this.state = { widgets: props.list };
    this.moveWidget = this.moveWidget.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
    this.pushWidget = this.pushWidget.bind(this);
  }

  getWidget = (section, position) => { 
    const { widgets } = this.props;
    const widget = widgets.find((widget) => { 
        if(widget.options.section == section && widget.options.position == position)
          return widget;
    });
    return widget;
  }

    //This needs to add the widget to a different section.
  pushWidget = widget => {
   // console.log(widget);
    this.setState(
      update(this.state, {
        widgets: {
          $push: [widget]
        }
      })
    );
  };

//This needs to update the widget section in the db
  removeWidget = (index) => {
    console.log('remove widget');
   // console.log(index);
    this.setState(
      update(this.state, {
        widgets: {
          $splice: [[index, 1]]
        }
      })
    );
  }

  moveWidget = (dragIndex, hoverIndex) => {
    //console.log('move', dragIndex, hoverIndex);
    const { widgets } = this.state;
    const dragCard = widgets[dragIndex];

    this.setState(
      update(this.state, {
        widgets: {
          $splice: [
            [dragIndex, 1], 
            [hoverIndex, 0, dragCard]]
        }
      })
    );
   // console.log(widgets);
  };

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
    const {id, direction, xs, md } = this.props;
    const { widgets } = this.state;
    //const sectionWidgets = this.getSectionWidgets();
    return (
      <Grid className="section" item direction={direction} xs={xs} md={md}>
        <DropContainer sectionId={id} list={widgets} removeWidget={this.removeWidget} pushWidget={this.pushWidget} moveWidget={this.moveWidget} />
      </Grid>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSection);