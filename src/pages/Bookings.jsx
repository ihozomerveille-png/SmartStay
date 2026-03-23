import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, X, ArrowRight } from 'lucide-react'

const Bookings = ({ user }) => {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(savedBookings)
  }, [])

  const handleCancel = (bookingId) => {
    const updated = bookings.filter((b) => b.id !== bookingId)
    setBookings(updated)
    localStorage.setItem('bookings', JSON.stringify(updated))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view bookings</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-dark mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No bookings yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring and book your next adventure!
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
            >
              Browse Properties
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark mb-2">{booking.name}</h3>
                    <div className="space-y-1 text-gray-600 text-sm">
                      <p>
                        <span className="font-semibold">Check-in:</span> {booking.checkIn}
                      </p>
                      <p>
                        <span className="font-semibold">Check-out:</span> {booking.checkOut}
                      </p>
                      <p>
                        <span className="font-semibold">Guests:</span> {booking.guests}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span> {booking.email}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span> {booking.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Booking ID</p>
                      <p className="font-mono text-sm">{booking.id}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Booked on{' '}
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCancel(booking.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
