import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import FiltersPopover from './FilterPopOver';
import { filterType } from './CitiesTable';


type Props = {
    filter:filterType[],
    setFilter:Dispatch<SetStateAction<filterType[]>>
}

function Filters({filter,setFilter}: Props) {
    const [selectedFilters,setSelectedFilters]=useState<string[]>(["name"]);
    const onFilterChange=(id:string,value:string)=>{
        if(value.trim()!=="")
        setFilter(val=>{
            return val.filter(f=>f.id!==id).concat({id,value})
        })
        else
        setFilter([])
    }
  return (
    <div>
        <div className='flex w-full relative max-w-[450px] items-center'>
          <FaSearch className='absolute left-2 opacity-70 top-3 scale-150'/>
          <input className='w-[70%] p-2 text-lg pl-12 rounded-lg border-2 bg-primary dark:bg-primary-dark border-gray-600 focus:outline'
          onChange={(e)=>onFilterChange("name",e.target.value)}
          
          placeholder='search city name'/>
          <FiltersPopover onSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
        </div>
        
    </div>
  )
}

export default Filters