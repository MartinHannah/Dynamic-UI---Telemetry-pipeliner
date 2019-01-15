import * as React from 'react'; 

//Components
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts';
import { FormatNumbersYAxis, DayDateXAxis } from '../CustomChartTicks/CustomChartTicks';
import { EnergyCostTooltip } from '../CustomChartTooltips/CustomChartTooltips';

type Props = { 
  options: Object,
  data: Object
}

const AreaOnlyChart = (props: Props) => {
  const {options, data} = props;
    return ( 
      <ResponsiveContainer
        className="area-chart"
      >
        <AreaChart
          data={data}
        >
          <CartesianGrid stroke="rgba(243, 108, 3, 0.7)" vertical={false} strokeWidth={0.2} />
          <XAxis interval={0} dataKey={options.xAxisDataKey} orientation='top' tickLine={false} axisLine={false} tick={<DayDateXAxis />} />
          <YAxis orientation="right" axisLine={false} tickLine={false} tick={<FormatNumbersYAxis xPos={25} />} />
          <Tooltip isAnimationActive={false} content={<EnergyCostTooltip />}  />
          <Area type='monotone' dataKey={options.dataKey} stroke='#F47545' fill='#EF5736' />
        </AreaChart>
      </ResponsiveContainer>
    );
}

export default AreaOnlyChart;