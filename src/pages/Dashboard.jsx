import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { toast } from 'react-hot-toast'
import api, { API_ENDPOINTS } from '../services/api.js'
import { 
  ArrowLeft, 
  User,
  Mail,
  Phone,
  FileText,
  Calendar,
  Download,
  Eye,
  Building,
  CreditCard,
  Shield,
  Camera,
  LogOut,
  X,
  AlertCircle,
  Trash2
} from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [allApplications, setAllApplications] = useState([]) // Store all applications
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  
  // Frontend pagination state
  const [frontendPagination, setFrontendPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 3,
    total: 0,
    from: 1,
    to: 0
  })
  const [links, setLinks] = useState({
    first: null,
    last: null,
    prev: null,
    next: null
  })

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken')
    if (!token) {
      toast.error('Please login to access the dashboard')
      navigate('/login')
      return
    }
    
    fetchApplications()
  }, [navigate])

  const fetchApplications = async (page = 1) => {
    try {
      setLoading(true)
      setError(null) // Clear any previous errors
      
      // Get the token from localStorage
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        setError('No authentication token found. Please login again.')
        toast.error('Authentication required. Please login again.')
        navigate('/login')
        return
      }
      
      // Always fetch from API to get fresh data
      const data = await api.get(API_ENDPOINTS.VISA_REQUESTS)
      
      // Debug: Log the API response
      console.log('API Response:', data)
      console.log('Response type:', typeof data)
      console.log('Is array:', Array.isArray(data))
      console.log('Has data property:', data && typeof data === 'object' && 'data' in data)
      
      let applicationsData = []
      
      // Handle different possible response structures
      if (data && typeof data === 'object') {
        if (data.data && Array.isArray(data.data)) {
          // Laravel paginated response: { data: [...], meta: {...} }
          applicationsData = data.data
          console.log('Using data.data (Laravel paginated response)')
        } else if (Array.isArray(data)) {
          // Direct array response
          applicationsData = data
          console.log('Using direct array response')
        } else if (data.visa_requests && Array.isArray(data.visa_requests)) {
          // Custom response structure
          applicationsData = data.visa_requests
          console.log('Using data.visa_requests')
        } else if (data.applications && Array.isArray(data.applications)) {
          // Another possible structure
          applicationsData = data.applications
          console.log('Using data.applications')
        } else {
          // Try to find any array in the response
          const keys = Object.keys(data)
          for (const key of keys) {
            if (Array.isArray(data[key])) {
              applicationsData = data[key]
              console.log(`Using data.${key}`)
              break
            }
          }
        }
      }
      
      console.log('Final applications data:', applicationsData)
      console.log('Applications count:', applicationsData.length)
      
      // Store all applications
      setAllApplications(applicationsData)

      // Calculate frontend pagination
      const total = applicationsData.length
      const lastPage = Math.ceil(total / itemsPerPage)
      const startIndex = (page - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const currentApplications = applicationsData.slice(startIndex, endIndex)

      console.log('Pagination info:', {
        total,
        lastPage,
        startIndex,
        endIndex,
        currentApplicationsCount: currentApplications.length
      })

      // Set current page applications
      setApplications(currentApplications)

      // Update frontend pagination state
      setFrontendPagination({
        current_page: page,
        last_page: lastPage,
        per_page: itemsPerPage,
        total: total,
        from: total > 0 ? startIndex + 1 : 0,
        to: Math.min(endIndex, total)
      })

      // Update links for navigation
      setLinks({
        first: page > 1 ? 1 : null,
        last: page < lastPage ? lastPage : null,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null
      })

    } catch (error) {
      console.error('Error fetching applications:', error)
      setError('Failed to load applications')
      toast.error('Failed to load your applications')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Generate a mock creation date based on application ID
  const getApplicationDate = (application) => {
    // For demo purposes, generate a date based on ID
    const baseDate = new Date('2024-01-01')
    const daysToAdd = (application.id - 1) * 7 // Each application 7 days apart
    const newDate = new Date(baseDate)
    newDate.setDate(baseDate.getDate() + daysToAdd)
    return newDate.toISOString()
  }

  // Get file name from path
  const getFileName = (filePath) => {
    if (!filePath) return null
    return filePath.split('/').pop()
  }

  // Get file type from path
  const getFileType = (filePath) => {
    if (!filePath) return null
    const extension = filePath.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image'
    if (extension === 'pdf') return 'pdf'
    return 'file'
  }

  // Handle file download
  const handleDownload = (filePath, fileName) => {
    if (!filePath) {
      toast.error('File not available')
      return
    }
    
    const fullUrl = `https://backend.dubai-golden-recedency.com/storage/${filePath}`
    
    // Create a temporary link to download the file
    const link = document.createElement('a')
    link.href = fullUrl
    link.download = fileName || getFileName(filePath)
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Download started')
  }

  // Handle file view
  const handleViewFile = (filePath, fileName) => {
    if (!filePath) {
      toast.error('File not available')
      return
    }
    
    const fullUrl = `https://backend.dubai-golden-recedency.com/storage/${filePath}`
    const fileType = getFileType(filePath)
    
    if (fileType === 'image') {
      // Show image in modal
      setSelectedImage({ url: fullUrl, name: fileName })
      setShowImageModal(true)
    } else if (fileType === 'pdf') {
      // Open PDF in new tab
      window.open(fullUrl, '_blank')
      toast.success('PDF opened in new tab')
    } else {
      // Download other file types
      handleDownload(filePath, fileName)
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      
      // Get the token from localStorage
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        // If no token, just clear storage and redirect
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminEmail')
        toast.success('Logged out successfully')
        navigate('/login')
        return
      }
      
      // Call the logout endpoint
      await api.post(API_ENDPOINTS.LOGOUT)

      // Clear stored authentication data regardless of response
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      console.error('Error during logout:', error)
      // Even if there's an error, clear local storage and redirect
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      toast.success('Logged out successfully')
      navigate('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Test authentication function
  const testAuth = async () => {
    const token = localStorage.getItem('adminToken')
    const email = localStorage.getItem('adminEmail')
    
    console.log('Current token:', token ? 'Present' : 'Missing')
    console.log('Current email:', email)
    
    if (token) {
      try {
        const userData = await api.get(API_ENDPOINTS.USER)
        console.log('User data:', userData)
        toast.success('Authentication valid')
      } catch (error) {
        console.log('Auth failed:', error)
        toast.error('Authentication failed')
      }
    } else {
      toast.error('No token found')
    }
  }

  // Handle application deletion
  const handleDeleteApplication = async (applicationId) => {
    // Confirm deletion
    const isConfirmed = window.confirm(
      `Are you sure you want to delete Application #${applicationId}? This action cannot be undone.`
    )
    
    if (!isConfirmed) {
      return
    }
    
    try {
      setIsDeleting(true)
      setDeletingId(applicationId)
      
      // IMMEDIATELY remove from UI for instant feedback
      setAllApplications(prev => prev.filter(app => app.id !== applicationId))
      setApplications(prev => prev.filter(app => app.id !== applicationId))
      
      // Call delete API
      await api.post(API_ENDPOINTS.DELETE_VISA_REQUEST, { id: applicationId })
      
      toast.success('Application deleted successfully')
      
      // Refresh data to ensure everything is in sync
      await fetchApplications(currentPage)
      
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete application')
      
      // If API call failed, restore the application to the list
      await fetchApplications(currentPage)
    } finally {
      setIsDeleting(false)
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchApplications} className="bg-purple-600 hover:bg-purple-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Applications Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Track your visa application status and documents
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={() => fetchApplications(1)}
              variant="outline"
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <div className="animate-spin h-4 w-4 mr-2 text-red-600" />
              ) : (
                <LogOut className="w-4 h-4 mr-2" />
              )}
              {isLoggingOut ? 'Logging Out...' : 'Logout'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{frontendPagination.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
          
          {applications.length === 0 ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
                <p className="text-gray-600 mb-4">
                  You haven't submitted any visa applications yet.
                </p>
                <Button 
                  onClick={() => navigate('/application-form')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Submit Your First Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            applications.map((application, index) => (
              <Card key={application.id || index} className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Card Header with Gradient Background */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold text-white mb-2">
                          Visa Application #{application.id}
                        </CardTitle>
                        <p className="text-blue-100 text-sm">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          {/* Submitted on {formatDate(application.created_at)} */}
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                        <span className="text-sm font-semibold">Active</span>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                <CardContent className="p-0">
                  {/* Personal Information Section */}
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <h4 className="font-bold text-gray-900 flex items-center mb-4 text-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Email</span>
                        </div>
                        <p className="font-medium text-gray-900">{application.email || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Name</span>
                        </div>
                        <p className="font-medium text-gray-900">{application.name || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Phone</span>
                        </div>
                        <p className="font-medium text-gray-900">{application.phone || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <Building className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Nationality</span>
                        </div>
                        <p className="font-medium text-gray-900">{application.nationality || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Family Members</span>
                        </div>
                        <p className="font-medium text-gray-900">{application.people_count || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Type</span>
                        </div>
                        <p className="font-medium text-gray-900">{application.type || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Family Members List</span>
                        </div>
                        <p className="font-medium text-gray-900">
                          {application.people && Array.isArray(application.people) 
                            ? application.people.join(', ') 
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 flex items-center mb-6 text-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4 text-green-600" />
                      </div>
                      Required Documents
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Required Documents */}
                      <div className="space-y-4">
                        <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Required</h5>
                        
                        {/* Property Copy */}
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <Building className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h6 className="font-medium text-gray-900">Property Copy</h6>
                                <p className="text-xs text-gray-500">Real estate documentation</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              application.property 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {application.property ? '✓ Uploaded' : '✗ Missing'}
                            </div>
                          </div>
                          {application.property && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewFile(application.property, 'Property Copy')}
                                className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(application.property, 'Property Copy')}
                                className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Passport Copy */}
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <FileText className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h6 className="font-medium text-gray-900">Passport Copy</h6>
                                <p className="text-xs text-gray-500">Travel document</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              application.passport 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {application.passport ? '✓ Uploaded' : '✗ Missing'}
                            </div>
                          </div>
                          {application.passport && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewFile(application.passport, 'Passport Copy')}
                                className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(application.passport, 'Passport Copy')}
                                className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Studio Photo */}
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                <Camera className="w-5 h-5 text-pink-600" />
                              </div>
                              <div>
                                <h6 className="font-medium text-gray-900">Studio Photo</h6>
                                <p className="text-xs text-gray-500">Professional photograph</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              application.studio_photo 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {application.studio_photo ? '✓ Uploaded' : '✗ Missing'}
                            </div>
                          </div>
                          {application.studio_photo && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewFile(application.studio_photo, 'Studio Photo')}
                                className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(application.studio_photo, 'Studio Photo')}
                                className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Health Insurance */}
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <h6 className="font-medium text-gray-900">Health Insurance</h6>
                                <p className="text-xs text-gray-500">Medical coverage</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              application.health_insurance 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {application.health_insurance ? '✓ Uploaded' : '✗ Missing'}
                            </div>
                          </div>
                          {application.health_insurance && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewFile(application.health_insurance, 'Health Insurance')}
                                className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(application.health_insurance, 'Health Insurance')}
                                className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Optional Documents */}
                      <div className="space-y-4">
                        <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Optional</h5>
                        
                        {/* EID Copy */}
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                <CreditCard className="w-5 h-5 text-orange-600" />
                              </div>
                              <div>
                                <h6 className="font-medium text-gray-900">EID Copy</h6>
                                <p className="text-xs text-gray-500">Emirates ID</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              application.eid 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {application.eid ? '✓ Uploaded' : 'Optional'}
                            </div>
                          </div>
                          {application.eid && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewFile(application.eid, 'EID Copy')}
                                className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(application.eid, 'EID Copy')}
                                className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Visa Copy */}
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                <FileText className="w-5 h-5 text-indigo-600" />
                              </div>
                              <div>
                                <h6 className="font-medium text-gray-900">Visa Copy</h6>
                                <p className="text-xs text-gray-500">Current visa</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              application.visa_copy 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {application.visa_copy ? '✓ Uploaded' : 'Optional'}
                            </div>
                          </div>
                          {application.visa_copy && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewFile(application.visa_copy, 'Visa Copy')}
                                className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(application.visa_copy, 'Visa Copy')}
                                className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Application ID:</span> #{application.id}
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download All
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteApplication(application.id)}
                          disabled={isDeleting && deletingId === application.id}
                          className="bg-white border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition-all duration-200"
                        >
                          {isDeleting && deletingId === application.id ? (
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-red-600 border-t-transparent rounded-full" />
                          ) : (
                            <Trash2 className="w-4 h-4 mr-2" />
                          )}
                          {isDeleting && deletingId === application.id ? 'Deleting...' : 'Delete'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                {/* Results Info */}
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium text-gray-900">{frontendPagination.from}</span> to{' '}
                  <span className="font-medium text-gray-900">{frontendPagination.to}</span> of{' '}
                  <span className="font-medium text-gray-900">{frontendPagination.total}</span> results
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchApplications(frontendPagination.current_page - 1)}
                    disabled={!links.prev}
                    className={`px-3 py-2 ${
                      links.prev
                        ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: frontendPagination.last_page }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === frontendPagination.current_page ? "default" : "outline"}
                        size="sm"
                        onClick={() => fetchApplications(page)}
                        className={`w-10 h-10 p-0 ${
                          page === frontendPagination.current_page
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchApplications(frontendPagination.current_page + 1)}
                    disabled={!links.next}
                    className={`px-3 py-2 ${
                      links.next
                        ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Page Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">
                      Page <span className="font-semibold text-gray-900">{frontendPagination.current_page}</span> of{' '}
                      <span className="font-semibold text-gray-900">{frontendPagination.last_page}</span>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

       
      </div>
      
      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedImage.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowImageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTMwQzExNi41NjkgMTMwIDEzMCAxMTYuNTY5IDEzMCAxMDBDMTMwIDgzLjQzMTUgMTE2LjU2OSA3MCAxMDAgNzBDODMuNDMxNSA3MCA3MCA4My40MzE1IDcwIDEwMEM3MCAxMTYuNTY5IDgzLjQzMTUgMTMwIDEwMCAxMzBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xMDAgMTEwQzEwNS41MjMgMTEwIDExMCAxMDUuNTIzIDExMCAxMDBDMTEwIDk0LjQ3NzIgMTA1LjUyMyA5MCAxMDAgOTBDOTQuNDc3MiA5MCA5MCA5NC40NzcyIDkwIDEwMEM5MCAxMDUuNTIzIDk0LjQ3NzIgMTEwIDEwMCAxMTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo='
                  toast.error('Failed to load image')
                }}
              />
            </div>
            <div className="flex justify-end p-4 border-t space-x-2">
              <Button
                variant="outline"
                onClick={() => handleDownload(selectedImage.url.split('/storage/')[1], selectedImage.name)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={() => setShowImageModal(false)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard 