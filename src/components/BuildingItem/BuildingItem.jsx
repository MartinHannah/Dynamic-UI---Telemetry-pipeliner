import * as React from 'react';
import PropTypes from 'prop-types';
import './BuildingItem.scss';
//Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Business from '@material-ui/icons/Business';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';


function BuildingItem({name, isCommercial}) {
    return (
      <Grid item xs={4}>
        <Paper className="building-item">
          <Grid 
            container
            justify='space-between'
          >
            <Typography variant="title">{name}</Typography>
            <IconButton
              className='icon-button'
            >
              <Edit />
            </IconButton>
          </Grid>
          <Grid 
            container
            justify='center'
            className='overview'
          >
            { isCommercial ? <Business className='building-type-icon' /> : <Home className='building-type-icon' />}
          </Grid>
        </Paper>
      </Grid>
    );
}

BuildingItem.propTypes = { 
  name: PropTypes.string.isRequired,
  isCommercial: PropTypes.bool.isRequired,
}

export default BuildingItem;