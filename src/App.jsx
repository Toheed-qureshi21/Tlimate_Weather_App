import React from 'react'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/UI/Layout/AppLayout'
import WeatherDashboard from './components/Pages/WeatherDashboard'
import CityPage from './components/Pages/CityPage'
import { OurContextProvider } from './components/Context/OurContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      children:[
        {
          path:"/",
          element:<WeatherDashboard/>,
        },
        {
          path:"/city/:cityName",
          element:<CityPage/>
        }
      ]

    }
  ]);
  const queryclient = new QueryClient({
    defaultOptions:{
      staleTime:5*60*1000,
      gcTime:10*60*1000,
      retry:false,
      refetchOnWindowFocus:false,
    },
  },);
   
  return (
    <QueryClientProvider client={queryclient}>
    <OurContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </OurContextProvider>
    </QueryClientProvider>
  )
}

export default App
