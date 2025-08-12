import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  ArrowLeft, 
  ArrowRight, 
  Building, 
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'
import dubaiSkyline3 from '../assets/dubai_skyline_3.jpg'

function InvestorVisaDetails() {
  const navigate = useNavigate()

  const scrollToContact = () => {
    navigate('/#contact')
  }

  const goBack = () => {
    navigate('/')
  }

  const benefits = [
    "2 Years validity with renewal option",
    "100% business ownership in the UAE",
    "Property investment opportunities",
    "Access to global business markets",
    "Tax-free business operations",
    "Family sponsorship included"
  ]

  const requirements = [
    "Minimum investment of AED 750,000 in UAE business",
    "Or property investment of AED 1 million or more",
    "Clean criminal record and good character",
    "Valid business plan and financial projections",
    "Proof of financial capability",
    "Medical fitness certificate"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">2 Years Investor Visa</h1>
                <p className="text-blue-100 mt-2">Your gateway to UAE business opportunities</p>
              </div>
            </div>
            <div className="hidden md:block">
              <Building className="w-16 h-16 text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${dubaiSkyline3})` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Invest in Your Future
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The UAE Investor Visa provides entrepreneurs and investors with the opportunity 
                to establish and grow their businesses in one of the world's fastest-growing 
                economies, with access to global markets and tax benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  onClick={scrollToContact}
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Business Investment:</span>
                  <span className="font-semibold text-blue-600">AED 750K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Property Investment:</span>
                  <span className="font-semibold text-green-600">AED 1M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-semibold text-yellow-600">4-8 Weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Visa Validity:</span>
                  <span className="font-semibold text-purple-600">2 Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maximize your investment potential in Dubai's dynamic business environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Invest in Dubai?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your investment journey today and unlock unlimited opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              onClick={scrollToContact}
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Dubai Golden Residency Services</h3>
          <p className="text-gray-400 mb-6">
            Your trusted partner for Dubai investor visa applications
          </p>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+971 4 123 4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@uaegoldenvisa.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InvestorVisaDetails 