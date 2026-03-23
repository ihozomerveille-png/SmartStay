import { useFilterStore } from '../../store/filterStore'
import { Filter, X } from 'lucide-react'

export const Sidebar = ({ isOpen, onClose }) => {
  const { filters, setPriceRange, setRating, setLocation, reset } = useFilterStore()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-16 md:top-0 left-0 h-[calc(100vh-4rem)] md:h-auto w-64 bg-white shadow-lg md:shadow-none overflow-y-auto transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between md:hidden">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold mb-3">Price Range</label>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-600">Min: ${filters.priceMin}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceMin}
                  onChange={(e) =>
                    setPriceRange(parseInt(e.target.value), filters.priceMax)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Max: ${filters.priceMax}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceMax}
                  onChange={(e) =>
                    setPriceRange(filters.priceMin, parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3">Minimum Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={0}>All Ratings</option>
              <option value={4.0}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.8}>4.8+</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3">Location</label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={reset}
            className="w-full py-2 bg-gray-300 text-dark rounded-lg hover:bg-gray-400 transition-all font-medium"
          >
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  )
}
