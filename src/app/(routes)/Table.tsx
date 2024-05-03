import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fields,WeatherResponse } from "../_utils/api";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  Dispatch,
  forwardRef,
  LegacyRef,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import Filters from "./Filters";
import Link from "next/link";
import { filterType } from "./CitiesTable";
import { useQueryClient } from "@tanstack/react-query";
import { convertTemp } from "../_utils/util";
import { useTemperatureStore } from "../_utils/store";
import { WiThermometer } from "react-icons/wi";
import Image from "next/image";

type Props = {
  data: any[];
  columnFilters: filterType[];
  setColumnFilters: Dispatch<SetStateAction<filterType[]>>;
};

const Table = forwardRef(
  ({ data, columnFilters, setColumnFilters }: Props, ref:LegacyRef<HTMLTableRowElement>|null) => {
    const queryClient = useQueryClient();
    const { isKelvin }:{isKelvin:boolean} = useTemperatureStore();
    
    const defaultColumns: ColumnDef<Fields>[]= useMemo(()=>{
      return [
        {
          header: "Index",
          accessorFn:(row,index)=>{
            return index+1;
          },
          cell: (props) => {
            return <div>{Number(props.getValue())}</div>;
          },
        },
        {
          header: "Name",
          accessorKey: "name",
          cell: (props) => (
            <Link
              href={{
                pathname: encodeURIComponent(props.getValue() as string),
                query: {
                  lat: (props.row.getValue("coordinates")as Array<string>) [0],
                  long:(props.row.getValue("coordinates")as Array<string>)[1],
                },
              }}
              className="visited:text-orange-600  hover:opacity-70 text-blue-500 underline"
            >
              {props.getValue() as string}
            </Link>
          ),
        },
        {
          header: "Country Name",
          accessorKey: "cou_name_en",
          cell: (props) => <span>{props.getValue() as string}</span>,
        },
        {
          header: "Country Code",
          accessorKey: "country_code",
          cell: (props) => {
            return (
              <div className="flex justify-center gap-2 items-center">
                <span>{props.getValue() as string}</span>
                {(props.getValue() as boolean)&& (
                  <Image
                    width={24}
                    height={24}
                    src={`https://flagicons.lipis.dev/flags/4x3/${(props
                      .getValue() as string)
                      .toLowerCase()}.svg`}
                    alt="country flag"
                  />
                )}
              </div>
            );
          },
        },
        {
          header: "Population",
          accessorKey: "population",
          cell: (props) => <span>{props.getValue() as string}</span>,
        },
        {
          header: "Timezone",
          accessorKey: "timezone",
          cell: (props) => <span>{props.getValue() as string}</span>,
        },
        {
          header: "Coordinates",
          accessorKey: "coordinates",
          cell: (props) => (
            <span>
              {(props.getValue() as Array<number>)[0].toFixed(2) +
                ", " +
                (props.getValue() as Array<number>)[1].toFixed(2)}
            </span>
          ), // Assuming you want to display coordinates as a string
        },
        {
          header: "Geoname ID",
          accessorKey: "geoname_id",
          cell: (props) => <span>{props.getValue() as string }</span>,
        },
  
        {
          header: "ASCII Name",
          accessorKey: "ascii_name",
          cell: (props) => <span>{props.getValue() as string}</span>,
        },
        {
          header: "Min Temp",
          accessorKey: "min_temp",
          accessorFn: (row, index) => {
            const cache:WeatherResponse|undefined = queryClient.getQueryData([
              "weather",
              row.coordinates[0].toString(),
              row.coordinates[1].toString(),
            ]);
            return cache ? cache.main.temp_min : "NA";
          },
          cell: (props) => {
            return (
              <div className="flex items-center">
                <WiThermometer className="mr-4 text-primary-accent w-8 h-8" />
                <span>
                  {typeof props.getValue() == "string"
                    ? props.getValue()
                    : convertTemp(isKelvin, props.getValue() as number)}
                </span>
              </div>
            );
          },
        },
        {
          header: "Max Temp",
          accessorKey: "max_temp",
          accessorFn: (row, index) => {
            const cache:WeatherResponse|undefined = queryClient.getQueryData([
              "weather",
              row.coordinates[0].toString(),
              row.coordinates[1].toString(),
            ]);
            return cache ? cache.main.temp_max : "NA";
          },
          cell: (props) => {
            return (
              <div className="flex items-center">
                <WiThermometer className="mr-4 text-primary-accent w-8 h-8" />
                <span>
                  {typeof props.getValue() == "string"
                    ? props.getValue()
                    : convertTemp(isKelvin, props.getValue() as number)}
                </span>
              </div>
            );
          },
        },
      ];
    },[isKelvin,queryClient])

    const [columnVisibility, setColumnVisibility] = useState<{[key:string]:boolean}>({
      ascii_name: false,
      geoname_id: false,
      coordinates: false,
    });
    const table = useReactTable({
      data,
      columns: defaultColumns,
      state: {
        columnVisibility,
        columnFilters,
      },      
      onColumnVisibilityChange: setColumnVisibility,
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <div className="p-2">
        <Filters filter={columnFilters} setFilter={setColumnFilters} />
        <div className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full bg-primary dark:bg-primary-dark dark:opacity-70">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="">
                    {header.column.columnDef.header as string}
                    {header.column.getCanSort() && (
                      <FaSort
                        fontSize={14}
                        className="hover:opacity-70 text-blue-500 inline-block"
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                    {
                      {
                        asc: <FaSortUp className="inline-block ml-1" />,
                        desc: <FaSortDown className="inline-block ml-1" />,
                      }[header.column.getIsSorted() as string]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <tr
                  key={row.id}
                  ref={
                    index + 1 == table.getRowModel().rows.length ? ref : null
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className="" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    );
  }
);
Table.displayName = "Table";
export default Table;
