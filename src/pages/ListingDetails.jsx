import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useListings } from '../hooks/useListings'
import { BookingForm } from '../components/forms/BookingForm'
import { Loader, ErrorState } from '../components/common/Loader'
import { Heart, MapPin, Users, Wifi, Tv, Coffee, Wind } from 'lucide-react'
import { useFavoritesStore } from '../store/favoritesStore'

const ListingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useListings('1')
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
  const [listing, setListing] = useState(null)

  useEffect(() => {
    if (data?.results) {
      const found = data.results.find((item) => item.id === id)
      setListing(found)
    }
  }, [data, id])

  const isFavorited = favorites.some((fav) => fav.id === id)

  const toggleFavorite = () => {
    if (listing) {
      if (isFavorited) {
        removeFavorite(id)
      } else {
        addFavorite(listing)
      }
    }
  }

  const handleBooking = (formData) => {
    console.log('Booking submitted:', formData)
    // Save booking data (could be sent to backend)
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    bookings.push({
      id: Date.now(),
      listingId: id,
      ...formData,
      createdAt: new Date().toISOString(),
    })
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }

  if (isLoading) return <Loader message="Loading property details..." />
  if (error) return <ErrorState message="Failed to load property" />
  if (!listing) return <ErrorState message="Property not found" />

  const image = listing.image || listing.images?.[0] || '/placeholder.png'
  const price = listing.price || listing.nightly_price || 'N/A'
  const rating = listing.rating || 4.5

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline mb-4 font-semibold"
          >
            ← Back
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-dark mb-2">{listing.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="text-xl">★</span>
                  <span>{rating.toFixed(1)}</span>
                </div>
                {listing.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    <span>{listing.location}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={toggleFavorite}
              className="bg-white rounded-full p-3 shadow-md hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorited ? 'fill-primary text-primary' : 'text-gray-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={image}
            alt={listing.name}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src = '/placeholder.png'
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Type & Guests */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">Property Details</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Type</p>
                    <p className="font-semibold">{listing.room_type || 'Room'}</p>
                  </div>
                  {listing.guests && (
                    <div>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <Users className="w-4 h-4" /> Guests
                      </p>
                      <p className="font-semibold">{listing.guests}</p>
                    </div>
                  )}
                  {listing.bedrooms && (
                    <div>
                      <p className="text-gray-600 text-sm">Bedrooms</p>
                      <p className="font-semibold">{listing.bedrooms}</p>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div>
                      <p className="text-gray-600 text-sm">Bathrooms</p>
                      <p className="font-semibold">{listing.bathrooms}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Description */}
            {listing.description && (
              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed bg-white p-6 rounded-lg shadow">
                  {listing.description}
                </p>
              </section>
            )}

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">Amenities</h2>
              <div className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6 text-primary" />
                  <span>Wi-Fi</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tv className="w-6 h-6 text-primary" />
                  <span>TV</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-6 h-6 text-primary" />
                  <span>Kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-6 h-6 text-primary" />
                  <span>Air Conditioning</span>
                </div>
              </div>
            </section>
          </div>

          {/* Booking Form */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-20">
              <div className="text-3xl font-bold text-primary mb-4">
                ${typeof price === 'string' ? price : price?.toFixed(2)}
                <span className="text-lg text-gray-600">/night</span>
              </div>
              <BookingForm listing={listing} onSubmit={handleBooking} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
