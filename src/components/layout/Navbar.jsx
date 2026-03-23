import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Home, Heart, Calendar, LogOut, LogIn } from 'lucide-react'

export const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
    setIsOpen(false)
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Home className="w-6 h-6" />
            SmartStay
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-all">
              Home
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-primary transition-all flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Favorites
            </Link>
            <Link to="/bookings" className="text-gray-700 hover:text-primary transition-all flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Bookings
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-primary transition-all py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="block text-gray-700 hover:text-primary transition-all py-2"
              onClick={() => setIsOpen(false)}
            >
              Favorites
            </Link>
            <Link
              to="/bookings"
              className="block text-gray-700 hover:text-primary transition-all py-2"
              onClick={() => setIsOpen(false)}
            >
              Bookings
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-gray-700 hover:text-primary transition-all py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block text-gray-700 hover:text-primary transition-all py-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
