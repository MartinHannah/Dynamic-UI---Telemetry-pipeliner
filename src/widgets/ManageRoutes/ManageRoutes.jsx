import * as React from "react";
import { connect } from "react-redux";
import * as shortid from "shortid";
import classNames from "classnames";
import "./ManageRoutes.scss";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import FormViewer from "../FormViewer/FormViewer";
import DrawerWrapper from "../../components/DrawerWrapper/DrawerWrapper";

import {
  editWidgetInstance,
  getWidgetBySection,
  addContainer,
  getRoutes,
  addRoute,
  editRoute,
  addSection,
  editSection,
  getContainer,
  getSectionsByContainer
} from "../../utils/api";

type Props = {
  menuOpen: boolean
};

const routeForm = [
  { key: "label", type: "text", label: "Label", props: { required: true } },
  { key: "path", type: "text", label: "Path", props: { required: true } },
  { key: "icon", type: "text", label: "Icon", props: { required: true } },
  {
    key: "exact",
    type: "checkbox",
    label: "Exact",
    props: { required: false }
  },
  {
    key: "description",
    type: "text",
    label: "Description",
    props: { required: true }
  }
];

const sectionForm = [
  {
    key: "direction",
    type: "text",
    label: "Direction",
    props: { required: true }
  },
  {
    key: "xs",
    type: "range",
    label: "xs",
    props: { required: true, min: 1, max: 12, step: 1 }
  },
  {
    key: "md",
    type: "range",
    label: "md",
    props: { required: true, min: 1, max: 12, step: 1 }
  },
  {
    key: "widget",
    type: "select",
    label: "Assign Widget",
    props: { required: true }
  }
];

const addPageSteps = ["Enter Page Information", "Add Sections"];

