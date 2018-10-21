import * as React from 'react';
import './DefaultSection.scss';
import { connect } from 'react-redux';
//import * as shortid from 'shortid';
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
   updateSection: Function
}

const mapStateToProps = () => { 
  return { 

  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    updateSection: (parent, section, widgets) => { 
        dispatch(viewActions.updateSection(parent, section, widgets));
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

  componentWillUnmount(){
    //console.log('update');
    //this.sectionUpdate();
  }

  // getWidget = (section, position) => { 
  //   const { widgets } = this.state;
  //   const widget = widgets.find((widget) => { 
  //       if(widget.options.section == section && widget.options.position == position)
  //         return widget;
  //   });
  //   return widget;
  // }

    //This needs to add the widget to a different section.
  pushWidget = (widget, sectionId) => {
    console.log('push', sectionId);
   // console.log(widget);
  //  const { list } = this.props; 
  //  let widgets = list;
  //  widgets.push(widget);
  //  console.log(widgets);
  //  this.sectionUpdate(widgets);
    this.setState( this.addWidget(this.state, widget), () => { 
     // this.sectionUpdate();
    });
  };

  addWidget = (state, widget) => { 
    return update(this.state, {
        widgets: {
          $push: [widget]
        }
      })
  }

  sectionUpdate = () => { 
    const { id, direction, xs, md, updateSection } = this.props;
    const { widgets } = this.state;
    const section = { 
      id: id, 
      direction: direction,
      xs: xs,
      md: md,
      widgets: widgets
    }
    console.log(section);
    updateSection(section);
  }

//This needs to update the widget section in the db
  removeWidget = (index) => {
  //  const { list } = this.props; 
  //  let widgets = list;
  //  widgets.splice(index, 1);
  //  console.log(widgets);
  //   this.sectionUpdate(widgets);
    const { id } = this.props;
    console.log('remove', id);
    this.setState(this.rWidget(this.state, index), () =>{
      //this.sectionUpdate();
    })

   // console.log(index);
    // this.setState(
    //   update(this.state, {
    //     widgets: {
    //       $splice: [[index, 1]]
    //     }
    //   }),
    //   function(){ console.log(widgets);}
    // );
  }

  rWidget = (state, index) => { 
    return update(state, {
        widgets: {
          $splice: [[index, 1]]
        }
      })
  }

  moveWidget = (dragIndex, hoverIndex) => {
    // const { list } = this.props; 
    // const dragCard = list[dragIndex];
    // let widgets = list;
    // widgets.splice(dragIndex, 1);
    // widgets.splice(hoverIndex, 0, dragCard);
    // console.log(widgets);
    // this.sectionUpdate(widgets);
    console.log('move', dragIndex, hoverIndex);
    this.setState(this.mWidgets(this.state, dragIndex, hoverIndex), () => {
      const { widgets } = this.state;
      console.log(widgets);
     // this.sectionUpdate();

    })
  };

  mWidgets = (state, dragIndex, hoverIndex) => { 
    const { widgets } = this.state;
    const dragCard = widgets[dragIndex];
    return update(state, {
        widgets: {
          $splice: [
            [dragIndex, 1], 
            [hoverIndex, 0, dragCard]]
        }
      })
  }

  // getSectionWidgets = () => { 
  //   const { id, widgets } = this.props;
  //   let positions = [];
  //   positions = widgets.filter((widget) => {
  //       if(widget.options.section == id) { 
  //         return widget;
  //       }
  //   });
    
  //   positions = positions.map((widget) => { 
  //       return <widget.widget.component key={shortid.generate()} widget={widget.widget} options={widget.options} moveWidget={this.moveWidget} removeWidget={this.removeWidget} />
  //   })
  //   return positions;
  // }

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