/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FaRegHeart, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useFavoritesStore from '../_utils/store';

export function FavoriteDropdown() {

  const [isOpen, setIsOpen] = useState(false);
  const { favorites, initFavorites, removeFavorite } = useFavoritesStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const path = usePathname();


  //click outside popup will close popup
  const handleClickOutside = (event:MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    initFavorites();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen)
      setIsOpen(false);
  }, [path]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (

    <div className="relative inline-block z-[1000]">
      <button
        className="p-4 rounded-full bg-primary-light dark:bg-primary-dark-light mx-2 dark:text-primary-accent shadow-lg z-10 hover:opacity-60"
        title={(isOpen ? 'Close' : 'Open').concat(' Favorites Dropdown')}
        onClick={toggleDropdown}
      >
        <FaRegHeart fill='red' className="scale-150" />
      </button>
      {isOpen && (

        <div ref={dropdownRef} className="absolute right-0 mt-2 p-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-y-auto max-h-[40vh]">
          <div className='mb-4 text-lg text-center font-semibold'>Favorite Locations</div>
          {favorites.length > 0 ? favorites.map(({ city, lat, long }) => (
            <div key={city + lat + long} className='flex items-center justify-between p-2 my-2 hover:bg-gray-100 dark:hover:bg-gray-700'>
              <div>
                <Link key={city + lat + long} href={{ pathname: encodeURIComponent(city), query: { lat: lat, long: long } }} className='text-primary-accent underline hover:opacity-60'>
                  <div>{city}</div>
                </Link>
                <div className='text-xs'>lat:{lat.slice(0, 6)} long:{long.slice(0, 6)}</div>
              </div>
              <button className='hover:scale-125' title={'remove'} onClick={() => removeFavorite(city)}>
                <FaTimes fill='red' />
              </button>
            </div>
          )) : <div className='text-red-500 text-center'>Add Locations To Favorites</div>}
        </div>

      )}
    </div>
  );
}
