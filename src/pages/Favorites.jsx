import { useFavoritesStore } from '../store/favoritesStore'
import { ListingCard } from '../components/cards/ListingCard'
import { EmptyState } from '../components/common/Loader'
import { Heart, Trash2 } from 'lucide-react'

const Favorites = () => {
  const { favorites, clearFavorites } = useFavoritesStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark">My Favorites</h1>
            <p className="text-gray-600 mt-2">
              {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to clear all favorites?'
                  )
                ) {
                  clearFavorites()
                }
              }}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors font-semibold"
            >
              <Trash2 className="w-5 h-5" />
              Clear All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600">
              Add properties to your favorites to save them for later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
