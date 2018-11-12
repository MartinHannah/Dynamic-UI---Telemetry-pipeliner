import * as React from 'react';
import './DefaultButton.scss';
import Button from '@material-ui/core/Button';
import * as submissions from '../../utils/formSubmission';


type Props = {
  fullWidth: boolean,
  variant: string,
  label: string,
  type: string
}

class DefaultButton extends React.Component<Props> { 
    constructor(props) { 
        super(props);
    }

    click = (action) => { 
      const submit = submissions[action];
      submit();
    }

    render(){
      const { fullWidth, variant, label, type } = this.props;
        return(
          <Button
            fullWidth={fullWidth}
            variant={variant}
            type={type}
          >
            {label}
          </Button>
        );
    }
}

export default DefaultButton;