import * as React from 'react';
import './WidgetInfoItem.scss';
import PropTypes from 'prop-types'; 
//Components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const WidgetInfoItem = ({ name, info, add, id }) => {
    return (
      <Button className="available-widget" onClick={() => add('Dashboard', id)}>
        <Grid 
          container
          justify="space-between"
        >
          <Grid item xs={12}><Typography variant="subheading">{name}</Typography></Grid>
          <Grid item xs={12}><Typography variant="body1">{info}</Typography></Grid>
        </Grid>
      </Button>
    );    
}

WidgetInfoItem.propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    add: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}
export default WidgetInfoItem;