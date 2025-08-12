import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Users,
  Shield,
  Home,
  Building,
  Plane,
  Star
} from 'lucide-react'
import dubaiSkyline1 from '../assets/dubai_skyline_1.jpg'

function RetirementVisaDetails() {
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

  const whyDubai = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Top Healthcare Facilities",
      description: "Healthcare facilities throughout Dubai maintain the globally top-ranking position for healthcare delivery to the local population."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Safe Living Environment",
      description: "Dubai stands as a safe living city because its very low crime statistics create an environment that ensures security for residents."
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Magnificent Infrastructure",
      description: "The city wins fame through its magnificent high-rise buildings and advanced construction methods. Individuals can experience premium shopping and gourmet dining in Dubai because it offers a sparkling lifestyle."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Tax-Free Retirement",
      description: "UAE's retirement visa permits spared savings access during your senior life since the state does not levy income tax on retirees."
    }
  ]

  const keyBenefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Long-term and renewal Residency",
      description: "Get a 5-year visa that is easy to renew, saving you from applying for a visa repeatedly."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Accommodation",
      description: "You can take your spouse and children to stay with you in Dubai."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Access to Dubai's High-end Facilities",
      description: "Being a resident, avail top-notch medical facilities, official services, and an active community of expatriates."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Luxury & Comfort",
      description: "You stay in a city that boasts icons such as the Burj Khalifa, The Dubai Mall, and Palm Jumeirah."
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Balance Between Leisure & Business",
      description: "If you wish to soak up the sunshine on pristine beaches, discover greenery in stunning parks, or enjoy gourmet cuisines, the city offers everything in moderation."
    }
  ]

  const requiredDocuments = [
    "Title deed for property in Dubai with a stated value of at least AED 1 million",
    "A clear copy of your passport (valid for more than 6 months)",
    "Your old Emirates ID, if applicable",
    "A high-quality digital photo that meets ICP specifications",
    "National ID for applicants from IRAN, PAKISTAN, IRAQ, LIBYA, and AFGHANISTAN",
    "Health insurance from any UAE insurance company",
    "Jointly held title deeds between partners are acceptable if the applicant's share is at least AED 1 million",
    "If the individual share is less than AED 1 million, ownership must be between a husband and wife"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-green-600"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">5 Years Retirement Visa</h1>
                <p className="text-green-100 mt-2">Your Gateway to Luxury Retirement in Dubai</p>
              </div>
            </div>
            <div className="hidden md:block">
              <Heart className="w-16 h-16 text-green-200" />
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
                Live Life King Size in Dubai
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The 5-years retirement Visa allows residents to live indefinitely within the vibrant and advanced environment of Dubai. 
                Through this program the UAE government together with the Federal Authority of Identity and Citizenship provides luxury & 
                Comfort to older adults who are 55 and above. Live life king size even at your early age with the UAE retirement visa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                  onClick={() => navigate('/application-form?type=five_years')}
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/application-form?type=five_years')}
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
                  <span className="font-semibold text-green-600">5 Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Renewable:</span>
                  <span className="font-semibold text-green-600">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Property Value:</span>
                  <span className="font-semibold text-blue-600">AED 1M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Age Requirement:</span>
                  <span className="font-semibold text-purple-600">55+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Dubai Retirement Visa?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why Dubai is the perfect destination for your retirement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyDubai.map((reason, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-green-600">
                      {reason.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seamless Lifestyle Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              5 Year Retirement Visa Dubai is your Ticket to a Seamless Lifestyle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The 5-year retirement Visa Dubai is an exclusive plan designed for seniors 55 and older, providing the opportunity to reside in the city for five years and to renew this multiple times. Relish your worry-free residency with the luxury comfort of Dubai.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Eligibility Criteria for Dubai Retirement Visa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Applicants will be qualified for a retirement visa in the UAE on the basis of at least one of the financial conditions:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white p-8 rounded-2xl shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Property Ownership Requirement</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl text-gray-700 font-semibold">
                  Ownership of property in Dubai worth AED 1 million and above
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Benefits of the Retirement Visa Dubai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enjoy the best of Dubai with your retirement visa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-green-600">
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

      {/* How to Apply Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to apply for the 5-Year Retirement Visa in Dubai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The process for the 5-year Retirement visa is easy and hassle-free:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Check your eligibility</h4>
                    <p className="text-gray-600">You must meet the financial requirements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Application Submission</h4>
                    <p className="text-gray-600">For all the required information, contact the experts at Dubai Golden Residency! Get personalized guidance on the Dubai retirement visa.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h3>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start living the 2nd innings of your life with enjoyment and security in Dubai!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Invest in a Golden Residency with us and experience luxury retirement in the most vibrant city in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
              onClick={() => navigate('/application-form?type=five_years')}
            >
              Apply Now
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
            Your trusted partner for Dubai Retirement Visa applications
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

export default RetirementVisaDetails 