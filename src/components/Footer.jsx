import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Dubai Golden Residency</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for Dubai visa applications
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400" role="list">
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400" role="list">
              <li><Link to="/golden-visa-details">Golden Residency</Link></li>
              <li><Link to="/retirement-visa-details">Retirement Visa</Link></li>
              <li><Link to="/property-valuation-details">Property Valuation</Link></li>
              <li><Link to="/dependent-visa-details">Dependent Visa</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Dubai Golden Residency Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 