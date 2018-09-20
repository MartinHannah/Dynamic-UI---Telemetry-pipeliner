import * as React from 'react';
import './DefaultComponent.css';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DefaultComponent extends React.Component{ 
    
    componentWillMount(){
    }

    render() {
      const { currentView } = this.props;
        return (
          <Grid container>
            {currentView.widgets.map((Widget, index) => <Widget key={index} />)}
          </Grid>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    currentView: state.viewReducer.currentView
  };
}

const mapDispatchToProps = () => {
  return { 

  }
}

DefaultComponent.propTypes = {
  currentView: PropTypes.shape.isRequired,
};

export default     connect(mapStateToProps, mapDispatchToProps)(DefaultComponent);