import * as React from 'react';
import './DefaultComponent.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as shortid from 'shortid';
//Components
import Grid from '@material-ui/core/Grid';

const DefaultComponent = ({ currentView }) => { 
    return (
      <Grid container>
        {currentView.widgets.map((widget) => <widget.widget.component key={shortid.generate()} {...widget} />)}
      </Grid>
    );
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
  currentView: PropTypes.shape({
    id: PropTypes.string.isRequired,
    widgets: PropTypes.array.isRequired }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultComponent);