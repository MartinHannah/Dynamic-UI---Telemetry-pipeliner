import * as React from 'react';
import PropTypes from 'prop-types'; 
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
//import classNames from 'classnames';
import compose from 'recompose/compose';

const styles = ({
  card: { 
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
  }
});

function Building({classes }) {
    return (
      <Grid item xs={12} className={classes.graph}>
        <h1>
          Building
        </h1>
      </Grid>
    );
}

Building.propTypes = {
    classes: PropTypes.isRequired
}
export default compose(
  withStyles(styles, {withTheme: true})
)(Building);