import * as React from 'react';
import * as moment from 'moment';
import './CustomChartTooltips.scss';
import { shortenNumber } from '../../utils/util';

type Props = { 
  payload: Object,
  label: string,
  active: boolean
}

export const EnergyCostTooltip = (props: Props) => { 
  const {payload, label, active} = props;
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


export default EnergyCostTooltip;