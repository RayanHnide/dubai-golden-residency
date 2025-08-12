import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  ArrowLeft, 
  Award,
  Heart,
  Users,
  Target,
  Eye,
  Star,
  Shield,
  Zap,
  Building,
  CheckCircle
} from 'lucide-react'

function AboutUs() {
  const navigate = useNavigate()

  const services = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "10-Year Golden Visa",
      description: "Enabling property owners to secure long-term residency, ensuring stability and the opportunity to fully enjoy the benefits of living in Dubai.",
      color: "bg-yellow-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "5-Year Retirement Visa",
      description: "Offering a secure and comfortable retirement option for property owners, allowing them to enjoy their golden years in one of the world's most vibrant cities.",
      color: "bg-green-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dependent Visa",
      description: "Facilitating residency for the dependents of property owners, ensuring families can stay together and thrive in Dubai.",
      color: "bg-purple-500"
    }
  ]

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      description: "Upholding the highest standards of honesty and transparency in all our dealings."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Excellence",
      description: "Striving for perfection in every service we provide, ensuring our clients achieve their residency goals."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description: "Continuously seeking innovative approaches to simplify and enhance our service offerings."
    }
  ]

  const whyChooseUs = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Expertise",
      description: "Our team comprises seasoned professionals with extensive experience in the UAE's property and visa landscapes."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Service",
      description: "We understand that every client is unique, and we tailor our services to meet your specific requirements."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Efficiency",
      description: "We pride ourselves on our quick and efficient service, ensuring you can secure your residency without unnecessary delays."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">About Dubai Golden Residency</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted Partner in
            <span className="block text-purple-600">Dubai Residency Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dubai Golden Residency is your premier destination for comprehensive visa services, 
            specializing in helping property owners secure their long-term residency in Dubai.
          </p>
        </div>

        {/* Services Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive visa solutions tailored to meet your specific needs and goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Eye className="w-8 h-8 text-purple-600 mr-3" />
                  <CardTitle className="text-2xl font-bold text-purple-900">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Dubai Golden Residency envisions a Dubai where property owners can enjoy the full benefits of their investments, 
                  with long-term residency options that provide peace of mind and stability. We aim to be the cornerstone 
                  of this vision, delivering reliable and efficient visa services that empower property owners to make Dubai their long-term home.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-blue-600 mr-3" />
                  <CardTitle className="text-2xl font-bold text-blue-900">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  Our mission is to deliver exceptional service with a personal touch, ensuring that each client receives 
                  tailored solutions that meet their specific needs. We are dedicated to:
                </p>
                <div className="space-y-4">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">{value.title}</h4>
                        <p className="text-gray-700 text-sm">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Dubai Golden Residency?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what sets us apart in the competitive landscape of visa services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-600">
                      {item.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-xl mb-8 opacity-90">
                Let us help you secure your long-term residency in Dubai
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  onClick={() => navigate('/application-form?type=ten_years')}
                >
                  Apply Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-black hover:bg-white hover:text-purple-600 px-8 py-4 text-lg"
                  onClick={() => navigate('/')}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default AboutUs 