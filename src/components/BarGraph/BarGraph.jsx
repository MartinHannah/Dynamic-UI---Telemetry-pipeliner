import * as React from 'react';
import PropTypes from 'prop-types'; 
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
//import classNames from 'classnames';
import compose from 'recompose/compose';

const styles = ({
  graph: { 
    backgroundColor: '#ccc',
    textAlign: 'center'
  }
});

function BarGraph({ name, classes }) {
    return (
      <Grid item xs={12} className={classes.graph}>
        <h1>
          Bar Graph 
          {name}
        </h1>
      </Grid>
    );
}

BarGraph.propTypes = {
    name: PropTypes.string.isRequired,
    classes: PropTypes.isRequired
}
export default compose(
  withStyles(styles, {withTheme: true})
)(BarGraph);