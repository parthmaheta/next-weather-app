"use client";
import React from 'react';
import { useTemperatureStore } from '../_utils/store';

export const TemperatureToggle = () => {
  const { isKelvin, toggleUnit } = useTemperatureStore((state) => state); // Get the temperature unit from the store

  return (
    <div
      className="relative inline-block mr-8 cursor-pointer"
      onClick={toggleUnit}
      title="Toggle Units"
    >
      <label
        htmlFor="toggle"
        className={`relative block w-12 h-6 rounded-full  cursor-pointer transition-colors duration-300 ${isKelvin ? "bg-primary-accent" : "bg-gray-300 dark:bg-gray-700"}`}
      >
        <span
          className={`absolute left-0 top-0 w-6 h-6 rounded-full bg-white dark:bg-gray-300 shadow-md transform transition-transform duration-300 ${isKelvin ? "translate-x-full" : "translate-x-0"}`}></span>
      </label>

      {/* Icons */}
      <div className="absolute top-0 left-0 flex items-center">
        <span className="mr-1 -translate-x-6">°C</span>
        <span className="ml-1 translate-x-6">K</span>
      </div>
    </div>
  );
};
