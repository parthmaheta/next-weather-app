"use client";
import React, { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Toaster from './Toaster';

export const LocationButton = () => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,()=>setHasError(true));
    } else {
      setHasError(true);
    }
  };

  const showPosition = (position: GeolocationPosition) => {
    router.push(`/yourcity?lat=${position.coords.latitude}&long=${position.coords.longitude}`);
  };



  return (<>{hasError && <Toaster message={"Can't Get Your Location."} callBack={() => setHasError(false)} />}<button onClick={getLocation} className="p-4 rounded-full bg-primary-light dark:bg-primary-dark-light mx-2 dark:text-primary-accent shadow-lg z-10 hover:opacity-60" title="Show Current Location"><IoLocationOutline className='scale-150' /> </button></>);
};
