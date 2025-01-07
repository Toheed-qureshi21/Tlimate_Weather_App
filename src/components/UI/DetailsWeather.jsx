import React, { useContext } from 'react'
import { OurContext } from '../Context/OurContext'
import { format } from 'date-fns';
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa";
import { BiTachometer } from "react-icons/bi";
const DetailsWeather = ({ weatherData }) => {
    const { theme } = useContext(OurContext)

    // Format time using date-fns
    const formatTime = (timestamp) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    };
    const getWindDirection = (deg) => {
      const directionsArray = ["N","NE","E","SE","S","SW","W","NW"];
      const index = Math.round(((deg %= 360)<0 ? deg+360: deg)/45)%8;
      return directionsArray[index];
    }
    

    return (
        <section className={`mt-5 h-fit sm:px-[1rem]  px-4 shadow-2xl rounded-lg ${theme===false?"bg-zinc-950 text-white": "bg-white text-zinc-950"} `}>
            <div className=' py-8 w-full flex flex-col gap-6'>
                <h3 className='font-bold text-lg'>Weather Details</h3>
                <div className='grid sm:grid-cols-2 gap-6 items-start'>
                    <div className='border border-1 h-[5rem] rounded-lg  '>
                        <div className='px-4 flex gap-2 h-[5rem] items-center'>

                            <FiSunrise className='text-xl text-yellow-500' />
                            <div className='flex flex-col'>
                                <p>Sunrise</p>
                                <p>{formatTime(weatherData.sys.sunrise)}</p>
                            </div>
                        </div>

                    </div>
                    <div className='w-full border border-1 h-[5rem] rounded-lg'>
                        <div className='px-4 flex gap-2 h-full items-center'>

                            <FiSunset  className='text-xl text-pink-800' />
                            <div className='flex flex-col'>
                                <p>Sunset</p>
                                <p>{formatTime(weatherData.sys.sunset)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border border-1 h-[5rem] rounded-lg'>
                        <div className='px-4 flex gap-2 h-full items-center'>

                            <FaRegCompass className='text-xl text-green-700' />
                            <div className='flex flex-col'>
                                <p>Wind Direction</p>
                                <p>{getWindDirection(weatherData.wind.deg)} ({weatherData.wind.deg}°)</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border border-1 h-[5rem] rounded-lg'>
                        <div className='px-4 flex gap-2 h-full items-center'>

                            <BiTachometer  className='text-xl text-amber-500' />
                            <div className='flex flex-col'>
                                <p>Pressure</p>
                                <p>{weatherData.main.pressure}hPa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailsWeather
