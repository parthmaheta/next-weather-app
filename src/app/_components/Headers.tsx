"use client"
import React from 'react'
import logo from "@/app/logo-dark.svg"
import Link from 'next/link';
import { ThemeToggleButton } from './ThemeToggleButton';
import { FavoriteDropdown } from './FavoriteDropdown';
import { LocationButton } from './LocationButton';
import { TemperatureToggle } from './TemperatureToggle';
import Image from 'next/image';


export const Header = () => {
    
    
  return (
    <header className="navbar sm:flex-row dark:border-primary-accent box-shadow-custom dark:shadow-none fixed top-0 w-full m-2 bg-primary dark:bg-primary-dark">
      <div className="navbar-left">
        <Link href={"/"}>
        <Image src={logo}  alt="Logo" className='hover:opacity-70' />
        </Link>
      </div>
      <div className="navbar-right">
        <TemperatureToggle/> 
        <LocationButton/> 
        <FavoriteDropdown/>  
        <ThemeToggleButton/> 
      </div>
    </header>
  );
}

