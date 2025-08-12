import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  ArrowLeft, 
  ArrowRight, 
  Building, 
  CheckCircle,
  Phone,
  Mail,
  Home,
  Calculator,
  MapPin,
  FileText,
  Users,
  DollarSign,
  Shield
} from 'lucide-react'
import dubaiSkyline1 from '../assets/dubai_skyline_1.jpg'

function PropertyValuationDetails() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToContact = () => {
    navigate('/#contact')
  }

  const goBack = () => {
    navigate('/')
  }

  const propertyTypes = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Apartments",
      documents: [
        "Title Deed: Provided by Dubai Land Department (DLD) to confirm ownership",
        "Oqood Certificate (for off-plan properties): Required if property is under construction",
        "Passport Copy: Valid copy of the owner's passport",
        "Emirates ID: For UAE residents",
        "Mortgage Statement & NOC: If the property is financed, confirming no objection from the bank",
        "Recent Photos: Interior and exterior property images"
      ]
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Villas",
      documents: [
        "Title Deed: Official ownership document from DLD",
        "Oqood Certificate (off-plan): If under construction",
        "Passport Copy & Emirates ID: Valid personal identification documents",
        "Mortgage Statement & NOC: If the villa is financed",
        "Recent Photos: Clear interior and exterior images of the villa"
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Large Plots",
      documents: [
        "Title Deed: Proves ownership of the land",
        "Plot Location Map & Certificate of Zones: To confirm boundaries and intended use (residential, commercial, or mixed)",
        "Market Valuation Report: Assesses the land's value based on market trends",
        "Mortgage Statement & NOC (if financed): Confirming no objection from the bank"
      ]
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Commercial Properties",
      documents: [
        "Title Deed & Oqood Certificate (for off-plan): Verifying ownership or ongoing development",
        "Passport Copy & Emirates ID: Identification documents of the owner",
        "Mortgage Statement & Bank NOC (if financed): Confirms no objection from the lender",
        "Floor Plan & Unit Layout: Determines usable commercial area",
        "Building Permit & Trade License (if applicable): Required for operational businesses",
        "Ejari (Commercial Lease Agreement): If rented out to a business tenant",
        "Rental Income Reports: If the property generates revenue"
      ]
    }
  ]

  const valuationFactors = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      description: "Area's location and neighborhood value"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Property Size",
      description: "Square footage and usable area"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Physical Condition",
      description: "Current state and maintenance level"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Market Trends",
      description: "Current market performance patterns"
    }
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
                className="border-white text-black hover:bg-white hover:text-blue-600"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Property Valuation</h1>
                <p className="text-blue-100 mt-2">Professional Property Valuation Services in Dubai</p>
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
          style={{ backgroundImage: `url(${dubaiSkyline1})` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A Property Valuation & Investment Guide
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The Dubai property valuation procedure determines the modern-day real estate market worth by establishing key elements such as the area's location, property size, physical condition, and current market performance patterns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  onClick={() => navigate('/application-form?type=real_estate')}
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/application-form?type=real_estate')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Valuation Process</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-semibold text-blue-600">Professional</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Coverage:</span>
                  <span className="font-semibold text-green-600">All Dubai</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Property Types:</span>
                  <span className="font-semibold text-purple-600">All Types</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Golden Residency:</span>
                  <span className="font-semibold text-yellow-600">AED 2M+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Property Valuation in Dubai: Why It Matters for Retirement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Knowledge of Dubai property valuation forms an essential base for obtaining the property golden residency, as real estate ownership is a fundamental requirement. Understanding the market enables investors to decide when to invest in apartments, villas, or townhouses, setting a solid foundation for a secure retirement plan.
            </p>
          </div>
        </div>
      </section>

      {/* Everything You Need to Know Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Know About Property Valuation in Dubai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure a solid investment opportunity with established market values reflecting location, property size, age, and prevailing market trends. Confirm if your property meets the minimum value (AED 2 million) required for the property golden residency and make informed decisions about buying or selling real estate in Dubai.
            </p>
          </div>

          <div id="valuation-factors" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuationFactors.map((factor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">
                      {factor.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">{factor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Documents Required for Property Valuation in Dubai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different property types require specific documentation for accurate valuation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {propertyTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">
                      {type.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {type.documents.map((doc, docIndex) => (
                      <div key={docIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Get in touch with us to learn how to apply for property valuation in Dubai. With GoldenCube, you gain access to real estate valuation experts who provide accurate property assessments, helping you make the right decisions for your future investments.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Expert Valuation</p>
                    <p className="text-gray-600">Professional real estate assessment</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Calculator className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Accurate Assessment</p>
                    <p className="text-gray-600">Market-based property valuation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Golden Residency Support</h4>
                  <p className="text-gray-600">Whether you want to secure the Golden Residency or simply understand your property's true worth, our Property Valuation Services in Dubai ensure you know the accurate market value.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Informed Decisions</h4>
                  <p className="text-gray-600">Contact us today and take the first step toward making informed property decisions for your future investments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Your Property Accurately Valued Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you want to secure the Golden Residency or simply understand your property's true worth, our Property Valuation Services in Dubai ensure you know the accurate market value. Contact us today and take the first step toward making informed property decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              onClick={() => navigate('/application-form?type=real_estate')}
            >
              Apply Online
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Dubai Golden Residency Services</h3>
          <p className="text-gray-400 mb-6">
            Your trusted partner for Property Valuation Services in Dubai
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

export default PropertyValuationDetails 