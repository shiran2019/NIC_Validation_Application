import * as React from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';


function Piechart( {userData}) {

const data = [
  { id: 0, value: userData.maleCount, label: 'Male', color :"#64e9b7" },
  { id: 1, value: userData.femaleCount, label: 'Female' , color :"#d764e9"  },
]


  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },

        },
      ]}
      sx={{
        [`& .${pieArcClasses.faded}`]: {
          fill: 'gray',
        },
      }}
      height={200}
    />
  );
}
export default Piechart;