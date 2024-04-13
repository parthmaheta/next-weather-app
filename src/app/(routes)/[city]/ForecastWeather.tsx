"use client";
import {
  fetchForecastData,
  WeatherEntry,
} from "@/app/_utils/api";
import { useQuery } from "@tanstack/react-query";
import ForecastCard from "./ForecastCard";
import {  useMemo } from "react";

type Props = {
  lat: number;
  long: number;
};

export default function Page({ lat, long }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["forecast", lat, long],
    queryFn: () => {
      return fetchForecastData(lat, long);
    },
  });

  //  group data by  date and cache it
  const ForecastsByDate = useMemo(() => {
    const groupBydate: { [key: string]: JSX.Element[] } = {};

    data?.list?.forEach((entry: WeatherEntry, index: number) => {
      const date = new Date(entry.dt_txt);
      const uniqueKey =
        date.getDate() +
        " " +
        date.toLocaleString("default", { month: "short" });
      if (groupBydate[uniqueKey])
        groupBydate[uniqueKey].push(<ForecastCard key={index} data={entry} />);
      else groupBydate[uniqueKey] = [<ForecastCard key={index} data={entry} />];
    });
    
    //fill empty columns for every row
    Object.keys(groupBydate).forEach((key, index) => {
      //Fill Empty Columns
      let i = groupBydate[key].length;
      if (index == 0) {
        while (i < 8) {
          groupBydate[key].unshift(<td key={index+i}></td>);
          i++;
        }
      }

      //Add First Element As Date Which Will Be Rendered As First Column In ForeCast Table
      groupBydate[key].unshift(
        <td className="p-4 rounded-lg text-nowrap relative hover:opacity-70" key={Date.now()}>
          {key}
        </td>
      );
    });

    return groupBydate;
  }, [data]);

  console.log(ForecastsByDate);

  return (
    <>
      <h1 className="text-xl text-center font-semibold my-4">Forecast</h1>
      {error && <h1 className="text-center text-red-500 text-lg">Something Went Wrong While Fetching</h1>}
      {isLoading && <h1 className="text-center text-lg">Wait We Are Fetching Data</h1>}

      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-2 border-slate-500">
            <thead className="">
              <tr className="shadow-lg">
                {[
                  "Date",
                  "12 AM",
                  "03 AM",
                  "06 AM",
                  "09 AM",
                  "12 PM",
                  "03 PM",
                  "06 PM",
                  "09 PM",
                ].map((val) => (
                  <th key={val}>{val}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {Object.keys(ForecastsByDate).map((date: string) => {
                return (
                  <tr key={date} className="">
                    {ForecastsByDate[date]}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
