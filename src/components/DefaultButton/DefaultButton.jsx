import * as React from 'react';
import './DefaultButton.scss';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
//import * as submissions from '../../utils/formSubmission';


type Props = {
  /** if true the button will take up full width of the container */
  fullWidth?: boolean,
  /** values: 'text', 'contained', 'outlined', 'raised', 'fab', 'extendedFab' */
  variant?: string,
  /** The text that will be on the button */
  label: string,
  /** Possible values: 'button', 'submit', 'reset' */
  type?: string,
  /** If set, this is the link that the button will direct to */
  href: string, 
  /** if true and variant is set to 'fab' the button will use the mini floating action button styling */
  mini?: boolean, 
  /** 'small', 'medium', 'large' */
  size?: string,
  /** action for button to take on click */
  click: Function
}

class DefaultButton extends React.Component<Props> { 
  static defaultProps = { 
    fullWidth: false,
    mini: false,
    size: 'medium',
    variant: 'contained',
    type: 'button'
  }
    constructor(props) { 
        super(props);
    }

    submit() { 

    }

    render(){
      const { fullWidth, variant, label, type, size, mini, href, click } = this.props;
        return(
          <Button
            fullWidth={fullWidth}
            variant={variant}
            type={type}
            size={size}
            mini={mini}
            href={href}
            onClick={() => click()}
            classes={{
              root: classNames('default-button'),
              label: classNames('default-button-text')
            }}
          >
            {label}
          </Button>
        );
    }
}

export default DefaultButton;