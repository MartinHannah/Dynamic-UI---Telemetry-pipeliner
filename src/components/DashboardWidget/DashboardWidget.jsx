import * as React from 'react';
import './DashboardWidget.scss';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
//Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as components from '../../utils/views';


import { modifyDashboardWidget } from '../../actions/views/actions';

class DashboardWidget extends React.Component { 
    state = {
        anchorEl: null,
      };
    
      handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

    render(){ 
        const { widget, modifyWidget, ...other } = this.props;
        const { anchorEl } = this.state;
        const Component = components[widget.innerComponent];
        return (
          <Grid container className="dashboard-widget">
            <Paper>
              <Grid 
                container
                justify='space-between'
                className="widget-header"
              >
                <Typography variant="title" className='widget-title'>
                  {widget.name}
                </Typography>
                <IconButton
                  className='icon-button'
                  aria-owns={anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => this.handleClose(widget.id)}
                >
                  <MenuItem onClick={() => modifyWidget('Dashboard', widget.id, false)}>Remove from Dashboard</MenuItem>
                </Menu>
              </Grid>
              <Grid item>
                <Component widget={widget} {...other} />
              </Grid>
            </Paper>
          </Grid>
        );
    }
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
      modifyWidget: (widgetId, child, add) => { 
        dispatch(modifyDashboardWidget(widgetId, child, add));
      }
    }
  }


DashboardWidget.propTypes = { 
    widget: PropTypes.shape({
      name: PropTypes.string.isRequired,
      innerComponent: PropTypes.node.isRequired, 
      id: PropTypes.string.isRequired,
    }).isRequired,
    modifyWidget: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWidget);