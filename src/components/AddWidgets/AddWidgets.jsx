import * as React from 'react';
import './AddWidgets.scss'; 
import { connect } from 'react-redux';
import * as shortid from 'shortid';
//Components
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import WidgetInfoItem from '../WidgetInfoItem/WidgetInfoItem';

//import { modifyDashboardWidget } from '../../actions/views/actions';

type Props = { 
  widget: Object,
  currentView: Object
}

class AddWidgets extends React.Component<Props> {

  constructor(props) { 
    super(props)

    this.state = {
      open: false,
    };
  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateOptions = (id, options) => { 
    options.id = shortid.generate();
    const { modifyWidget } = this.props;
    modifyWidget('Dashboard', id, true, options);
  }

  render() {
    const { currentView } = this.props;
    const { open }  = this.state;
      return (
        <div>
          <Button variant="fab" color="primary" aria-label="Add" onClick={() => this.handleOpen()}>
            <AddIcon />
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
                  {currentView.availableWidgets.map((widget) => <WidgetInfoItem key={shortid.generate()} name={widget.name} info={widget.info} add={this.updateOptions} id={widget.id} {...widget} />)}
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
const mapDispatchToProps = () => {
  return { 
    modifyWidget: (widgetId, child, add, childOptions) => { 
      console.log(widgetId, child, add, childOptions);
      // dispatch(modifyDashboardWidget(widgetId, child, add, childOptions));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgets);