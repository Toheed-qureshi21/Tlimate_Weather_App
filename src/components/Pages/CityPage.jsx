import React, { useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useForecastQuery, useWeatherQuery } from '../hooks/use-weatherQuery';
import LoadingSkeleton from '../UI/LoadingSkeleton';
import DaysForecast from '../UI/DaysForecast';
import DetailsWeather from '../UI/DetailsWeather';
import Chart from '../UI/Chart';
import LocationCard from '../UI/LocationCard';
import { LuRefreshCcw } from 'react-icons/lu';
import { OurContext } from '../Context/OurContext';
const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const {theme} = useContext(OurContext)
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  }


  if (weatherQuery.error || forecastQuery.error) {
      return <h1>Failed to fetch the city data</h1>
  }
  if (weatherQuery.isFetching || forecastQuery.isFetching || !params.cityName) {
      return <LoadingSkeleton/>
  }
  return (
    <section className={` px-[5rem] flex flex-col gap-2 max-sm:px-[2rem]  text-start`}>
      <div className='flex justify-between '>
        <h1 className="text-2xl font-medium max-sm:text-xl">Result Location: {weatherQuery.data.name}</h1>
        <button className={`px-2 py-2 rounded-md shadow-md ${theme === false ? "bg-zinc-950" : "bg-white"}`} onClick={handleRefresh}>
          <LuRefreshCcw className={`${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </button>
      </div>
      {
        (!weatherQuery.isFetching || !forecastQuery.isFetching) ?
          (
            <>
              <section className="flex flex-col gap-6 mt-4">
                <LocationCard data={weatherQuery.data} label={weatherQuery.data.name}/>
              <Chart forecast={forecastQuery.data} />
              </section>
              <section className="grid  w-full xl:grid-cols-2 gap-6 mx-auto ">
                <DetailsWeather weatherData={weatherQuery.data} />
                <DaysForecast forecast={forecastQuery.data} />
              </section>
            </>
          ) : (
            <LoadingSkeleton />
          )
      }
    </section>
  )
}

export default CityPage
