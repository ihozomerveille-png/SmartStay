import { useState } from 'react'
import { Calendar } from 'lucide-react'

export const BookingForm = ({ listing, onSubmit }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setSubmitted(true)
    setFormData({
      checkIn: '',
      checkOut: '',
      guests: 1,
      name: '',
      email: '',
      phone: '',
    })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const price = listing.price || listing.nightly_price || 0
  const nights = {
    checkIn: formData.checkIn,
    checkOut: formData.checkOut,
  }

  const calculateDays = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const check = new Date(formData.checkIn)
    const checkout = new Date(formData.checkOut)
    return Math.ceil((checkout - check) / (1000 * 60 * 60 * 24))
  }

  const days = calculateDays()
  const totalPrice = Math.max(0, days * (typeof price === 'string' ? parseFloat(price) : price))

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-dark">Book This Place</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Check-In</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Check-Out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Number of Guests</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          max="12"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-100 p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-700">
            ${typeof price === 'string' ? price : price?.toFixed(2)} × {days} nights
          </span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
      >
        Complete Booking
      </button>

      {submitted && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
          Booking request submitted! We'll send a confirmation soon.
        </div>
      )}
    </form>
  )
}
