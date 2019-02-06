import * as React from "react";
import "./DefaultSnackbar.scss";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  position: Object,
  timeToShow: number,
  isOpen: boolean,
  onClose: Function,
  message: string
};

const DefaultSnackbar = (props: Props) => {
  const { position, timeToShow, onClose, isOpen, message } = props;
  return (
    <Snackbar 
      anchorOrigin={position}
      open={isOpen}
      onClose={onClose}
      autoHideDuration={timeToShow}
      ContentProps={{
            'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

export default DefaultSnackbar;
