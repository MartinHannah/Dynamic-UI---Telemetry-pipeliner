import * as React from 'react';
import './DefaultModal.scss';
import Modal from '@material-ui/core/Modal';

type Props = { 
  children: any,
  open: boolean,
  close: Function,
  enableBackdropClick: boolean
}

const DefaultModal = (props: Props) => { 
  const { children, open, close, enableBackdropClick } = props;
  return (
    <Modal
      className='modal-outer'
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={close}
      disableBackdropClick={enableBackdropClick}
    >
      <div
        className='modal-inner'
      >
        {children}
      </div>
    </Modal>
  );
}

export default DefaultModal;