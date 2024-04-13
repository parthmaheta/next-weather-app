import { getIconUrl, WeatherEntry } from '@/app/_utils/api'
import { useTemperatureStore } from '@/app/_utils/store'
import { convertTemp } from '@/app/_utils/util'
import React, { useMemo } from 'react'
import { IoMdRainy } from 'react-icons/io'
import {  WiThermometer } from 'react-icons/wi'

type Props = {
    data:WeatherEntry
}

const ForecastCard = ({data}: Props) => {
  const {isKelvin}= useTemperatureStore();
  const currentTime = new Date(data.dt_txt).getHours();

  const { bgClass, textColor } = useMemo(() => {
    let bgClass = "";
    let textColor = "";
    if (currentTime >= 6 && currentTime < 12) {
      bgClass = "bg-morning";
      textColor = "text-morning-text";
    } else if (currentTime >= 12 && currentTime < 18) {
      bgClass = "bg-afternoon";
      textColor = "text-afternoon-text";
    } else if (currentTime >= 18 && currentTime < 21) {
      bgClass = "bg-evening";
      textColor = "text-evening-text";
    } else {
      bgClass = "bg-night";
      textColor = "text-night-text";
    }
    return { bgClass: bgClass, textColor: textColor };
  }, [currentTime]);
  


  return (
    <td className={`p-4 rounded-lg  ${bgClass} ${textColor} hover:opacity-70 -z-1`}>
         <img
        className="w-12 h-12 text-center ml-auto"
        src={getIconUrl(data.weather[0].icon)}
        alt="icon"
      />
        <div className='flex items-center'>
        <WiThermometer className="mr-4 text-primary-accent w-10 h-10" />
        <p>{convertTemp(isKelvin,data.main.temp)}</p>
        </div>
      
      <div className="text-sm">Min: {convertTemp(isKelvin,data.main.temp_min)} </div>
      <div className="text-sm"> Max: {convertTemp(isKelvin,data.main.temp_max)}</div>
      <div className="text-sm flex items-center">
        <IoMdRainy className="mr-2 text-primary-accent w-8 h-8 " />{" "}
        {data.weather[0].main}
      </div>
     
    </td>
  );

}

export default ForecastCard;