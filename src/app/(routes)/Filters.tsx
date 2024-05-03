import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import FiltersPopover from "./FilterPopOver";
import { filterType } from "./CitiesTable";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  filter: filterType[];
  setFilter: Dispatch<SetStateAction<filterType[]>>;
};

function Filters({ filter, setFilter }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["name"]);
  const ref = useRef<null | HTMLInputElement>(null);
  const onFilterChange = (id: string, value: string) => {
    if (value.trim() !== "")
      setFilter((val) => {
        return val.filter((f) => f.id !== id).concat({ id, value });
      });
    else {
      setFilter((val) => {
        return val.filter((f) => f.id !== id);
      });
    }
  };

  const removeFilter = (id: string) => {
    setFilter((val: filterType[]) => {
      return val.filter((f) => f.id !== id);
    });
    if (id == "name" && ref.current) {
      ref.current.value = "";
    }
  };
  return (
    <div>
      <div className="flex flex-wrap w-full relative  items-center">
        <FaSearch className="absolute left-2 opacity-70 top-3 scale-150" />
        <input
          className="w-[70%] max-w-[350px] p-2 text-lg pl-12 rounded-lg border-2 bg-primary dark:bg-primary-dark border-gray-600 focus:outline"
          onChange={(e) => onFilterChange("name", e.target.value)}
          ref={ref}
          placeholder="search city name"
        />
        <FiltersPopover
          filter={filter}
          setFilter={setFilter}
          onSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
        />
        <div className="flex flex-wrap gap-1 ml-2">
          {filter.map((obj) => {
            return (
              <ChipButton
                key={obj.id}
                id={obj.id}
                value={obj.value as string}
                clickHandler={removeFilter}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
type ChipButtonType = {
  id: string;
  value: string;
  clickHandler: (arg0: string) => void;
};

const Label: { [key: string]: string } = {
  timezone: "TimeZone",
  cou_name_en: "Country",
  name: "City",
};
const ChipButton = ({ id, value, clickHandler }: ChipButtonType) => {
  return (
    <button className="shadow-md opacity-70 hover:opacity-100 p-2 px-4 rounded-full flex items-center justify-between border-blue-500 text-blue-500 dark:bg-primary-dark dark:text-primary-accent border dark:border-primary-accent">
      <span className="">
        {Label[id]}:&nbsp;{value}
      </span>
      <AiOutlineClose
        className="ml-2 w-6 h-6 opacity-60 hover:opacity-100 hover:text-red-500 cursor-pointer"
        onClick={() => {
          clickHandler(id);
        }}
      />
    </button>
  );
};
