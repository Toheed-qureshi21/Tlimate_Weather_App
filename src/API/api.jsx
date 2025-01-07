import axios from "axios"
const api = axios.create({
    baseURL:"https://api.openweathermap.org/data/2.5",
});
export const getWeather = async(coordinates) => {
            const response = await api.get(`/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
            return response.status === 200 ? response.data : {};
}
export const getForcast = async(coordinates)=>{
    try {
        const response = await api.get(`/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
         return response.status === 200 ? response.data : {}
    } catch (error) {
       throw new Error("Getting error while fetching forecast");
        
    }
}
export const getCitySearch = async(city) => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=4&appid=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data;
}
