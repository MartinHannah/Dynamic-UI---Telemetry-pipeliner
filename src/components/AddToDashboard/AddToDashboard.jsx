import * as React from 'react';
import './AddToDashboard.scss';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import classNames from 'classnames';
//Components
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'; 
import List from '@material-ui/core/List';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import WidgetInfoItem from '../WidgetInfoItem/WidgetInfoItem';

import { modifyDashboardWidget } from '../../actions/views/actions';

class DashboardSettings extends React.Component{

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    render() {
      const { icon, currentView, modifyWidget } = this.props;
      const { open }  = this.state;
        return (
          <div>
            <Button onClick={() => this.handleOpen()}>
              <Icon className={classNames(icon, 'icon')} />
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={this.handleClose}
            >
              <div className="modal">
                <Typography variant="title" id="modal-title">
              Available Widgets
                </Typography>
                { (currentView.availableWidgets.length !== 0 ) ? (
                  <List>
                    {currentView.availableWidgets.map((widget) => <WidgetInfoItem key={widget.id} name={widget.name} info={widget.info} add={modifyWidget} id={widget.id} />)}
                  </List>
                  ) : 
                  <Typography> You have no available widgets!</Typography>
                }

              </div>
            </Modal>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    currentView: state.viewReducer.currentView
  }
}
const mapDispatchToProps = (dispatch) => {
  return { 
    modifyWidget: (widgetId, child, add) => { 
      dispatch(modifyDashboardWidget(widgetId, child, add));
    }
  }
}

DashboardSettings.propTypes = { 
  icon: PropTypes.string.isRequired,
  currentView: PropTypes.shape({
    id: PropTypes.string.isRequired,
    widgets: PropTypes.array.isRequired,
    availableWidgets: PropTypes.array.isRequired }).isRequired,
    modifyWidget: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettings);