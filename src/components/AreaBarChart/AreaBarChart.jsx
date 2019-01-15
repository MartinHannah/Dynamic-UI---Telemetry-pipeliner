import * as React from 'react';
import './AreaBarChart.scss';

//Components
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Area, Bar } from 'recharts';
import { FormatNumbersYAxis, DayDateXAxis } from '../CustomChartTicks/CustomChartTicks';
import { EnergyCostTooltip } from '../CustomChartTooltips/CustomChartTooltips';


type Props = {
  /** Available configurations for the area bar chart */
  options: Object,
  /** The data that the chart will use to read information */
  data: Object
}

/**
  * Component to render a chart that displays both area and bars.
 */
const AreaBarChart = (props: Props) => { 
  const { data, options } = props;
  return (
    <ResponsiveContainer 
      className="area-bar-chart" 
    >
      <ComposedChart
        data={data}
      >
        <XAxis interval={0} className='x-axis' dataKey={options.xAxisDataKey} orientation='top' tickLine={false} axisLine={false} tick={<DayDateXAxis />} />
        <YAxis orientation="right" axisLine={false} tickLine={false} tick={<FormatNumbersYAxis xPos={15} />} />
        <Tooltip isAnimationActive={false} content={<EnergyCostTooltip />} />
        <CartesianGrid stroke="rgba(243, 108, 3, 0.7)" vertical={false} strokeWidth={0.2} />
        <Area className='area' type='monotone' dataKey={options.dataKey} fill='#29A5A5' stroke='#fff' />
        <Bar dataKey={options.dataKey} barSize={20} fill='#EF5736' />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default AreaBarChart;