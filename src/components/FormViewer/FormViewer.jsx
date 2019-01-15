/* eslint react/destructuring-assignment: 0 */
import * as React from "react";
import "./FormViewer.scss";
import * as shortid from "shortid";

//formComponents
import Grid from "@material-ui/core/Grid";
import * as submissions from "../../utils/formSubmission";
import * as loadableformComponents from "../../utils/views";

const sampleDefinition = {
  submission: "export",
  formComponents: [
    {
      component: "InputField",
      options: {
        name: "firstName",
        inputType: "text",
        readOnly: false,
        placeholder: "Enter name",
        helperText: "This field is for your first name",
        isMultiline: false,
        isRequired: false,
        label: "First Name"
      }
    },
    {
      component: "SwitchGroup",
      options: {
        name: "switchgroup",
        label: "Select Notifications",
        helperText:
          "Select the types of notifications you would like to receive",
        data: [
          { name: "Email", value: "email", isChecked: true },
          { name: "SMS", value: "sms", isChecked: false }
        ]
      }
    },
    {
      component: "DefaultButton",
      options: {
        fullWidth: false,
        variant: "text",
        label: "Submit",
        type: "submit"
      }
    }
  ]
};
type Props = {
  /** The array of formComponents and their configuration that the form will load */
  formComponents: Array,
  /** What the form will do on submission. Currently supported values:  */
  submission: string
};

/**
  The FormViewer component reads information from a form definition and genrerates the required formComponents. 
 */
class FormViewer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      formDef: sampleDefinition.formComponents,
      loaded: false,
      submission: "none"
    };
  }

  componentDidMount = () => {
    this.renderDefinition();
  };

  handleChange = event => {
    console.log("typing");
    console.log(this.state[event.target.name]);

    this.setState({ [event.target.name]: event.target.value });
  };

  /**
Take the definition and convert it into loadable components. 
@public 
 */
  renderDefinition = () => {
    const { formComponents } = this.props;
    const form = formComponents.map(element => {
      const Component = loadableformComponents[element.component];
      if (element.options.value !== undefined)
        this.setState({ [element.options.name]: element.options.value }, () => {
          return (
            <Component
              key={shortid.generate()}
              {...element.options}
              value={this.state[element.options.name]}
              change={this.handleChange}
            />
          );
        });
      return (
        <Component
          key={shortid.generate()}
          {...element.options}
          value={this.state[element.options.name]}
          change={this.handleChange}
        />
      );
    });
    this.setState({ formDef: form }, () => {
      console.log("loaded");
      this.setState({ loaded: true });
    });
  };

  /** 
Generic submit functionality. Should choose a submission action based on form definition. 
@public
 */
  submit = event => {
    const { submission } = this.state;
    let f = submissions[submission];
    f();
    console.log(this.state);

    event.preventDefault();
  };

  render() {
    const { loaded, formDef } = this.state;
    return (
      <form onSubmit={this.submit}>
        <Grid container direction="column">
          {loaded ? formDef : null}
        </Grid>
      </form>
    );
  }
}

export default FormViewer;
