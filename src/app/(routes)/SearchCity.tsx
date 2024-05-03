import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { fetchCity } from "../_utils/api";
import { useRouter } from "next/navigation";
import { useThemeStore } from "../_utils/store";

type Props = {};
type SearchResult={
  name:string;
  lat:number;
  long:number;
  displayText:string;
  id:number;
}

const SearchCity = (props: Props) => {
  const {isDarkTheme} =useThemeStore()
  const [searchResults,setSearchResults]=useState<Array<SearchResult>>([]);
  const [searchString,setSearchString]=useState("");
  const {data,isLoading,error}=useQuery({
    queryKey:["search",searchString],
    queryFn:()=>{
      return fetchCity(searchString)
    },

  })

  const router=useRouter()

  useEffect(() => {
   if(Array.isArray(data?.records)&&data?.records.length>0){
         let items:Array<SearchResult>=[];
         data.records.forEach((record,index)=>{
           items.push({
            id:index,
            name:record.fields.name,
            long:record.geometry.coordinates[0],
            lat:record.geometry.coordinates[1],
            displayText:record.fields.name+", "+record.fields.cou_name_en
           })
         })
         setSearchResults(items);
   }
   
  }, [data])
  
 

  const handleOnSearch = (string:string) => {
    setSearchString(string)
    
  };



  const handleOnSelect = (item:SearchResult) => {
    router.push(`${item.name}?lat=${item.lat}&long=${item.long}`)
    console.log(item);
  };

;

  const formatResult = (item) => {
    return (   
      
  
      <div className="">
      
        <span>
          {item.displayText}
        </span>      
      </div>
    );
  };
  return (
      <ReactSearchAutocomplete
        placeholder="search city eg. london , delhi"
        items={searchResults}
        onSearch={handleOnSearch}    
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}        
        showNoResults={true}
        styling={{backgroundColor:isDarkTheme?"#1F1D1D":"#f0f4f8",color:isDarkTheme?"#F97F29":"black",}}
        className="fixed top-[21vh] sm:top-[16vh] z-[1000] shadow-lg"   
      />
  );
};

export default SearchCity;
