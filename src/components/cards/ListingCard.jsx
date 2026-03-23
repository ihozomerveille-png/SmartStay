import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { useFavoritesStore } from '../../store/favoritesStore'

export const ListingCard = ({ listing }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
  
  const isFavorited = favorites.some((fav) => fav.id === listing.id)

  const toggleFavorite = (e) => {
    e.preventDefault()
    if (isFavorited) {
      removeFavorite(listing.id)
    } else {
      addFavorite(listing)
    }
  }

  const image = listing.image || listing.images?.[0] || '/placeholder.png'
  const price = listing.price || listing.nightly_price || 'N/A'
  const rating = listing.rating || listing.review_scores_rating || 4.5

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:scale-105"
    >
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img
          src={image}
          alt={listing.name || 'Listing'}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/placeholder.png'
          }}
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorited ? 'fill-primary text-primary' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-dark line-clamp-2">
          {listing.name || 'Unnamed Listing'}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-1">
          {listing.room_type || 'Room'}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${typeof price === 'string' ? price : price?.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>

        {listing.location && (
          <p className="text-xs text-gray-500">{listing.location}</p>
        )}
      </div>
    </Link>
  )
}
