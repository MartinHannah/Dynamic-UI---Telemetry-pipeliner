import * as React from "react";
import "./DefaultComponent.scss";
import { connect } from "react-redux";
import * as shortid from "shortid";

//Components
import Grid from "@material-ui/core/Grid";
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';
//import DropContainer from '../../components/DropContainer/DropContainer';
import DefaultSection from "../DefaultSection/DefaultSection";
//import * as components from "../../utils/views";
import * as viewActions from "../../actions/views/actions";
import ManageWidgets from '../../widgets/ManageWidgets/ManageWidgets';
import ManagePages from '../../widgets/ManageRoutes/ManageRoutes';
//import LayoutPosition from '../../components/DashboardLayout/DashboardLayout';

type Props = {
  /** The current page/view to load, this is used to determine additional page functionality and load additional components. 
  E.g. if a user can add for widgets to a page this information will be here. */
  currentView: Object,
  /** The sections of the page to load */
  currentSections: Array,
  /** redux function allowing a section to be updated with differing widgets. */
  updateSectionState: Function
};

/** The top level component for all widgets. This component will load in a page consisting of sections that contain widgets. */
class DefaultComponent extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.updateSection = this.updateSection.bind(this);
  }

  updateSection = (widgets, id) => {
    const { updateSectionState } = this.props;
    let newSection = {
      id: id,
      widgets: widgets
    };
    updateSectionState(newSection);
  };

  render() {
    const { currentSections, currentView } = this.props;

    return (
      <div>
        {currentView.label !== 'Manage' ? (
          <Grid container className="layout-container">
            {currentSections.map(section => (
              <DefaultSection
                key={shortid.generate()}
                id={section.id}
                direction={section.direction}
                xs={section.xs}
                md={section.md}
                list={section.widgetInstances}
                updateSection={this.updateSection}
              />
            ))}
          </Grid>
        ) : (
          <Grid container>
            {currentView.id == 'pages' ? <ManagePages /> : <ManageWidgets />}
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentView: state.viewReducer.currentView,
    currentSections: state.viewReducer.currentSections
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSectionState: (parent, section, widgets) => {
      dispatch(viewActions.updateSection(parent, section, widgets));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultComponent);
