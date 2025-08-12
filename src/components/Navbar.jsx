import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 
                className="text-2xl font-bold gradient-text cursor-pointer"
                onClick={() => navigate('/')}
              >
                Dubai Golden Residency
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/')}
                >
                  Home
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/about-us') 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/about-us')}
                >
                  About Us
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/golden-visa-details') || isActive('/retirement-visa-details') || isActive('/property-valuation-details') || isActive('/dependent-visa-details')
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    if (location.pathname === '/') {
                      // If already on home page, scroll to services section
                      document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
                    } else {
                      // If on another page, navigate to home and then scroll to services
                      navigate('/')
                      setTimeout(() => {
                        document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }
                  }}
                >
                  Services
                </button>
                <button
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition-colors"
                  onClick={() => window.open('https://wa.me/971563700590', '_blank')}
                >
                  Contact Us
                </button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => navigate('/application-form?type=ten_years')}
                >
                  Apply Now
                </Button>
                
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <button
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  isActive('/') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                }`}
                onClick={() => {
                  navigate('/')
                  setIsMenuOpen(false)
                }}
              >
                Home
              </button>
              <button
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  isActive('/about-us') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                }`}
                onClick={() => {
                  navigate('/about-us')
                  setIsMenuOpen(false)
                }}
              >
                About Us
              </button>
              <button
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  isActive('/golden-visa-details') || isActive('/retirement-visa-details') || isActive('/property-valuation-details') || isActive('/dependent-visa-details')
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                }`}
                onClick={() => {
                  if (location.pathname === '/') {
                    // If already on home page, scroll to services section
                    document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
                  } else {
                    // If on another page, navigate to home and then scroll to services
                    navigate('/')
                    setTimeout(() => {
                      document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }
                  setIsMenuOpen(false)
                }}
              >
                Services
              </button>
              <button
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 w-full text-left"
              >
                Contact Us
              </button>
              <Button 
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => {
                  navigate('/application-form?type=ten_years')
                  setIsMenuOpen(false)
                }}
              >
                Apply Now
              </Button>
              {location.pathname !== '/login' && (
                <Button 
                  variant="outline"
                  className="w-full mt-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={() => {
                    navigate('/login')
                    setIsMenuOpen(false)
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar 