import { useQuery } from "@tanstack/react-query";
import { getCitySearch, getForcast, getWeather } from "../../API/api";

export function useWeatherQuery(coordinates) {
    return useQuery({
        queryKey:["weather",coordinates],
        queryFn:()=>
        (coordinates ? getWeather(coordinates):null),
        enabled:!!coordinates,
        staleTime:5*60*1000,
    })
}
export function useForecastQuery(coordinates){
    return useQuery({
        queryKey:["forecast",coordinates],
        queryFn:()=> (coordinates ? getForcast(coordinates) : null),
        enabled:!!coordinates,
        staleTime:2*60*1000,
    })
}
export const useLocationSearchQuery = (query) => {
    return useQuery({
        queryKey:["location",query],
        queryFn:()=>getCitySearch(query),
        enabled: query.length > 3,  
    })
}
