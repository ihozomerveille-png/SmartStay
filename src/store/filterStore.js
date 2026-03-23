import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  filters: {
    priceMin: 0,
    priceMax: 10000,
    location: '',
    rating: 0,
    placeId: '1', // Default: Worldwide
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  setPriceRange: (min, max) =>
    set((state) => ({
      filters: { ...state.filters, priceMin: min, priceMax: max },
    })),
  setLocation: (location) =>
    set((state) => ({
      filters: { ...state.filters, location },
    })),
  setRating: (rating) =>
    set((state) => ({
      filters: { ...state.filters, rating },
    })),
  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),
  reset: () =>
    set({
      filters: {
        priceMin: 0,
        priceMax: 10000,
        location: '',
        rating: 0,
        placeId: '1',
      },
    }),
}))
