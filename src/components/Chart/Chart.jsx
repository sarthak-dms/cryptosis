import React from 'react'
import {Line} from 'react-chartjs-2';
import {Chart as ChartJs} from 'chart.js'

// ChartJs.register(CategoryScale, LinearScale,PointElement,LineElement,Title,ToolTip,Legend);

const Chart = () => {
    
    const prices = [1,3,5];
    const date = ["12/4/22","14/4/22","15/4/22"];
    
    // const data={};
    
  return (
    <div>
        sadfasf
        {/* <Line 
            options={{
                responsive:true,
            }}
            data={{
                labels:date,
                datasets:[{
                    label:`Price in ${currency}`,
                    data:prices,
                    borderColor:"rgb(255,99,132)",
                    backgroundColor:"rgba(255,99,132,0.5)",
                }]
            }}
        /> */}
    </div>
  )
}

export default Chart
