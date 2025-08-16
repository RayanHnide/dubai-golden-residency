import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Plane,
  Users,
  Shield,
  Heart,
  Home
} from 'lucide-react'
import dubaiSkyline1 from '../assets/dubai_skyline_1.jpg'

function GoldenVisaDetails() {
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

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "A decade-long Residency",
      description: "The golden visa is valid for 10 years, and is renewable."
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Permit to travel and Work",
      description: "Feel free to travel anywhere in the UAE, and work, invest and set up business in Dubai."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Sponsorship for Family",
      description: "Get to sponsor your spouse, children and parents for the same period of time under golden visa."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Local Sponsor Needed",
      description: "You don't need a local sponsor to stay in Dubai."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Easy access to Services",
      description: "Get access to healthcare, education, tax benefits and investment opportunities."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Sponsor Househelps",
      description: "You can sponsor an unlimited number of housemaids and domestic help."
    }
  ]

  const propertyRequirements = [
    "Property Documents: Title deed for a property in Dubai with a value of at least AED 2 million",
    "For mortgaged properties: NOC letter from the bank",
    "Clear, color-scanned copy of your passport (valid for more than 6 months)",
    "Previous Emirates ID (if applicable)",
    "High-quality digital photo meeting ICP specifications",
    "National ID for applicants from Iran, Pakistan, Iraq, Libya, and Afghanistan",
    "Health insurance from any UAE insurance company"
  ]

  const offPlanRequirements = [
    "Initial contract of sale (Oqood)",
    "Statement of account from the developer showing the amount paid",
    "If the project completion status is below 10%: Proof of escrow payments",
    "Clear, color-scanned copy of your passport (valid for more than 6 months)",
    "Previous Emirates ID (if applicable)",
    "High-quality digital photo meeting ICP specifications",
    "National ID for applicants from Iran, Pakistan, Iraq, Libya, and Afghanistan",
    "Health insurance from any UAE insurance company"
  ]

  const sharedPropertyRequirements = [
    "If the individual share is less than AED 2 million: Ownership must be between a husband and wife",
    "If the property is shared with other partners: The applicant's share must be worth AED 2 million or more to qualify",
    "Clear, color-scanned copy of your passport (valid for more than 6 months)",
    "Previous Emirates ID (if applicable)",
    "High-quality digital photo meeting ICP specifications",
    "National ID for applicants from Iran, Pakistan, Iraq, Libya, and Afghanistan",
    "Health insurance from any UAE insurance company"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-yellow-600"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">10-Year Golden Residency in Dubai</h1>
                <p className="text-yellow-100 mt-2">Everything You Need to Know</p>
              </div>
            </div>
            <div className="hidden md:block">
              <Award className="w-16 h-16 text-yellow-200" />
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
                Your Golden Ticket to Thrive in Dubai!
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dubai is inviting you from all over the world to begin life in the constantly growing city with a 10-year Golden Residency. 
                This special 10-year golden residency has opened the doors to a plethora of possibilities for investors, entrepreneurs, 
                and exceptional talents to call the dynamic city of Dubai, their home for a decade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  onClick={() => navigate('/application-form?type=ten_years')}
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/application-form?type=ten_years')}
                >
                  Check Your Eligibility
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Validity Period:</span>
                  <span className="font-semibold text-yellow-600">10 Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Renewable:</span>
                  <span className="font-semibold text-green-600">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Property Value:</span>
                  <span className="font-semibold text-blue-600">AED 2M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Family Sponsorship:</span>
                  <span className="font-semibold text-purple-600">Included</span>
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
              Benefits of a 10-Year Golden Residency in Dubai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enjoy unparalleled advantages with your Dubai Golden Residency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-yellow-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dubai Golden Residency Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your property type and see the specific requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Full Ownership */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Properties with Full Ownership</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Property Documents:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Title deed for a property in Dubai with a value of at least AED 2 million</li>
                    <li>• For mortgaged properties: NOC letter from the bank</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Documents:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {propertyRequirements.slice(2).map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Off-Plan Properties */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Off-Plan Properties</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Property Documents:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Initial contract of sale (Oqood)</li>
                    <li>• Statement of account from the developer</li>
                    <li>• If below 10% completion: Proof of escrow payments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Documents:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {offPlanRequirements.slice(3).map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Shared Property */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Shared Property Ownership</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ownership Criteria:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• If share &lt; AED 2M: Must be husband and wife</li>
                    <li>• If shared with others: Your share must be AED 2M+</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Documents:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {sharedPropertyRequirements.slice(2).map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to apply for Golden Residency Dubai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive into the detailed knowledge of Dubai's golden residency requirements!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h3>
              <p className="text-gray-600 mb-6">
                Get connected with GoldenCube for a golden residency application by following the steps for an easy process:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-yellow-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit Online Application</h4>
                    <p className="text-gray-600">Apply for a golden residency in Dubai by submitting an online application via Dubai Golden Residency.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-yellow-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Visit Us</h4>
                    <p className="text-gray-600">Get one-to-one conversation with experts at Dubai Golden Residency by visiting Office 22, The Offices 2, One Central, Dubai World Trade Center, Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Golden Residency?</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Investment Opportunities</h4>
                  <p className="text-gray-600">Get a lifetime of opportunity to invest in property or business in the futuristic city of Dubai without any hassle needing a local sponsor under a Golden Residency.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Luxurious Lifestyle</h4>
                  <p className="text-gray-600">Live a luxurious life in Dubai, apply to get long-term residency with 10-years golden residency application!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Embark on your journey to get 10 year's Golden Residency in Dubai
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to secure your future in the dynamic environment of Dubai? Apply for your 10-Year Golden Residency application with Dubai Golden Residency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold"
              onClick={() => navigate('/application-form?type=ten_years')}
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
            Your trusted partner for Dubai Golden Residency applications
          </p>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+971 563 700 590</span>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GoldenVisaDetails 