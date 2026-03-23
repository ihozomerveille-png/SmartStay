import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (listing) =>
        set((state) => ({
          favorites: state.favorites.some((fav) => fav.id === listing.id)
            ? state.favorites
            : [...state.favorites, listing],
        })),
      removeFavorite: (listingId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== listingId),
        })),
      isFavorite: (listingId) =>
        set((state) => state.favorites.some((fav) => fav.id === listingId)),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
)
