import * as React from 'react';
import * as moment from 'moment';

import { shortenNumber } from '../../utils/util';

type Props = { 
  payload: Object,
  x: number,
  y: number,
}

export const DayDateXAxis = (props: Props) => {
    const {payload, x, y } = props;
    let date = moment.unix(payload.value).format('Do');
    let day = moment.unix(payload.value).format('ddd');
    const textFill = (day == 'Sat' || day == 'Sun') ? '#EF5736' : '#000';
  
    return (
      <g>
        <text 
          x={x} 
          y={y - 12} 
          fill={textFill}
          textAnchor='middle'
          fontSize={11}
        >
          {day} 
        </text>
        <text 
          x={x} 
          y={y} 
          fill={textFill}
          textAnchor='middle'
          fontSize={11}
        >
          {date} 
        </text>
      </g>
    );
  };

  type PropsY = { 
  payload: Object,
  x: number,
  y: number,
  xPos: number
}

  export const FormatNumbersYAxis = (props: PropsY) => {
    const {payload, x, y, xPos} = props;
    const format = shortenNumber(payload.value, 1);
    return (
      <g>
        <text 
          x={x + xPos} 
          y={y} 
          fill='black'
          textAnchor='end'
          fontSize={11}
        >
          {format}
        </text>
      </g>
    );
  }
