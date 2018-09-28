import * as React from 'react';
import * as moment from 'moment';
import './CustomChartTooltips.scss';
import PropTypes from 'prop-types'; 
import { shortenNumber } from '../../utils/util';

export const EnergyCostTooltip = ({payload, label, active}) => { 
    if(active) { 
      const time = moment.unix(label).format('ddd Do');
      const energy = shortenNumber(payload[0].payload.energy, 3);
      const cost = parseFloat(Math.round(payload[0].payload.cost * 100) / 100).toFixed(2);
  
      return (
        <div className='tooltip'>
          <p className="data-type">{payload[0].name}</p>
          <p>{`${time} : ${energy}`}</p>
          <p>{`Cost : $${cost}`}</p>
        </div>
      );
    }
    return null;
  }
  
EnergyCostTooltip.propTypes = { 
    payload: PropTypes.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}

export default EnergyCostTooltip;