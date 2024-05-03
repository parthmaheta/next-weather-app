import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCross, FaFilter } from "react-icons/fa";
import { filterType } from "./CitiesTable";

type FilterType = {
  id: string;
  label: string;
};
type Props = {
  selectedFilters: string[];
  onSelectedFilters: Dispatch<SetStateAction<string[]>>;
  filter:filterType[];
  setFilter:Dispatch<SetStateAction<filterType[]>>
};

const Filters: FilterType[] = [
  { label: "Country", id: "cou_name_en" },
  { label: "TimeZone", id: "timezone" },
 ];

const FiltersPopover = ({ onSelectedFilters, selectedFilters,filter,setFilter }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>,id:string) => {
    onSelectedFilters(
      e.target.checked
        ? selectedFilters.concat(e.target.value)
        : selectedFilters.filter((filter) => filter !== e.target.value)
    );
    //unchecking label will remove filter if exists
    if(!e.target.checked){
      setFilter((val: filterType[]) => {
        return val.filter((f) => f.id !== id);
      });
    }
  };

    //click outside popup will close popup
    const handleClickOutside = (event:MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div className="relative inline-block text-left ml-2">
      <div>
        <button
          type="button"
          className="inline-flex justify-center max-w-[100px] rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={togglePopover}
        >
          Filters
          <FaFilter className="scale-125" />
        </button>      
      </div>

      {isOpen && (
        <div ref={dropdownRef} className="origin-top-right absolute right-0 z-10 bg-primary dark:bg-primary-dark mt-2 w-64 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Filters.map((Filter) => (
              <div key={Filter.id} className="px-4 py-2 flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  id={Filter.id}
                  value={Filter.id}
                  checked={selectedFilters.includes(Filter.id)}
                  onChange={(e)=>handleFilterChange(e,Filter.id)}
                />
                <label
                  htmlFor={Filter.id}
                  className="ml-2 block text-sm"
                >
                  {Filter.label}
                </label>
                {selectedFilters.includes(Filter.id)&&<FilterTypes setFilter={setFilter} id={Filter.id}/>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPopover;

type FilterTypesProps={
  id:string;
  setFilter:Dispatch<SetStateAction<filterType[]>>;
}
export const FilterTypes=({id,setFilter}:FilterTypesProps)=>{
  const ref = useRef<HTMLInputElement>(null);
  const onFilterChange = (id: string, value: string) => {
    if (value.trim() !== "")
      setFilter((val: filterType[]) => {
        return val.filter((f) => f.id !== id).concat({ id, value });
      });
    else {
      setFilter((val: filterType[]) => {
        return val.filter((f) => f.id !== id);
      });
    }
  };

  return (
    <div>
      <div className="flex w-full relative mr-1">
        <input
          className="w-full pl-2 border-b bg-primary dark:bg-primary-dark border-gray-600 focus:border-b-gray-800 focus:outline-none"
          onChange={(e) => onFilterChange(id, e.target.value)}
          ref={ref}
          placeholder={id}
        />
        <AiOutlineClose
          className="absolute right-2 opacity-60 hover:opacity-100 hover:text-red-500 top-1"
          onClick={() => {
            if (ref.current) ref.current.value = "";
            setFilter((val: filterType[]) => {
              return val.filter((f) => f.id !== id);
            });
          }}
        />
      </div>
    </div>
  );

}