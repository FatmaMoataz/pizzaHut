import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export let favoritesContext = createContext();

export default function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recipe) => {
    if (!favorites.some((item) => item.id === recipe.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, recipe]);
      toast.success("Added to favorites!", { theme: "dark", position: "bottom-right" });
    } else {
      toast.info("Recipe is already in favorites!", { theme: "dark", position: "bottom-right" });
    }
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== recipeId));
    toast.success("Removed from favorites!", { theme: "dark", position: "bottom-right" });
  };

  const refreshFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
    }
  };

  return (
    <favoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, refreshFavorites }}>
      {children}
    </favoritesContext.Provider>
  );
}
