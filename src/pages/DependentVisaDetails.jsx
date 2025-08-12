import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  CheckCircle,
  Phone,
  Mail,
  Heart,
  Shield,
  GraduationCap,
  DollarSign,
  Home,
  Plane,
  Star,
  UserCheck,
  Building
} from 'lucide-react'
import dubaiSkyline1 from '../assets/dubai_skyline_1.jpg'

function DependentVisaDetails() {
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

  const whoCanSponsor = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Spouse",
      description: "Your spouse can accompany you to experience the luxury and ease of Dubai."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Children",
      description: "You can include your unmarried children below the age of 21 under your visa application, so they can grow and learn in Dubai's safe, multicultural environment."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Parents",
      description: "Through a Dubai dependent visa for parents, you can grant them first-rate medical services and enjoy a comfortable lifestyle in an international setting."
    }
  ]

  const advantages = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stay Connected",
      description: "Bring your loved ones together and create new memories in Dubai while enjoying top-tier amenities and services."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Easy Residency",
      description: "With a Golden Residency, you won't have to renew as frequently, so you can focus on living life to the fullest."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Healthcare Access",
      description: "Dubai is home to some of the best healthcare services worldwide, ensuring quality care for you and your family."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Access to Great Education",
      description: "Give your children top-notch educational opportunities in acclaimed international schools and universities."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Tax-Free Living",
      description: "Benefit from Dubai's tax-free policies and maximize your savings, especially beneficial if you're planning your retirement."
    }
  ]

  const applicationSteps = [
    {
      step: "1",
      title: "Check Eligibility",
      description: "Ensure that you meet the financial requirements for both your Golden Residency and any dependents you plan to sponsor."
    },
    {
      step: "2",
      title: "Gather Required Documents",
      description: "Include proof of income, savings or property, passport copies, health insurance details, and any relevant family documents."
    },
    {
      step: "3",
      title: "Submit Your Application",
      description: "Apply online via GoldenCube for a hassle-free process."
    },
    {
      step: "4",
      title: "Wait for Approval",
      description: "Once approved, your family members receive valid residency permits under your Golden Residency in Dubai."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-purple-600"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Dependent Visa</h1>
                <p className="text-black mt-2">Move Your Family Overseas</p>
              </div>
            </div>
            <div className="hidden md:block">
              <Users className="w-16 h-16 text-purple-200" />
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
                Dependent Visa: Move Your Family Overseas
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                This 10-year Golden Residency not only allows you to sponsor your family members, but also extends coverage to anyone else you wish to sponsor under a dependent visa. A dependent visa Dubai covers your spouse, children, and elderly parents – ensuring everyone can experience the phenomenal Dubai lifestyle right alongside you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                  onClick={() => navigate('/application-form?type=family')}
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/application-form?type=family')}
                >
                  Check Your Eligibility
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Visa Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Visa Type:</span>
                  <span className="font-semibold text-purple-600">Dependent</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Validity:</span>
                  <span className="font-semibold text-green-600">10 Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Family Members:</span>
                  <span className="font-semibold text-blue-600">Spouse, Children, Parents</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Requirements:</span>
                  <span className="font-semibold text-yellow-600">Golden Residency Holder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can You Sponsor Section */}
      <section id="who-can-sponsor" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who Can You Sponsor?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bring your entire family to experience the luxury and comfort of Dubai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whoCanSponsor.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-600">
                      {member.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">{member.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advantages of the Dependent Visa Dubai Under Golden Residency
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enjoy unparalleled benefits with your family in Dubai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-600">
                      {advantage.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{advantage.description}</p>
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
              How to Apply for the Dependent Visa Dubai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to bring your family to Dubai
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h3>
              <div className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-purple-600 font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Family Reunion</h4>
                  <p className="text-gray-600">Holding an approved application lets you unite with your family in the dynamic city of Dubai, where adventure meets relaxation.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Retirement Dream</h4>
                  <p className="text-gray-600">A retirement dream in Dubai becomes attainable through this golden opportunity.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Upscale Lifestyle</h4>
                  <p className="text-gray-600">Keep your loved ones close with a dependent visa in Dubai, enjoying an upscale lifestyle in one of the most vibrant cities in the UAE.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Lifestyle Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience Dubai's Diverse Lifestyle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dubai accommodates every retiree's preference, from exciting urban living to peaceful beachfront retreats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Urban Living</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">City Life</p>
                    <p className="text-gray-600">Experience the excitement of urban living</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Luxury Amenities</p>
                    <p className="text-gray-600">Access to world-class facilities and services</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Beachfront Retreats</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Peaceful Living</h4>
                  <p className="text-gray-600">Enjoy serene beachfront properties and peaceful surroundings.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Natural Beauty</h4>
                  <p className="text-gray-600">Experience the beauty of Dubai's coastline and natural landscapes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Secure Your Golden Residency and Bring Your Family to Dubai
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start with professional guidance from GoldenCube to streamline the entire process for you and your family!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
              onClick={() => navigate('/application-form?type=family')}
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
            Your trusted partner for Dependent Visa applications in Dubai
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

export default DependentVisaDetails 