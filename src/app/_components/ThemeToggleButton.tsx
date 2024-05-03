"use client";
import React, { useEffect, useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { useThemeStore } from '../_utils/store';

export const ThemeToggleButton = () => {

  const { isDarkTheme, toggleTheme,init } = useThemeStore();

  useEffect(() => {
    init();
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const changeTheme = () => {
    localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
    toggleTheme()
    document.documentElement.classList.toggle("dark");
  };
  return (
    <button
      title="Toggle Theme"
      onClick={changeTheme}
      className="p-4 rounded-full bg-gray-800 text-white dark:bg-primary-dark-light dark:text-primary-accent shadow-lg z-10 hover:opacity-60"
    >
      {isDarkTheme ? <GoSun /> : <FaMoon />}
    </button>
  );
};
