"use client";
import React, { useEffect, useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";

export const ThemeToggleButton = () => {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkTheme(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };
  return (
    <button
      title="Toggle Theme"
      onClick={toggleTheme}
      className="p-4 rounded-full bg-gray-800 text-white dark:bg-primary-dark-light dark:text-primary-accent shadow-lg z-10 hover:opacity-60"
    >
      {isDarkTheme ? <GoSun /> : <FaMoon />}
    </button>
  );
};
