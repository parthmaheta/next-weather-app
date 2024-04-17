import React, {  useEffect, useMemo, useState } from "react";
import { fetchAllCities, Fields, Record } from "../_utils/api";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Table from "./Table";
import { useInView } from "react-intersection-observer";

type Props = {};
export type filterType={
  id:string,
  value:string|number;
}

function CitiesTable({}: Props) {
  const { ref, inView, entry } = useInView({});
  const [rows,setRows] = useState<Fields[]>([]);
  const [columnFilters, setColumnFilters] = useState<filterType[]>([]);
  const { data, error, isLoading,fetchNextPage,isFetchingNextPage } = useInfiniteQuery({
    initialPageParam:0,
    queryKey:["cities"],
    queryFn: ({ pageParam = 0 }) => {
      return fetchAllCities(pageParam);
    },
    getNextPageParam:(lastPage,allPages,lastPageParam)=>lastPageParam+1,
    
  });

  const queryClient=useQueryClient();
 
 useEffect(() => {
  let rowFields:Fields[]=[];
    data?.pages.forEach(page=>page.records.forEach(record=>{   
    
    rowFields.push(record.fields)}))      
  setRows(rowFields)
  },  [data,isFetchingNextPage])

  useEffect(()=>{
   if(inView&&!isFetchingNextPage&&columnFilters.length===0)
    fetchNextPage()

  },[inView,columnFilters.length,fetchNextPage,isFetchingNextPage])


  
  
        
  return (
    <>
      {isLoading && <h1 className="text-center text-lg">Wait We ARe Fetching</h1>}
      {error && <h1 className="text-red-600 text-center text-lg">Something Went wrong</h1>}
      {data&&rows.length>0 && <Table data={rows} ref={ref} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />}
      {isFetchingNextPage&&
        <div className="text-red-500 text-2xl">Loading more...</div>}
      
    </>
  );
}

export default CitiesTable;