class Management extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      currentRouteId: undefined,
      currentSection: undefined,
      formVisible: false,
      addingPage: false,
      addingSection: false,
      secondaryForm: [],
      primaryForm: [],
      secondaryFormPopulated: false,
      currentSections: [],
      activeStep: 0,
      availableWidgets: [],
      currentWidget: {}
    };
  }

  componentDidMount = async () => {
    getRoutes().then(result => {
      this.setState({ routes: result.data });
    });
    this.setState({ availableWidgets: await this.getAvailableWidgets(0) });
  };

  //Close the add/edit route form.
  closeForm = () => {
    this.setState({
      formVisible: false,
      activeStep: 0,
      secondaryFormPopulated: false
    });
  };
  //Add the new route -> then add new container -> Refresh list of routes.
  addRoute = (event, definition) => {
    event.preventDefault();
    addRoute({
      label: definition.label,
      path: definition.path,
      icon: definition.icon,
      exact: definition.exact
    })
      .then(result => {
        this.setState({
          currentRouteId: result.data.id
        });
        return addContainer({
          name: definition.label,
          label: definition.label,
          component: definition.label,
          allowMultiple: false,
          description: definition.description,
          uiRouteId: result.data.id
        });
      })
      .then(() => {
        return getRoutes();
      })
      .then(result => {
        this.setState({
          routes: result.data,
          activeStep: 1
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //add the new section -> assign the section to the selected widget if applicable -> reload the list of sections
  addSection = (e, definition) => {
    e.preventDefault();
    const { currentRouteId } = this.state;
    addSection({
      direction: definition.direction,
      xs: definition.xs,
      md: definition.md,
      uiContainerId: currentRouteId
    })
      .then(result => {
        if (typeof definition.widget === "number") {
          editWidgetInstance(definition.widget, {
            uiSectionId: result.data.id
          });
        }
        return this.setCurrentSections(currentRouteId);
      })
      .then(() => {
        this.setState({
          secondaryFormPopulated: false,
          addingSection: false
        });
      });
  };

  //edit the routes then refresh the list of routes.
  editRoute = (event, definition) => {
    event.preventDefault();
    const { currentRouteId } = this.state;
    editRoute(currentRouteId, {
      label: definition.label,
      path: definition.path,
      icon: definition.icon,
      exact: definition.exact
    })
      .then(() => {
        return getRoutes();
      })
      .then(result => {
        this.setState({
          addingPage: false,
          formVisible: true,
          routes: result.data
        });
      });
  };

  //edit the section -> if the section has a new widget assigned update the widgets -> then reload available widgets and list of sections.
  editSection = (e, definition) => {
    const { currentSection } = this.state;
    e.preventDefault();
    editSection(currentSection.id, {
      direction: definition.direction,
      xs: definition.xs,
      md: definition.md,
      uiContainerId: currentSection.uiContainerId
    })
      .then(() => {
        const { currentWidget } = this.state;
        let resolveArr = [];
        //if there is no current widget -> just assign widget.
        if (!currentWidget) {
          resolveArr.push(
            editWidgetInstance(definition.widget, {
              uiSectionId: currentSection.id
            })
          );
        } else {
          console.log("current widget");
          if (definition.widget !== currentWidget.value) {
            resolveArr.push(
              editWidgetInstance(currentWidget.value, {
                uiSectionId: 0
              })
            );
            resolveArr.push(
              editWidgetInstance(definition.widget, {
                uiSectionId: currentSection.id
              })
            );
          }
        }
        return Promise.all(resolveArr);
      })
      .then(() => {
        const { currentRouteId } = this.state;
        return this.setCurrentSections(currentRouteId);
      })
      .then(() => {
        return this.getAvailableWidgets(0);
      })
      .then(result => {
        this.setState(
          {
            secondaryFormPopulated: false,
            currentSection: undefined,
            availableWidgets: result
          },
          () => console.log(this.state)
        );
      });
  };

  getAvailableWidgets = id => {
    return new Promise((resolve, reject) => {
      getWidgetBySection(id)
        .then(result => {
          const options = result.data.map(widget => {
            return {
              name: widget.name,
              value: widget.id
            };
          });
          resolve(options);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  setCurrentSections = routeId => {
    return new Promise((resolve, reject) => {
      getContainer(routeId)
        .then(result => getSectionsByContainer(result.data[0].id))
        .then(result =>
          this.setState({ currentSections: result.data }, () => resolve())
        )
        .catch(err => reject(err));
    });
  };

  createSectionForm = async (section = null) => {
    const { availableWidgets } = this.state;
    const currentWidget =
      section !== null ? await this.getAvailableWidgets(section.id) : undefined;
    const form = sectionForm.map(field => {
      let newField = { ...field };
      newField.value = section === null ? "" : section[newField.key];
      if (newField.type === "select") {
        const options =
          section !== null
            ? availableWidgets.concat(currentWidget)
            : availableWidgets;
        newField.options = options;
        newField.value =
          options.length > 0
            ? options[options.length - 1].value
            : "No available widgets";
        newField.type = options.length == 0 ? "message" : newField.type;
      }
      return newField;
    });
    this.setState({
      addingSection: section == null,
      secondaryForm: form,
      secondaryFormPopulated: true,
      currentWidget: currentWidget !== undefined ? currentWidget[0] : {},
      currentSection: section
    });
  };

  //if adding widget, set to default form, otherwise map current values into form.
  createRouteForm = (route = null) => {
    if (route === null) {
      this.setState({
        primaryForm: routeForm,
        formVisible: true,
        addingPage: true
      });
    } else {
      const form = routeForm.map(field => {
        const newField = { ...field, value: route[field.key] };
        return newField;
      });
      this.setCurrentSections(route.id)
        .then(() => {
          this.setState({
            primaryForm: form,
            formVisible: true,
            addingPage: false,
            currentRouteId: route.id
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const { menuOpen } = this.props;
    const {
      activeStep,
      primaryForm,
      secondaryForm,
      currentSections,
      routes,
      formVisible,
      secondaryFormPopulated,
      addingPage,
      addingSection
    } = this.state;
    return (
      <Grid container>
        <Typography variant="h3" inline>Pages</Typography>
        <IconButton
          onClick={() => this.createRouteForm()}
          classes={{
            root: "add-widget",
            label: "add-widget-icon"
          }}
        >
          <AddIcon />
        </IconButton>
        <div className='routes-list'>
          {routes !== [] ? routes.map(route => (
            <div key={shortid.generate()} className='routes-container'>
              <Typography variant="h5" classes={{root: 'edit-route-title'}}>{route.label}</Typography>
              <IconButton classes={{root: 'edit-route-button'}} onClick={() => this.createRouteForm(route)}><EditIcon /></IconButton>
            </div>
          )) : null}
        </div>
        <Grid item xs={8}>
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
            direction="column"
            classes={{ container: "widget-form" }}
          >
            <DrawerWrapper
              anchor="bottom"
              isOpen={formVisible}
              onClose={() => this.closeForm()}
              overrides={{
                modal: "page-form-wrapper",
                paperAnchorBottom: classNames(
                  "page-form-root",
                  menuOpen && "sidebar-closed",
                  !menuOpen && "sidebar-open"
                )
              }}
            >
              <div>
                <Grid container justify="center" alignItems="center">
                  <Grid item lg={6}>
                    <Grid container justify="center" direction="column">
                      <Typography variant="h5" align="center">
                        {addingPage ? "Add Page" : "Edit Page"}
                      </Typography>
                      <Stepper
                        activeStep={activeStep}
                        orientation="horizontal"
                        classes={{ root: "widget-stepper" }}
                      >
                        {addPageSteps.map(step => (
                          <Step key={shortid.generate()}>
                            <StepLabel>{step}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      {activeStep == 0 && !addingPage ? (
                        <Button onClick={() => this.setState({ activeStep: activeStep + 1 })}>
                          Next
                        </Button>
                      ) : null}
                      {activeStep == 1 ? (
                        <Button onClick={() => this.setState({ activeStep: activeStep - 1 })}>
                          Back
                        </Button>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  {activeStep == 0 ? (
                    <FormViewer
                      direction="row"
                      definition={primaryForm}
                      onSubmit={(e, values) => {
                        addingPage
                          ? this.addRoute(e, values)
                          : this.editRoute(e, values);
                      }}
                    />
                  ) : null}
                  {activeStep == 1 ? (
                    <Grid container>
                      <Grid item lg={6}>
                        <Grid container className="section-display">
                          {currentSections.length > 0 ? (
                            currentSections.map((section, index) => (
                              <Grid
                                container
                                item
                                key={shortid.generate()}
                                xs={section.xs}
                                md={section.md}
                                direction={section.direction}
                                className="section"
                              >
                                <Button onClick={() => this.createSectionForm(section)} className="section-edit">
                                  {`SECTION ${index + 1}`}
                                </Button>
                              </Grid>
                            ))
                          ) : (
                            <Button
                              onClick={() => this.createSectionForm()}
                              className="no-section-add"
                            >
                              +
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container justify="center" item lg={6}>
                        {secondaryFormPopulated ? (
                          <FormViewer
                            direction="column"
                            definition={secondaryForm}
                            onSubmit={(e, values) => {
                              addingSection
                                ? this.addSection(e, values)
                                : this.editSection(e, values);
                            }}
                          />
                        ) : (
                          <Button onClick={() => this.createSectionForm()}>
                            Add Section
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </div>
            </DrawerWrapper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: state.viewReducer.menuOpen
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Management);
