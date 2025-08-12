import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { emailjsConfig, isEmailJSConfigured } from './config/emailjs.js'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import SEO from './components/SEO.jsx'
import './utils/seoValidator.js'

import { Toaster } from 'react-hot-toast'
import { 
  ArrowRight, 
  Award,
  Heart,
  Building,
  Users
} from 'lucide-react'
import './App.css'

// Import optimized image (much smaller file size - 137KB vs 670KB)
import dubaiSkylineOptimized from './assets/dubai_skyline_4.jpg'

function App() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize EmailJS
  useEffect(() => {
    if (isEmailJSConfigured()) {
      emailjs.init(emailjsConfig.publicKey)
    }
  }, [])

  // Preload the hero image for better performance
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = dubaiSkylineOptimized
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Structured data for the homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Dubai Golden Residency - Expert UAE Visa Services",
    "description": "Get your Dubai Golden Residency visa with expert guidance. 10-year residency, retirement visa, property evaluation & dependent visas. Apply online today!",
    "url": "https://uaegoldenvisa.com",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Visa Services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "10 Years Golden Residency",
            "description": "Long-term residency for investors and professionals",
            "url": "https://uaegoldenvisa.com/golden-visa-details"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "5 Years Retirement Visa",
            "description": "Retirement visa for individuals 55+ years",
            "url": "https://uaegoldenvisa.com/retirement-visa-details"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Service",
            "name": "Property Evaluation",
            "description": "Professional property valuation services",
            "url": "https://uaegoldenvisa.com/property-valuation-details"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Service",
            "name": "Dependent Visa",
            "description": "Family sponsorship and dependent visas",
            "url": "https://uaegoldenvisa.com/dependent-visa-details"
          }
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://uaegoldenvisa.com"
        }
      ]
    }
  }

  const visaServices = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "10 Years Golden Residency",
      description: "Long-term residency for investors and professionals",
      color: "bg-yellow-500",
      type: "ten_years"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "5 Years Retirement Visa",
      description: "Retirement visa for individuals 55+ years",
      color: "bg-green-500",
      type: "five_years"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Property Evaluation",
      description: "Professional property valuation services",
      color: "bg-blue-500",
      type: "real_estate"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dependent Visa",
      description: "Family sponsorship and dependent visas",
      color: "bg-purple-500",
      type: "family"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            padding: '16px 20px',
          },
        }}
      />
      <SEO 
        title="Dubai Golden Residency - Expert UAE Visa Services"
        description="Get your Dubai Golden Residency visa with expert guidance. 10-year residency, retirement visa, property evaluation & dependent visas. Apply online today!"
        keywords="Dubai Golden Residency, UAE visa, Golden Visa, Retirement Visa, Property Evaluation, Dependent Visa, Dubai residency"
        structuredData={homepageStructuredData}
      />
      
      {/* Main Content */}
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner" aria-labelledby="hero-heading">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-background"
            style={{ backgroundImage: `url(${dubaiSkylineOptimized})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 hero-bg" aria-hidden="true" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="animate-fade-in">
              <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Gateway to
                <span className="block text-yellow-300">Long-Term Residency in Dubai</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Secure your future in the UAE with our expert visa services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                >
                  Check Eligibility
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-black hover:bg-white hover:text-purple-600 px-8 py-4 text-lg"
                  onClick={() => navigate('/application-form?type=ten_years')}
                >
                  Apply Online
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Apply Online
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your visa service and start your application today
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
              {visaServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform duration-200 flex flex-col"
                  role="listitem"
                  onClick={() => {
                    if (service.type === 'ten_years') {
                      navigate('/golden-visa-details')
                    } else if (service.type === 'five_years') {
                      navigate('/retirement-visa-details')
                    } else if (service.type === 'real_estate') {
                      navigate('/property-valuation-details')
                    } else if (service.type === 'family') {
                      navigate('/dependent-visa-details')
                    }
                  }}
                >
                  <CardHeader className="text-center flex-shrink-0">
                    <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`} aria-hidden="true">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-600 text-center mb-4">{service.description}</p>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-auto"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (service.type === 'ten_years') {
                          navigate('/golden-visa-details')
                        } else if (service.type === 'five_years') {
                          navigate('/retirement-visa-details')
                        } else if (service.type === 'real_estate') {
                          navigate('/property-valuation-details')
                        } else if (service.type === 'family') {
                          navigate('/dependent-visa-details')
                        }
                      }}
                    >
                      Apply Online
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

