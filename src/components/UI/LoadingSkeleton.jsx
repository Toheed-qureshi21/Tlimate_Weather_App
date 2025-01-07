import React, { memo, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { OurContext } from '../Context/OurContext'
const LoadingSkeleton = () => {
  const { theme } = useContext(OurContext);
  
  return (

    <div className="space-y-6 my-4 mx-[5rem]">
      <div className="grid gap-6">
        <Skeleton className={`h-[20rem] w-full rounded-lg `} baseColor={theme === false ? "black" : undefined} 
          highlightColor={theme === false ? "#374151" : undefined} /> 
        <Skeleton className={`h-[20rem] w-full rounded-lg `} baseColor={theme === false ? "black" : undefined}  
          highlightColor={theme === false ? "#374151" : undefined} />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className={`h-[20rem] w-full rounded-lg `} baseColor={theme === false ? "black" : undefined} 
            highlightColor={theme === false ? "black" : undefined} />
          <Skeleton className={`h-[20rem] w-full rounded-lg `} baseColor={theme === false ? "black" : undefined} 
            highlightColor={theme === false ? "#374151" : undefined} />
        </div>
      </div>
    </div>

  )
}

export default memo(LoadingSkeleton)
