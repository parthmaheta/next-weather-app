import { create, StoreApi, UseBoundStore } from "zustand";

export type Favorite = {
  city: string;
  lat: string;
  long: string;
};
type Favorites = {
  favorites: Favorite[];
  toggleFavorite: (city: string, lat: string, long: string) => void;
  addFavorite: (newFavorite: Favorite) => void;
  removeFavorite: (city: string) => void;
  initFavorites: () => void;
};
const useFavoritesStore: UseBoundStore<StoreApi<Favorites>> = create((set) => ({
  favorites: [],
  // Load favorites from local storage on initialization
  initFavorites: () => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites") as string) || [];
    set({ favorites: storedFavorites });
  },
  // Add a new favorite
  addFavorite: (newFavorite: Favorite) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, newFavorite];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },
  // Remove a favorite by city name
  removeFavorite: (city: string) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter(
        (favorite) => favorite.city !== city
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },
  // Toggle a favorite
  toggleFavorite: (city, lat, long) => {
    set((state) => {
      const index = state.favorites.findIndex(
        (favorite) => favorite.city === city
      );
      if (index !== -1) {
        const newFavorites = [...state.favorites];
        newFavorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return { favorites: newFavorites };
      } else {
        const newFavorite = { city, lat, long };
        const newFavorites = [...state.favorites, newFavorite];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return { favorites: newFavorites };
      }
    });
  },
}));

export default useFavoritesStore;

type TempStore = { isKelvin: boolean; toggleUnit: () => void };
export const useTemperatureStore: UseBoundStore<StoreApi<TempStore>> = create(
  (set) => ({
    isKelvin:
      (typeof window !== "undefined" &&
        localStorage.getItem("isKelvin") === "true") ||
      false, // Initial state for tracking the temperature unit
    toggleUnit: () => {
      set((state) => {
        const newState = !state.isKelvin;
        localStorage.setItem("isKelvin", newState + "");
        return { isKelvin: newState };
      });
    },
  })
);

type ThemeStore={
  isDarkTheme:boolean;
  init:()=>void;
  toggleTheme:()=>void;
}
export const useThemeStore: UseBoundStore<StoreApi<ThemeStore>> = create((set) => ({
  isDarkTheme:  false,
  init:()=>{
    const theme = localStorage.getItem("theme") ;
    set({ isDarkTheme: theme==="dark"?true:false });
    if(!theme)
      localStorage.setItem("theme","light") ;

  },
  toggleTheme: () => set((state) => {return { isDarkTheme: !state.isDarkTheme }}),
}));

