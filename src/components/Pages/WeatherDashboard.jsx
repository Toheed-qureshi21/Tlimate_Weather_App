import { memo, useContext } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { useGeoLocation } from "../hooks/useGeoLocation";

import { OurContext } from "../Context/OurContext";
import Chart from "../UI/Chart";
import { useForecastQuery, useWeatherQuery } from "../hooks/use-weatherQuery";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import DetailsWeather from "../UI/DetailsWeather";
import DaysForecast from "../UI/DaysForecast";
import LocationCard from "../UI/LocationCard";
const WeatherDashboard = () => {

  const { coordinates, error: locationErr, isLoading: locationLoading, getLocation } = useGeoLocation();
  const { theme } = useContext(OurContext)
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const { data } = weatherQuery;
  const { data: forecast } = forecastQuery;


 
  
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  }



  if (locationErr || weatherQuery.error) {
    return (
      <div className="bg-red-100 border mx-12 border-red-400 text-red-700 px-4 py-3 rounded relative flex flex-col gap-2 items-start " role="alert">
  <strong className="font-bold">Location Error</strong>
  <p className="block sm:inline">{locationErr || weatherQuery.error.message}</p>
   <button onClick={getLocation} className="px-2 py-2 bg-white  border rounded-md hover:text-black transition-all ease-linear">Enable Location </button>
  </div>
    )
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }
  return (
    <section className={` px-[5rem] flex flex-col gap-2 max-sm:px-[1rem]  text-start`}>
      <div className='flex justify-between'>
        <h2 className="text-2xl font-medium">My Location</h2>
        <button className={`px-2 py-2 rounded-md shadow-md ${theme === false ? "bg-zinc-950" : "bg-white"}`} onClick={handleRefresh}>
          <LuRefreshCcw className={`${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </button>
      </div>
      {
        (!weatherQuery.isFetching || !forecastQuery.isFetching) ?
          (
            <>
              <section className="grid xl:grid-cols-2 gap-6 mt-4">
                <LocationCard data={data} />
                <Chart forecast={forecast} />
              </section>
              <section className="grid  w-full xl:grid-cols-2 gap-6 mx-auto ">
                <DetailsWeather weatherData={weatherQuery.data} />
                <DaysForecast forecast={forecast} />
              </section>
            </>
          ) : (
            <LoadingSkeleton />
          )
      }
    </section>
  )
}

export default memo(WeatherDashboard);
