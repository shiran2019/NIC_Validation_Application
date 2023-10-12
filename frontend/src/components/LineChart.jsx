import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


  const Linechart = (userData) => {

    const seriesA = {
      data: [
        userData.userData.level1MaleCount,
        userData.userData.level2MaleCount,
        userData.userData.level3MaleCount
      ],
      label: 'Male',
    };
    const seriesB = {
      data: [
      userData.userData.level1FemaleCount,
      userData.userData.level2FemaleCount,
      userData.userData.level3FemaleCount,
      ],
      label: 'Female',
    };
   
    return (
      <>

      <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: ["18 - 30", "30 - 50", "50+"],
        },
      ]}
        width={600}
        height={300}
        series={[
          { ...seriesA, stack: 'total' ,color: "#64e9b7" },
          { ...seriesB, stack: 'total', color: "#d764e9" },
        ]}
      />
       <p style={{marginLeft:"3%"}}>
          {" "}
          User Male / Febale counts based on their age groups
        </p>
      </>

    );
  }
export default Linechart;

