import React, { useContext, useState } from 'react'
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import { BsWind } from "react-icons/bs";
import { OurContext } from '../Context/OurContext';
const LocationCard = ({data}) => {

    const {theme} = useContext(OurContext);


  return (
    <section className={`mt-5 px-[1rem] max-sm:px-16 pb-12 max-sm:py-4  max-md:h-auto shadow-2xl grid grid-cols-2 max-sm:gap-2 md:gap-36 max-md:grid-cols-1  max-md:place-items-center rounded-lg ${theme===false?"bg-zinc-950 ": "bg-white"} `}>
    <div id="inner-of-first" className="mt-8 ml-4 max-sm:px-4 ">
      <h2 className="text-4xl text-bold">{data?.name}</h2>
      <p className="text-slate-500">{data?.sys?.country}</p>
      <div id="temp-description" className="flex sm:gap-12 gap-8 items-center  mt-4 mb-3 break-words">
          <strong className="text-5xl text-bold max-sm:text-3xl">
          {data?.main?.temp}°C
          </strong>
          <div >
            <p className="flex items-center text-sm">
            Feels like {" "} 
             {data?.main?.feels_like}°C
            </p>
            <div className="flex gap-2 items-center">
            <p className="flex items-center"><FaArrowDown />{data?.main?.temp_min}</p>
            <p className="flex items-center"><FaArrowUp />{data?.main?.temp_max}</p>
            </div>
            </div>
      </div>
      <div id="humidity-wind" className="flex gap-12">
        <div className="flex items-center">
          <div>
          <GiWaterDrop className="text-cyan-400"/>
          </div>
          <div>
            <p>Humidity</p>
            <p>{data?.main?.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <div>
          <BsWind  className="text-cyan-400"/>
          </div>
          <div>
            <p>Wind</p>
            <p>{data?.wind?.speed} m/s</p>
          </div>
        </div>

      </div>
    </div>
    { 
          data?.weather &&
  (    <div id="inner-of-second " className="relative h-full w-full aspect-square max-w-[12.5rem] flex justify-center items-center flex-col  ">
        <img className={`${theme===false ? "text-white":"text-black"}  h-[15rem] w-[15rem] object-contain max-md:text-center`} src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`} alt="Weather image" />
        <div className="absolute bottom-[2rem] max-sm:bottom-2">
          <p>{data?.weather[0]?.main}</p>
        </div>
    </div>)
    }
</section>
  )
}

export default LocationCard
