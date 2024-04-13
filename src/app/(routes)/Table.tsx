import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fields } from "../_utils/api";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  ReactNode,
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

type Props = {
  data: any[];
  columnFilters: filterType[];
  setColumnFilters: Dispatch<SetStateAction<filterType[]>>;
};

const Table = forwardRef(
  ({ data, columnFilters, setColumnFilters }: Props, ref) => {
    const queryClient = useQueryClient();
    const { isKelvin } = useTemperatureStore();
    
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
                pathname: encodeURIComponent(props.getValue()),
                query: {
                  lat: props.row.getValue("coordinates")[0],
                  long: props.row.getValue("coordinates")[1],
                },
              }}
              className="visited:text-orange-600  hover:opacity-70 text-blue-500 underline"
            >
              {props.getValue()}
            </Link>
          ),
        },
        {
          header: "Country Name",
          accessorKey: "cou_name_en",
          cell: (props) => <span>{props.getValue()}</span>,
        },
        {
          header: "Country Code",
          accessorKey: "country_code",
          cell: (props) => {
            return (
              <div className="flex justify-center gap-2 items-center">
                <span>{props.getValue()}</span>
                {props.getValue() && (
                  <img
                    className="w-6 h-6"
                    src={`https://flagicons.lipis.dev/flags/4x3/${props
                      .getValue()
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
          cell: (props) => <span>{props.getValue()}</span>,
        },
        {
          header: "Timezone",
          accessorKey: "timezone",
          cell: (props) => <span>{props.getValue()}</span>,
        },
        {
          header: "Coordinates",
          accessorKey: "coordinates",
          cell: (props) => (
            <span>
              {props.getValue()[0].toFixed(2) +
                ", " +
                props.getValue()[1].toFixed(2)}
            </span>
          ), // Assuming you want to display coordinates as a string
        },
        {
          header: "Geoname ID",
          accessorKey: "geoname_id",
          cell: (props) => <span>{props.getValue()}</span>,
        },
  
        {
          header: "ASCII Name",
          accessorKey: "ascii_name",
          cell: (props) => <span>{props.getValue()}</span>,
        },
        {
          header: "Min Temp",
          accessorKey: "min_temp",
          accessorFn: (row, index) => {
            const cache = queryClient.getQueryData([
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
                    : convertTemp(isKelvin, props.getValue())}
                </span>
              </div>
            );
          },
        },
        {
          header: "Max Temp",
          accessorKey: "max_temp",
          accessorFn: (row, index) => {
            const cache = queryClient.getQueryData([
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
                    : convertTemp(isKelvin, props.getValue())}
                </span>
              </div>
            );
          },
        },
      ];
    },[])

    const [columnVisibility, setColumnVisibility] = useState({
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
                    {header.column.columnDef.header}
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
                      }[header.column.getIsSorted()]
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
