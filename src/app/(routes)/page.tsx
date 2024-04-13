"use client";
import Link from "next/link";
import { useState } from "react";
import { fetchAllCities } from "../_utils/api";
import CitiesTable from "./CitiesTable";

export default function Home() {
 

  return (
    <>
      <CitiesTable />
    </>
  );
}
