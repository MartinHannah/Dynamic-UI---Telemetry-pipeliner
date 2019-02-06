import * as React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import "./ManageWidgets.scss";
import * as shortid from "shortid";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from '@material-ui/core/Button';
import ItemListAction from "../../components/ItemListAction/ItemListAction";
import DrawerWrapper from "../../components/DrawerWrapper/DrawerWrapper";
import DefaultSnackbar from "../../components/DefaultSnackbar/DefaultSnackbar";

import FormViewer from "../FormViewer/FormViewer";
import { castValue, getObjectByProp, transformValue } from "../../utils/util";

import {
  addWidgetInstance,
  getWidgets,
  getWidgetInstances,
  getWidgetConfig,
  getWidgetInstanceConfig,
  editWidgetInstance,
  editWidgetInstanceConfig,
  addWidgetInstanceConfig
} from "../../utils/api";

type Props = {
  menuOpen: boolean
};

const addWidgetSteps = ["Choose Widget Type", "Edit Widget Options"];
const nameField = {key: "name", type: "text", label: "Name", props: { required: true }};

class ManageWidgets extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      addingWidget: false,
      currentForm: [],
      widgetInstances: [],
      curWidgetInstanceConfig: [],
      curWidgetOptions: [],
      formVisible: false,
      selectedWidget: "",
      openAlert: false,
      alertMessage: "",
      activeStep: 0
    };

    getWidgetInstances().then(result => {
      this.setState({ widgetInstances: result.data });
    });

    getWidgets().then(result => {
      this.setState({ widgets: result.data });
    });
  }

  /** Actions that happen when the widget form is closed. */ 
  closeForm = () => { 
    this.setState({ 
      activeStep: 0,
      formVisible: false,
      addingWidget: false,
      selectedWidget: ''
    })
  }

  //Open the widget form, different config depending on editing or adding new. 
  openForm = (widget = null) => { 
    this.setState({
      addingWidget: (widget == null),
      formVisible: true,
      selectedWidget: widget
    });

    if(!widget) return;
    
    getWidgetInstanceConfig(widget.id).then(result => {
      const defaultVals = result.data;
      this.setState({ curWidgetInstanceConfig: defaultVals });
      this.createWidgetForm(widget.uiWidgetId, widget, defaultVals);
    });
  }

  //Edit any applicable widget instance changes and option values. 
  editWidget = (e, values) => {
    e.preventDefault();
    const { selectedWidget } = this.state;
    console.log(values);
    //Edit changes to the actual widget instance. (name change).
    this.editWidgetInstance(values, selectedWidget)
    .then(() => {
      return this.editWidgetOptions(values); //edit all applicable options
    })
    .then(() => {
      return getWidgetInstances();
    })
    .then(result => { 
      this.setState({
        activeStep: 0,
        openAlert: true,
        alertMessage: "Widget Updated",
        formVisible: false,
        widgetInstances: result.data
      });
    })
    .catch(err => {
      //To do: handle the form submission errors.
      console.log(err);
    });
  };

  //update any name changes to the widget instance. 
  //TO DO: only edit the instance if any values have actually changed. 
  editWidgetInstance = (values, widget) => {
    return new Promise((resolve, reject) => {
      editWidgetInstance(widget.id, {...widget, name: "name" in values ? values["name"].value : widget.name})
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //Edit only changed option values for a widget instance. 
  editWidgetOptions = values => {
    const { curWidgetInstanceConfig, curWidgetOptions } = this.state;
    const changedVals = curWidgetOptions.filter(option => {
      return option.name in values;
    }).map(option => {
      const ob = getObjectByProp(
        curWidgetInstanceConfig,
        "uiWidgetOptionId",
        option.id
      );
      ob.value = transformValue(values[option.name].value);
      return ob;
    });

    const requests = changedVals.map(option => {
      return new Promise((resolve, reject) => {
        editWidgetInstanceConfig(option.id, option)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });

    return Promise.all(requests);
  };

  //Add new widget instance, then add the configured options, then reload the widget instances, hide form.
  addWidget = async (e, values) => {
    e.preventDefault();
    const { selectedWidget } = this.state;

    addWidgetInstance({
      name: values.name.value,
      uiWidgetId: parseInt(selectedWidget),
      uiSectionId: 0 //Don't add this widget to any section yet. 
    })
    .then(result => {
      return this.addWidgetOptions(result.data.id, values);
    })
    .then(() => {
      return getWidgetInstances();
    })
    .then((result) => { 
      this.setState({
        activeStep: 0,
        formVisible: false,
        openAlert: true,
        alertMessage: "Widget Added",
        widgetInstances: result.data
      });
    })
    .catch(err => {
      console.log(err); //TO DO: Handle errors. 
    });
  };

  addWidgetOptions = (widgetId, values) => {
    const { curWidgetOptions } = this.state;
    const configuredOptions = curWidgetOptions.filter(option => {
      return option.name in values;
    }).map(option => {
      return {
        value: transformValue(values[option.name].value),
        uiWidgetInstanceId: widgetId,
        uiWidgetOptionId: option.id
      };
    });

    const requests = configuredOptions.map(option => {
      return new Promise((resolve, reject) => {
        addWidgetInstanceConfig(option)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });

    return Promise.all(requests);
  };

  selectNewWidget = event => {
    this.setState({ selectedWidget: event.target.value, activeStep: 1 });
    this.createWidgetForm(event.target.value);
  };

  //Generate a form definition for the widgets.
  createWidgetForm = (widgetId, widget = null, defaultVals = []) => {
    nameField.value = (widget !== null) ? widget.name : undefined;
    let form = [nameField];
    getWidgetConfig(widgetId).then(result => {
      result.data.map((option) => {
        if (defaultVals.length > 0 && getObjectByProp(defaultVals, "uiWidgetOptionId", option.id) === undefined)
          return;

        form.push({
          key: option.name,
          type: option.fieldType.toLowerCase(),
          valueType: option.valueType,
          label: option.name,
          value: (defaultVals.length > 0)
              ? castValue(getObjectByProp(defaultVals, "uiWidgetOptionId", option.id).value, option.valueType)
              : undefined,
          props: {
            required: option.mandatory
          }
        });
      });
      this.setState({ curWidgetOptions: result.data, currentForm: form });
    });
  };

  render() {
    const { menuOpen } = this.props;
    const {
      activeStep,
      alertMessage,
      openAlert,
      addingWidget,
      widgetInstances,
      currentForm,
      widgets,
      formVisible,
      selectedWidget
    } = this.state;
    return (
      <Grid container className="manage-widgets">
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="flex-start">
            <Typography variant="h2" inline>
              Widgets
            </Typography>
            <IconButton
              onClick={() => this.openForm()}
              classes={{
                root: "add-widget",
                label: "add-widget-icon"
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {widgetInstances
            ? widgetInstances.map(widget => (
              <ItemListAction
                key={shortid.generate()}
                click={() => this.openForm(widget)}
                label={widget.name}
                secondaryIcon="fas fa-pen"
              />
              ))
            : null}
        </Grid>
        <DrawerWrapper
          anchor="bottom"
          isOpen={formVisible}
          onClose={() => this.closeForm()}
          overrides={{
            modal: "widget-form-wrapper",
            paperAnchorBottom: classNames(
              "widget-form-root",
              menuOpen && "sidebar-closed",
              !menuOpen && "sidebar-open"
            )
          }}
        >
          {addingWidget ? (
            <div>
              <Grid container justify="center" alignItems="center" alignContent='center'>
                <Grid item lg={6} className="over">
                  <Grid container className="over" justify="center" direction="column">
                    <Typography variant="h5" align='center'>Add Widget</Typography>
                    <Stepper activeStep={activeStep} orientation="horizontal" classes={{root: 'widget-stepper'}}>
                      {addWidgetSteps.map(step => (
                        <Step key={shortid.generate()}>
                          <StepLabel>{step}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    {activeStep == 1 ? <Button onClick={()=> this.setState({activeStep: activeStep - 1})}>Back</Button> : null }                    
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify='center'>
                {activeStep == 0 ? (
                  <select
                    className="widget-type-choose"
                    value={selectedWidget}
                    onChange={event => this.selectNewWidget(event)}
                  >
                    <option value="none">Select Widget Type</option>
                    {widgets.map(widget => (
                      <option key={shortid.generate()} value={widget.id}>
                        {widget.name}
                      </option>
                    ))}
                  </select>
                ) : null}
                {activeStep == 1 ? (
                  <FormViewer
                    direction='column'
                    definition={currentForm}
                    onSubmit={(e, values) => {this.addWidget(e, values)}}
                  />
                ) : null}
              </Grid>
            </div>
          ) :  (
            <Grid container justify="center" alignItems="center">
              <Typography variant="h5" align='center'>Edit Widget</Typography>
              <Grid item lg={12}>
                <Grid container justify="center">
                  <FormViewer
                    definition={currentForm}
                    onSubmit={(e, values) => {this.editWidget(e, values)}}
                  />
                </Grid>
              </Grid>
            </Grid>
            )}
        </DrawerWrapper>
        <DefaultSnackbar
          position={{ vertical: "bottom", horizontal: "left" }}
          isOpen={openAlert}
          timeToShow={2000}
          message={alertMessage}
          onClose={() => this.setState({ openAlert: false })}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.viewReducer.views,
    menuOpen: state.viewReducer.menuOpen
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageWidgets);
