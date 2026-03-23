import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export const useListings = (placeId = '1', options = {}) => {
  return useQuery({
    queryKey: ['listings', placeId],
    queryFn: async () => {
      const response = await api.get('/searchPropertyByPlaceId', {
        params: {
          placeId,
        },
      })
      return response.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  })
}

export const useListingDetails = (listingId, options = {}) => {
  return useQuery({
    queryKey: ['listing', listingId],
    queryFn: async () => {
      // Since the API doesn't have a detail endpoint, we'll use the search endpoint
      // and filter the result
      const response = await api.get('/searchPropertyByPlaceId', {
        params: {
          placeId: '1',
        },
      })
      const listing = response.data.results?.find(
        (item) => item.id === listingId
      )
      return listing || null
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 15, // 15 minutes
    enabled: !!listingId,
    ...options,
  })
}

export const useSearch = (query, options = {}) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) return { results: [] }
      const response = await api.get('/searchPropertyByPlaceId', {
        params: {
          placeId: query,
        },
      })
      return response.data
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!query,
    ...options,
  })
}
