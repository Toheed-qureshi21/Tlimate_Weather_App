import React, { memo, useContext } from 'react'
import { OurContext } from '../Context/OurContext'
import { format } from "date-fns";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
const Chart = ({forecast}) => {
    const {theme} = useContext(OurContext);
    const chartData = forecast?.list?.slice(0, 8) 
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));
  return (
   
    <div className={`mt-5 sm:px-[1rem] px-1 shadow-2xl rounded-lg ${theme===false?"bg-zinc-950 text-white": "bg-white text-zinc-950"} `}>
        <div className='h-[20rem] w-full py-8 flex flex-col gap-2'>
            <h3 className='text-2xl tracking-tighter px-8'>Today 's Temprature</h3>
       <ResponsiveContainer height={"100%"} width={"100%"}>
            <LineChart data={chartData}>
                    <XAxis dataKey="time" tickLine={false} axisLine={false} className='text-[0.8rem] sm:text-md '/>
                        <YAxis  tickLine={false} axisLine={false} tickFormatter={(value) => `${value}°`} />
                        <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background sm:p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
                        <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>    
       </ResponsiveContainer>
        </div>
    </div>)
  
}


export default memo(Chart);
