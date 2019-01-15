import * as React from 'react';
import './DefaultComponent.scss';
import { connect } from 'react-redux';
import * as shortid from 'shortid';

//Components
import Grid from '@material-ui/core/Grid';
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';
//import DropContainer from '../../components/DropContainer/DropContainer';
import DefaultSection from '../DefaultSection/DefaultSection';
import * as components from '../../utils/views';
import * as viewActions from '../../actions/views/actions';
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';

type Props = { 
  /** The current page/view to load, this is used to determine additional page functionality and load additional components. 
  E.g. if a user can add for widgets to a page this information will be here. */
  currentView: Object,
  /** The sections of the page to load */
  currentSections: Array,
  /** redux function allowing a section to be updated with differing widgets. */
  updateSectionState: Function
}

/** The top level component for all widgets. This component will load in a page consisting of sections that contain widgets. */
class DefaultComponent extends React.Component<Props> { 
  constructor(props) { 
    super(props);

    this.updateSection = this.updateSection.bind(this);
  }

  updateSection = (widgets, id) => { 
    const { updateSectionState  } = this.props;
    let newSection = { 
      id: id,
      widgets: widgets
    }
    updateSectionState(newSection);
  }

  renderComponents = () => { 
    const { currentView } = this.props;
    if(currentView.additionalFunctionality === undefined) return null;
    
    const additional = currentView.additionalFunctionality.map((element) => { 
      const Component = components[element];
      return <Component key={shortid.generate()} />;
    })
    console.log(additional);

    return additional;
  }


  render() { 
    const {currentSections} = this.props;

    return (
      <div>
        <Grid container className='layout-container'>
          { currentSections.map((section) => <DefaultSection key={shortid.generate()} id={section.id} direction={section.direction} xs={section.xs} md={section.md} list={section.widgets} updateSection={this.updateSection} />)}
        </Grid>
        { this.renderComponents() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentView: state.viewReducer.currentView,
    currentSections: state.viewReducer.currentSections
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    updateSectionState: (parent, section, widgets) => { 
        dispatch(viewActions.updateSection(parent, section, widgets));
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultComponent);
