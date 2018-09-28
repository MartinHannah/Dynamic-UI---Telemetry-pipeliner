import * as React from 'react';
import * as moment from 'moment';
import PropTypes from 'prop-types'; 

import { shortenNumber } from '../../utils/util';


export const DayDateXAxis = ({payload, x, y }) => {
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

  DayDateXAxis.propTypes = { 
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    payload: PropTypes.shape.isRequired,
  }

  export const FormatNumbersYAxis = ({payload, x, y, xPos}) => {
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
  
  FormatNumbersYAxis.propTypes = {
    xPos: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    payload: PropTypes.isRequired,
  }