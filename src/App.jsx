import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import Home from './pages/Home'
import ListingDetails from './pages/ListingDetails'
import Bookings from './pages/Bookings'
import Favorites from './pages/Favorites'
import Login from './pages/Login'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar user={user} onLogout={handleLogout} />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route
                  path="/"
                  element={<Home onToggleSidebar={toggleSidebar} />}
                />
                <Route
                  path="/listing/:id"
                  element={<ListingDetails />}
                />
                <Route
                  path="/bookings"
                  element={<Bookings user={user} />}
                />
                <Route
                  path="/favorites"
                  element={<Favorites />}
                />
                <Route
                  path="/login"
                  element={
                    user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
