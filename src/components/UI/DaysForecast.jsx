import React, { useContext } from 'react'
import { OurContext } from '../Context/OurContext';
import { format } from 'date-fns';
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { LuDroplets } from "react-icons/lu";
import { BsWind } from "react-icons/bs";

const DaysForecast = ({forecast}) => {
    const {theme} = useContext(OurContext);
    // Group forecast by day and get daily min/max
    const dailydata = forecast.list.reduce((acc,curr)=>{
        const date = format(new Date(curr.dt * 1000),"yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = {
            temp_min: curr.main.temp_min,
            temp_max: curr.main.temp_max,
            humidity: curr.main.humidity,
            wind: curr.wind.speed,
            weather: curr.weather[0],
            date: curr.dt,
          };
        } else {
          acc[date].temp_min = Math.min(acc[date].temp_min, curr.main.temp_min);
          acc[date].temp_max = Math.max(acc[date].temp_max, curr.main.temp_max);
        }
    
        
        return acc;
    },{});
    const nextDays = Object.values(dailydata).slice(0,6);
  
  return ( 
    <seciton className={`mt-5 sm:px-[1rem]  px-4 shadow-2xl rounded-lg ${theme===false?"bg-zinc-950 text-white": "bg-white text-zinc-950"} `}>
    <div className=' min-h-[20rem] h-auto w-full py-8 flex flex-col gap-6'>
            <h3 className='font-bold text-lg'>Days Forecast</h3>
            <div className='flex flex-col gap-6 max-sm:items-center'>
              {nextDays.map((curr)=>{
                return (
                  <div key={curr} className='h-fit py-4 w-full gap-4 max-sm:w-fit max-sm:px-8 border-2 rounded-lg grid  lg:grid-cols-3 lg:place-content-center max-lg:place-items-center max-md:gap-3 max-2xl:pr-16'>
                    <div className='flex flex-col lg:ml-4 2xl:ml-5'>
                      <p> {format(new Date(curr.date * 1000), "EEE, MMM d")}</p>
                      <p className='capitalize text-md text-gray-500'>{curr.weather.description}</p>
                    </div>
                    <div id='min-max-temp' className='flex gap-6 items-center ml-5'>
                      <span className='flex gap-2 text-cyan-400'>
                        <FaArrowDown />
                        {curr.temp_min}°C
                      </span>
                      <span className='flex gap-2 text-yellow-600'>
                        <FaArrowUp />
                        {curr.temp_max}°C
                      </span>
                    </div>
                    <div id='humidity-wind' className='flex gap-8 ml-10'>
                      <span className='flex gap-2 items-center'>
                          <LuDroplets className="text-cyan-400"/>
                          {curr.humidity}%
                      </span>
                      <span className='flex gap-2 items-center'>
                          <BsWind  className="text-cyan-400"/>
                          {curr.wind}m/s
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
    </div>
</seciton>
  )
}

export default DaysForecast
