import * as React from "react";
import "./FormViewer.scss";
import * as shortid from "shortid";
//import { isArray } from 'lodash';
import Grid from "@material-ui/core/Grid";
import * as fields from '../../utils/fields';

type Props = {
  onSubmit: Function,
  definition: any,
  direction: string
};

/**
  The FormViewer component reads information from a form definition and genrerates the required formComponents. 
 */
class FormViewer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      formDef: null,
      loaded: false,
      formValues: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    this.loadDefaultValues()
  };

  componentDidUpdate = prevProps => {
    const { definition } = this.props;
    if (definition !== prevProps.definition) {
      this.loadDefaultValues();
    }
  };

  renderForm = () =>  {
    const { definition } = this.props;
    const { formValues } = this.state;
    let form = definition.map(def => { 
      const Field = fields[def.type];
      return (
        <div key={shortid.generate()} className="form-group">
          <span className="form-label">{def.label}</span>
          <Field
            name={def.key}
            value={formValues[def.key].value}
            onChange={this.handleChange}
            inputProps={{...def.props}}
            options={def.options}
          />
        </div>
      );
    })

    this.setState({formDef: form}, () => {
      this.setState({loaded: true});
    })
  }

  loadDefaultValues = () => {
    const { definition } = this.props;
    const defValues = {};
    definition.map(def => {
      defValues[def.key] = { 
        value: (def.value !== undefined) ? def.value : undefined,
        type: def.valueType
      } 
    });
    this.setState({formValues: defValues }, () => {
      console.log(this.state);
      this.renderForm();
    });
  };
  
  submit = (e, formValues) =>  {
    const { onSubmit, definition } = this.props;
    let values = {};
    definition.forEach(def => {
        values[def.key] = (formValues.hasOwnProperty(def.key)) ? formValues[def.key]: def.value
    })
    onSubmit(e, values);
  }

  handleChange(value, key) {
    const { formValues } = this.state;
    let newValues = {...formValues};
    if(newValues[key].type === 'ARRAY') { 
      value = value.split(',');
    }
    newValues[key].value = value;
    this.setState({ formValues: newValues }, () => { console.log(this.state)});
  }

  render() {
    const { formDef, loaded, formValues } = this.state;
    const { direction } = this.props;
    return (
      <form onSubmit={e => this.submit(e, formValues)}>
        <Grid container item direction={direction}>
          {loaded && formDef}
        </Grid>
        <div className="form-group">
          <button className="form-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default FormViewer;
