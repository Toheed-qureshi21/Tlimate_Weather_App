import { useEffect, useState } from "react"

export const useGeoLocation = () => {
  const [locationData,set] = useState({
    coordinates:null,
    error:null,
    isLoading:true
  })


const getLocation = () => {
    set((prev)=>({...prev,isLoading:true,error:null}));
    if (!navigator.geolocation) {
        set({
            coordinates:null,
            error: "Geolocation is not supported by your browser",
            isLoading:false
        });
        return
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        set({
            coordinates:{
                lat:position.coords.latitude,
                lon:position.coords.longitude,
            },
            error:null,
            isLoading:false,
        });
    },
    (error)=>{
        let errorMessage = ""
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "Location permission denied. Please enable it and then click on Enable location button.";
                break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable"
                    break;
                    case error.TIMEOUT:
                        errorMessage = "Location request time out"
        
            default:
                errorMessage = "An unknown error occured"
        }
        set({
            coordinates:null,
            error:errorMessage,
            isLoading:false,
        });
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0,
    }

)

}
useEffect(()=>{
    getLocation();
},[])

return {
    ...locationData,
    getLocation,  //Because we want to refresh using refresh  button
}
}