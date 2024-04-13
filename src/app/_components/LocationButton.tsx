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
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setHasError(true);
    }
  };

  const showPosition = (position: Geolocation) => {
    router.push(`/yourcity?lat=${position.coords.latitude}&long=${position.coords.longitude}`);
    console.log(position, "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
  };



  return (<>{hasError && <Toaster message={"Geolocation is not supported by this browser."} callBack={() => setHasError(false)} />}<button onClick={getLocation} className="p-4 rounded-full bg-primary-light dark:bg-primary-dark-light mx-2 dark:text-primary-accent shadow-lg z-10 hover:opacity-60" title="Show Current Location"><IoLocationOutline className='scale-150' /> </button></>);
};
