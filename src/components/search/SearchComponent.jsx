import { useState } from 'react'
import { Search } from 'lucide-react'

export const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 my-8">
      <div className="relative">
        <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by location..."
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bg-primary text-white px-4 py-1 rounded-md hover:opacity-90 transition-all"
        >
          Search
        </button>
      </div>
    </form>
  )
}
