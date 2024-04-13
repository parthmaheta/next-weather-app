import {create} from 'zustand';

const useFavoritesStore = create((set) => ({
  favorites: [],
  // Load favorites from local storage on initialization
  initFavorites: () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    set({ favorites: storedFavorites });
  },
  // Add a new favorite
  addFavorite: (newFavorite) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, newFavorite];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },
  // Remove a favorite by city name
  removeFavorite: (city) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter((favorite) => favorite.city !== city);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },
  // Toggle a favorite
  toggleFavorite: (city, lat, long) => {
    set((state) => {
      const index = state.favorites.findIndex((favorite) => favorite.city === city);
      if (index !== -1) {
        const newFavorites = [...state.favorites];
        newFavorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return { favorites: newFavorites };
      } else {
        const newFavorite = { city, lat, long };
        const newFavorites = [...state.favorites, newFavorite];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return { favorites: newFavorites };
      }
    });
  },
}));

export default useFavoritesStore;


export const useTemperatureStore = create((set) => ({
  isKelvin: (typeof window !== 'undefined' && localStorage.getItem('isKelvin') === 'true') || false, // Initial state for tracking the temperature unit
  toggleUnit: () => {
    set((state) => {
      const newState = !state.isKelvin;
      localStorage.setItem('isKelvin', newState); 
      return { isKelvin: newState };
    }); 
  },
}));
