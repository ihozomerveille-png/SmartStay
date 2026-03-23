import { useState } from 'react'
import { useListings } from '../hooks/useListings'
import { useFilterStore } from '../store/filterStore'
import { SearchComponent } from '../components/search/SearchComponent'
import { ListingCard } from '../components/cards/ListingCard'
import { Loader, ErrorState, EmptyState } from '../components/common/Loader'
import { Filter } from 'lucide-react'

const Home = ({ onToggleSidebar }) => {
  const { filters } = useFilterStore()
  const { data, isLoading, error, refetch } = useListings(filters.placeId || '1')

  const handleSearch = (query) => {
    // Update the place ID with search query
    // Note: The API requires a placeId, not a text search
    console.log('Search query:', query)
  }

  if (isLoading) return <Loader message="Loading properties..." />
  if (error) return <ErrorState message="Failed to load listings" onRetry={() => refetch()} />

  const listings = data?.results || data || []

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchComponent onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark">Explore Properties</h1>
          <button
            onClick={onToggleSidebar}
            className="md:hidden flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {listings.length === 0 ? (
          <EmptyState message="No properties available. Try adjusting your filters." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.slice(0, 20).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
