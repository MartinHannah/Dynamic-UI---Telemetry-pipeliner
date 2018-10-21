import * as React from 'react';
import './DefaultComponent.scss';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import * as shortid from 'shortid';
import { DragDropContext } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
//Components
import Grid from '@material-ui/core/Grid';
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';
//import DropContainer from '../../components/DropContainer/DropContainer';
import DefaultSection from '../DefaultSection/DefaultSection';
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';


class DefaultComponent extends React.Component { 
  constructor(props) { 
    super(props);

  }
  componentWillMount(){}


  render() { 
    const {currentView} = this.props;
    const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
    }
  
    // const sections = currentView.sections.map((section) => { return(
    //   <DefaultSection key={shortid.generate()} id={section.id} direction={section.direction} xs={section.xs} md={section.md} list={section.widgets} />
    //       )});

    return (
      <Grid container className='layout-container' style={{...style}}>
        { currentView.sections.map((section) => <DefaultSection key={shortid.generate()} id={section.id} direction={section.direction} xs={section.xs} md={section.md} list={section.widgets} />)}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentView: state.viewReducer.currentView
  };
}

const mapDispatchToProps = () => {
  return { 
  }
}

DefaultComponent.propTypes = {
  currentView: PropTypes.shape({
    id: PropTypes.string.isRequired,
    widgets: PropTypes.array.isRequired }).isRequired
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(MultiBackend(HTML5toTouch))
  )(DefaultComponent);

//        {currentView.widgets.map((widget) => widget.options.section == section.id ? <widget.widget.component key={shortid.generate()} {...widget} /> : null)}
//{currentView.widgets.map((widget, index) => widget.options.section == section.id ? <LayoutPosition position={index} {...widget} /> : null)}
//section.widgets.map((widget, index) => <LayoutPosition key={shortid.generate()} position={index} widgets={section.widgets} />

// {currentView.sections.map((section) => 
//   (
//     <DefaultSection key={shortid.generate()} id={section.id} direction={section.direction} xs={section.xs} md={section.md} widgets={currentView.widgets} />
//  ))}

/* <DropContainer key={shortid.generate()} id={currentView.sections[0].id} list={currentView.sections[0].widgets} />
        <DropContainer key={shortid.generate()} id={currentView.sections[1].id} list={currentView.sections[1].widgets} />
        <DropContainer key={shortid.generate()} id={currentView.sections[2].id} list={currentView.sections[2].widgets} />
        <DropContainer key={shortid.generate()} id={currentView.sections[3].id} list={currentView.sections[3].widgets} />
        <DropContainer key={shortid.generate()} id={currentView.sections[4].id} list={currentView.sections[4].widgets} /> */