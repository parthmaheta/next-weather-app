import useFavoritesStore, { Favorite } from "@/app/_utils/store";
import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export function FavoriteButton({ city, lat, long }:Favorite) {
    const { favorites, toggleFavorite } = useFavoritesStore();     
    const isFavorite = useMemo(() =>favorites.some(favorite => favorite.city === city), [ city,favorites ])
    
  
    return (
      <button
        className="p-4 rounded-full bg-primary-light dark:bg-primary-dark-light mr-8 dark:text-primary-accent shadow-lg  hover:opacity-60"
        title={(isFavorite?'Remove From':'Add To').concat(' Favorite')}
        onClick={() => toggleFavorite(city, lat, long)}
      >
        {isFavorite ? <FaHeart fill='red' className="w-8 h-8" /> : <FaRegHeart fill='red' className="text-red-400 w-8 h-8" />}
      </button>
    );
  }