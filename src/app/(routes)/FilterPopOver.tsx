import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaFilter } from "react-icons/fa";
import Toaster from "../_components/Toaster";

type FilterType = {
  id: string;
  label: string;
};
type Props = {
  selectedFilters: string[];
  onSelectedFilters: Dispatch<SetStateAction<string[]>>;
};

const Filters: FilterType[] = [
  { label: "Name", id: "name" },
  { label: "Country", id: "cou_name_en" },
  { label: "TimeZone", id: "timezone" },
  { label: "Coordinates", id: "coordinates" },
];

const FiltersPopover = ({ onSelectedFilters, selectedFilters }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSelectedFilters(
      e.target.checked
        ? selectedFilters.concat(e.target.value)
        : selectedFilters.filter((filter) => filter !== e.target.value)
    );
  };

  

  return (
    <div className="relative inline-block text-left ml-2 w-[18%]">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={togglePopover}
        >
          Filters
          <FaFilter className="scale-[2.5]" />
        </button>
        {isOpen&& <Toaster message={"Filter Will Be Implemented In Future"} callBack={()=>setIsOpen(false)}/>}
      </div>

      {/*Todo: Popover */}
      {/* {isOpen && (
        <div className="origin-top-right absolute right-0 z-10 bg-primary dark:bg-primary-dark mt-2 w-56 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Filters.map((filter) => (
              <div key={filter.id} className="px-4 py-2 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5"
                  id={filter.id}
                  value={filter.id}
                  checked={selectedFilters.includes(filter.id)}
                  onChange={handleFilterChange}
                />
                <label
                  htmlFor={filter.id}
                  className="ml-2 block text-sm"
                >
                  {filter.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default FiltersPopover;
