"use client";
import {
  fetchWeatherData,
  getIconUrl,
  WeatherResponse,
} from "@/app/_utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ForecastWeather from "./ForecastWeather";
import Image from "next/image";
import {
  WiCloud,
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiThermometer,
} from "react-icons/wi";
import { IoArrowBack } from "react-icons/io5";
import {  FaWind } from "react-icons/fa";
import {FavoriteButton} from "./ToggleFavorite";
import { FaRegClock } from "react-icons/fa6";
import { useTemperatureStore } from "@/app/_utils/store";
import { convertTemp } from "@/app/_utils/util";
import { PiBinocularsBold } from "react-icons/pi";


export default function Page({ params }: { params: { city: string } }) {
  const searchParams = useSearchParams();
  const { isKelvin} = useTemperatureStore((state) => state);
  const lat = useMemo(() => {
    return searchParams.get("lat");
  }, [searchParams.get("lat")]);

  const long = useMemo(() => {
    return searchParams.get("long");
  }, [searchParams.get("long")]);

   const { data, error, isLoading } = useQuery({
    queryKey:["weather",lat,long],
    queryFn:()=>{
      return fetchWeatherData(lat,long)
    }

   })
  const router=useRouter();

  

  return (
    <div className="bg-primary-bg dark:bg-primary-dark rounded-lg shadow-xl py-4  mx-4 flex flex-col justify-between">
      {error&&<h1 className="text-center text-red-500 text-lg">Something Went Wrong While Fetching</h1>}      
            {isLoading&&<h1 className="text-center text-lg">Wait We Are Fetching Data</h1>}      
      {data && (
        <>
          <div className="flex justify-between w-full  mx-8 my-2">
            <button
              title="Go Back"
              className="p-4 rounded-full bg-primary-light dark:bg-primary-dark-light dark:text-primary-accent shadow-lg z-10 hover:opacity-60"
              onClick={() => {
                router.back();
              }}
            >
              <IoArrowBack />
            </button>
            <div className="font-semibold text-xl">Current Weather</div>
            <FavoriteButton
              city={decodeURIComponent(params.city) || ""}
              lat={lat}
              long={long}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-2 flex flex-col items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
                <FaRegClock className="text-primary-accent" />
                At:{new Date(data.dt).toLocaleTimeString()}
            </div>
              <p className="text-primary-dark dark:text-primary-light">
                Latitude: {data.coord.lat}, Longitude: {data.coord.lon}
              </p>
              <div className="flex items-center">
                <WiThermometer className="mr-4 text-primary-accent w-16 h-16  " />
                <p className="text-lg font-semibold">
                  Temperature: {convertTemp(isKelvin,data.main.temp)} 
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="">
                  High: {convertTemp(isKelvin,data.main.temp_max)} 
                </p>               
                <p className="">
                  Low: {convertTemp(isKelvin,data.main.temp_min)} 
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <p className="">Feels like:{convertTemp(isKelvin,data.main.feels_like)}</p>
                </div>
                <div className="flex items-center">
                  <p className="">Description: {data.weather[0].description}</p>
                </div>
                <img
                  className="w-25 h-25"
                  src={getIconUrl(data.weather[0].icon)}
                  alt="icon"
                />
              </div>
              
                <div>
              <div className="flex">
               
                  <div className="flex justify-center items-center gap-4">
                    {data.sys.country && (
                      <img
                        className="w-12 h-12"
                        src={`https://flagicons.lipis.dev/flags/4x3/${data.sys.country.toLowerCase()}.svg`}
                        alt="country flag"
                      />
                    )}
                    {data.name && (
                      <h1 className="text-lg font-semibold mb-2 text-primary-dark dark:text-primary-light">
                        {data.name}
                      </h1>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-16">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <WiSunrise className="mr-4 text-orange-400 w-10 h-10" />
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                  </div>
                  <h1 className="font-semibold text-lg">Sunrise</h1>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex">
                    <WiSunset className="mr-4 text-yellow-700 w-10 h-10" />
                    {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                  </div>
                  <h1 className="font-semibold text-lg">Sunset</h1>
                </div>
              </div>
            </div>
            <div className="bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-2 flex flex-col pt-4">
              <div className="text-lg text-center font-semibold my-2">
                Extra Info
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="w-80 h-auto m-auto bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div className="flex items-center">
                    <FaWind className="mr-4 text-primary-accent w-10 h-10" />
                    <p className="text-sm">
                      Pressure: {data.main.pressure} hPa
                    </p>
                  </div>
                </div>
                <div className="w-80 h-auto m-auto bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div className="flex items-center">
                    <WiHumidity className="mr-4 text-primary-accent w-16 h-16  " />
                    <p className="text-sm">Humidity: {data.main.humidity}%</p>
                  </div>
                </div>
                <div className="w-80 h-auto m-auto bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div className="flex items-center">
                    <WiStrongWind className="mr-4 text-primary-accent w-16 h-16  " />
                    <p className="text-sm">Wind Speed: {data.wind.speed} m/s</p>
                  </div>
                </div>
                <div className="w-80 h-auto m-auto bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div className="flex items-center">
                    <WiRaindrop className="mr-4 text-primary-accent w-16 h-16  " />
                    <p className="text-sm">
                      Rain (1h): {data.rain ? data.rain["1h"] : 0} mm
                    </p>
                  </div>
                </div>
                <div className="w-80 h-auto m-auto bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div className="flex items-center">
                    <WiCloud className="mr-4 text-primary-accent w-16 h-16  " />
                    <p className="text-sm">Cloudiness: {data.clouds.all}%</p>
                  </div>
                </div>
                <div className="w-80 h-auto m-auto bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div className="flex items-center">
                    <PiBinocularsBold className="mr-4 text-primary-accent w-12 h-12" />
                    <p className="text-sm">
                      Visibility: {data.visibility} meters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ForecastWeather lat={lat} long={long} />
    </div>
  );
}
