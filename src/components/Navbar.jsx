import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  // Force re-render when location changes
  useEffect(() => {
    // This will trigger a re-render when the location changes
  }, [location.pathname])

  const handleHomeNavigation = () => {
    // Force complete page refresh for home navigation
    window.location.href = '/'
  }

  const handleAboutUsNavigation = () => {
    // Force complete page refresh for About Us navigation
    window.location.href = '/about-us'
  }

  const handleServicesNavigation = () => {
    if (location.pathname === '/') {
      // If already on home page, scroll to services section
      setTimeout(() => {
        const servicesSection = document.getElementById('services')
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // If on another page, navigate to home with services hash
      window.location.href = '/#services'
    }
  }

  const handleLogoClick = () => {
    handleHomeNavigation()
  }

  const handleApplyNowNavigation = () => {
    // Force complete page refresh for Apply Now navigation
    window.location.href = '/application-form?type=ten_years'
  }
 

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 
                className="text-2xl font-bold gradient-text cursor-pointer"
                onClick={handleLogoClick}
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
                  onClick={handleHomeNavigation}
                >
                  Home
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/about-us') 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                  onClick={handleAboutUsNavigation}
                >
                  About Us
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/golden-visa-details') || isActive('/retirement-visa-details') || isActive('/property-valuation-details') || isActive('/dependent-visa-details')
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                  onClick={handleServicesNavigation}
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
                  onClick={handleApplyNowNavigation}
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
                  handleHomeNavigation()
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
                  handleAboutUsNavigation()
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
                  handleServicesNavigation()
                  setIsMenuOpen(false)
                }}
              >
                Services
              </button>
              <button
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 w-full text-left"
                onClick={() => {
                  window.open('https://wa.me/971563700590', '_blank')
                  setIsMenuOpen(false)
                }}
              >
                Contact Us
              </button>
              <Button 
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleApplyNowNavigation}
              >
                Apply Now
              </Button>
              
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar 