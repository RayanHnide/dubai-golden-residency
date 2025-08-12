import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { toast } from 'react-hot-toast'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import api, { API_ENDPOINTS } from '../services/api.js'
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Camera, 
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Building,
  CreditCard,
  Shield,
  FileImage,
  Globe
} from 'lucide-react'

// Custom CSS for phone input styling
const phoneInputStyles = `
  .PhoneInput {
    position: relative;
  }
  
  .PhoneInputCountry {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .PhoneInputCountryIcon {
    width: 20px;
    height: 15px;
    border-radius: 2px;
  }
  
  .PhoneInputCountrySelectArrow {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #6b7280;
    margin-left: 4px;
  }
  
  .PhoneInputInput {
    width: 100%;
    padding: 10px 12px 10px 80px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.5;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .PhoneInputInput:focus {
    outline: none;
    border-color: #9333ea;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
  
  .PhoneInputInput.error {
    border-color: #ef4444;
  }
  
  @media (min-width: 640px) {
    .PhoneInputInput {
      font-size: 16px;
      padding: 12px 16px 12px 90px;
    }
  }
`

function ApplicationForm() {
 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
 

  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
 
  
  // Get visa type from URL parameters
  const urlParams = new URLSearchParams(location.search)
  const visaType = urlParams.get('type') || 'ten_years' // Default to ten_years if not specified
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+971',
    type: visaType, // Include visa type in form data
    peopleCount: '', // New field for family visa
    people: [], // New field for family members
    propertyCopy: null,
    passportCopy: null,
    eidCopy: null,
    visaCopy: null,
    studioPhoto: null,
    healthInsurance: null,
    country_id: '', // Changed from nationality to country_id
    nationality: '' // Keep for display purposes
  })
  const [errors, setErrors] = useState({})
  const [countries, setCountries] = useState([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [filteredCountries, setFilteredCountries] = useState([])
  
  // New state for family dropdowns
  const [isPeopleCountDropdownOpen, setIsPeopleCountDropdownOpen] = useState(false)
  const [isFamilyMembersDropdownOpen, setIsFamilyMembersDropdownOpen] = useState(false)
  const [highlightedPeopleCountIndex, setHighlightedPeopleCountIndex] = useState(-1)
  const [highlightedFamilyMemberIndex, setHighlightedFamilyMemberIndex] = useState(-1)

  // Fetch countries from API
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const fetchCountries = async () => {
      try {
        setIsLoadingCountries(true)
        const params = new URLSearchParams({
          with_paginate: '0',
          ...(searchQuery && { q: searchQuery })
        })
        
        const response = await api.get(`${API_ENDPOINTS.COUNTRIES}?${params}`)
        
        // Handle response - all countries should be returned
        setCountries(response.data || response || [])
      } catch (error) {
        console.error('Error fetching countries:', error)
        toast.error('Failed to load countries. Please refresh the page.')
      } finally {
        setIsLoadingCountries(false)
      }
    }

    fetchCountries()
  }, [searchQuery])

  // Filter countries based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countries)
    } else {
      const filtered = countries.filter(country => {
        const countryName = (country.name || country).toLowerCase()
        return countryName.includes(searchQuery.toLowerCase())
      })
      setFilteredCountries(filtered)
    }
    setHighlightedIndex(-1)
  }, [countries, searchQuery])

  // Function to get country flag emoji
  const getCountryFlag = (countryName) => {
    // Common country name to flag emoji mapping
    const countryFlags = {
      'united arab emirates': '🇦🇪',
      'saudi arabia': '🇸🇦',
      'kuwait': '🇰🇼',
      'qatar': '🇶🇦',
      'bahrain': '🇧🇭',
      'oman': '🇴🇲',
      'jordan': '🇯🇴',
      'lebanon': '🇱🇧',
      'syria': '🇸🇾',
      'iraq': '🇮🇶',
      'yemen': '🇾🇪',
      'egypt': '🇪🇬',
      'morocco': '🇲🇦',
      'algeria': '🇩🇿',
      'tunisia': '🇹🇳',
      'libya': '🇱🇾',
      'sudan': '🇸🇩',
      'south sudan': '🇸🇸',
      'ethiopia': '🇪🇹',
      'somalia': '🇸🇴',
      'djibouti': '🇩🇯',
      'comoros': '🇰🇲',
      'mauritania': '🇲🇷',
      'mali': '🇲🇱',
      'niger': '🇳🇪',
      'chad': '🇹🇩',
      'cameroon': '🇨🇲',
      'nigeria': '🇳🇬',
      'ghana': '🇬🇭',
      'senegal': '🇸🇳',
      'gambia': '🇬🇲',
      'guinea-bissau': '🇬🇼',
      'guinea': '🇬🇳',
      'sierra leone': '🇸🇱',
      'liberia': '🇱🇷',
      'ivory coast': '🇨🇮',
      'burkina faso': '🇧🇫',
      'togo': '🇹🇬',
      'benin': '🇧🇯',
      'central african republic': '🇨🇫',
      'congo': '🇨🇬',
      'democratic republic of the congo': '🇨🇩',
      'gabon': '🇬🇦',
      'equatorial guinea': '🇬🇶',
      'sao tome and principe': '🇸🇹',
      'angola': '🇦🇴',
      'zambia': '🇿🇲',
      'malawi': '🇲🇼',
      'mozambique': '🇲🇿',
      'zimbabwe': '🇿🇼',
      'botswana': '🇧🇼',
      'namibia': '🇳🇦',
      'south africa': '🇿🇦',
      'lesotho': '🇱🇸',
      'eswatini': '🇸🇿',
      'madagascar': '🇲🇬',
      'mauritius': '🇲🇺',
      'seychelles': '🇸🇨',
      'kenya': '🇰🇪',
      'uganda': '🇺🇬',
      'tanzania': '🇹🇿',
      'burundi': '🇧🇮',
      'rwanda': '🇷🇼',
      'united states': '🇺🇸',
      'canada': '🇨🇦',
      'mexico': '🇲🇽',
      'brazil': '🇧🇷',
      'argentina': '🇦🇷',
      'chile': '🇨🇱',
      'peru': '🇵🇪',
      'colombia': '🇨🇴',
      'venezuela': '🇻🇪',
      'ecuador': '🇪🇨',
      'bolivia': '🇧🇴',
      'paraguay': '🇵🇾',
      'uruguay': '🇺🇾',
      'guyana': '🇬🇾',
      'suriname': '🇸🇷',
      'french guiana': '🇬🇫',
      'united kingdom': '🇬🇧',
      'france': '🇫🇷',
      'germany': '🇩🇪',
      'italy': '🇮🇹',
      'spain': '🇪🇸',
      'portugal': '🇵🇹',
      'netherlands': '🇳🇱',
      'belgium': '🇧🇪',
      'switzerland': '🇨🇭',
      'austria': '🇦🇹',
      'sweden': '🇸🇪',
      'norway': '🇳🇴',
      'denmark': '🇩🇰',
      'finland': '🇫🇮',
      'iceland': '🇮🇸',
      'ireland': '🇮🇪',
      'poland': '🇵🇱',
      'czech republic': '🇨🇿',
      'slovakia': '🇸🇰',
      'hungary': '🇭🇺',
      'romania': '🇷🇴',
      'bulgaria': '🇧🇬',
      'croatia': '🇭🇷',
      'slovenia': '🇸🇮',
      'serbia': '🇷🇸',
      'montenegro': '🇲🇪',
      'bosnia and herzegovina': '🇧🇦',
      'macedonia': '🇲🇰',
      'albania': '🇦🇱',
      'greece': '🇬🇷',
      'cyprus': '🇨🇾',
      'malta': '🇲🇹',
      'russia': '🇷🇺',
      'ukraine': '🇺🇦',
      'belarus': '🇧🇾',
      'moldova': '🇲🇩',
      'latvia': '🇱🇻',
      'lithuania': '🇱🇹',
      'estonia': '🇪🇪',
      'georgia': '🇬🇪',
      'armenia': '🇦🇲',
      'azerbaijan': '🇦🇿',
      'kazakhstan': '🇰🇿',
      'uzbekistan': '🇺🇿',
      'turkmenistan': '🇹🇲',
      'kyrgyzstan': '🇰🇬',
      'tajikistan': '🇹🇯',
      'china': '🇨🇳',
      'japan': '🇯🇵',
      'south korea': '🇰🇷',
      'north korea': '🇰🇵',
      'mongolia': '🇲🇳',
      'india': '🇮🇳',
      'pakistan': '🇵🇰',
      'bangladesh': '🇧🇩',
      'sri lanka': '🇱🇰',
      'nepal': '🇳🇵',
      'bhutan': '🇧🇹',
      'myanmar': '🇲🇲',
      'thailand': '🇹🇭',
      'laos': '🇱🇦',
      'cambodia': '🇰🇭',
      'vietnam': '🇻🇳',
      'malaysia': '🇲🇾',
      'singapore': '🇸🇬',
      'indonesia': '🇮🇩',
      'philippines': '🇵🇭',
      'brunei': '🇧🇳',
      'east timor': '🇹🇱',
      'australia': '🇦🇺',
      'new zealand': '🇳🇿',
      'papua new guinea': '🇵🇬',
      'fiji': '🇫🇯',
      'solomon islands': '🇸🇧',
      'vanuatu': '🇻🇺',
      'new caledonia': '🇳🇨',
      'french polynesia': '🇵🇫',
      'samoa': '🇼🇸',
      'tonga': '🇹🇴',
      'kiribati': '🇰🇮',
      'tuvalu': '🇹🇻',
      'nauru': '🇳🇷',
      'palau': '🇵🇼',
      'marshall islands': '🇲🇭',
      'micronesia': '🇫🇲',
      'turkey': '🇹🇷',
      'iran': '🇮🇷',
      'afghanistan': '🇦🇫',
      'israel': '🇮🇱',
      'palestine': '🇵🇸',
      'jordan': '🇯🇴',
      'lebanon': '🇱🇧',
      'syria': '🇸🇾',
      'iraq': '🇮🇶',
      'kuwait': '🇰🇼',
      'bahrain': '🇧🇭',
      'qatar': '🇶🇦',
      'united arab emirates': '🇦🇪',
      'oman': '🇴🇲',
      'yemen': '🇾🇪'
    }
    
    const normalizedName = countryName.toLowerCase().trim()
    return countryFlags[normalizedName] || '🌍' // Default flag if not found
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.nationality-dropdown')) {
        setIsDropdownOpen(false)
        setSearchQuery('')
      }
      if (isPeopleCountDropdownOpen && !event.target.closest('.people-count-dropdown')) {
        setIsPeopleCountDropdownOpen(false)
      }
      if (isFamilyMembersDropdownOpen && !event.target.closest('.family-members-dropdown')) {
        setIsFamilyMembersDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen, isPeopleCountDropdownOpen, isFamilyMembersDropdownOpen])

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isDropdownOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsDropdownOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
          const selectedCountry = filteredCountries[highlightedIndex]
          setFormData(prev => ({
            ...prev,
            country_id: selectedCountry.id || selectedCountry.name || selectedCountry,
            nationality: selectedCountry.name || selectedCountry
          }))
          setIsDropdownOpen(false)
          setSearchQuery('')
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsDropdownOpen(false)
        setSearchQuery('')
        break
    }
  }

  // Keyboard navigation for people count dropdown
  const handlePeopleCountKeyDown = (e) => {
    if (!isPeopleCountDropdownOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsPeopleCountDropdownOpen(true)
      }
      return
    }

    const peopleCountOptions = Array.from({ length: 10 }, (_, i) => i + 1)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedPeopleCountIndex(prev => 
          prev < peopleCountOptions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedPeopleCountIndex(prev => 
          prev > 0 ? prev - 1 : peopleCountOptions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedPeopleCountIndex >= 0 && peopleCountOptions[highlightedPeopleCountIndex]) {
          const selectedCount = peopleCountOptions[highlightedPeopleCountIndex]
          setFormData(prev => ({
            ...prev,
            peopleCount: selectedCount.toString(),
            people: []
          }))
          setIsPeopleCountDropdownOpen(false)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsPeopleCountDropdownOpen(false)
        break
    }
  }

  // Keyboard navigation for family members dropdown
  const handleFamilyMemberKeyDown = (e, index) => {
    if (!isFamilyMembersDropdownOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsFamilyMembersDropdownOpen(true)
      }
      return
    }

    const relationshipOptions = ['husband', 'family', 'children']

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedFamilyMemberIndex(prev => 
          prev < relationshipOptions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedFamilyMemberIndex(prev => 
          prev > 0 ? prev - 1 : relationshipOptions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedFamilyMemberIndex >= 0 && relationshipOptions[highlightedFamilyMemberIndex]) {
          const selectedRelationship = relationshipOptions[highlightedFamilyMemberIndex]
          const newPeople = [...formData.people]
          newPeople[index] = selectedRelationship
          setFormData(prev => ({
            ...prev,
            people: newPeople
          }))
          setIsFamilyMembersDropdownOpen(false)
          // Clear error when user selects
          if (errors[`people[${index}]`]) {
            setErrors(prev => ({
              ...prev,
              [`people[${index}]`]: ''
            }))
          }
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsFamilyMembersDropdownOpen(false)
        break
    }
  }

  const steps = [
    { id: 1, title: 'Personal Information', icon: <User className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 2, title: 'Document Upload', icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 3, title: 'Review & Submit', icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // If peopleCount changes, reset the people array
    if (name === 'peopleCount') {
      setFormData(prev => ({
        ...prev,
        people: []
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value || ''
    }))
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }))
    }
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type for specific fields
      if (fieldName === 'healthInsurance' || fieldName === 'propertyCopy' || fieldName === 'passportCopy') {
        if (file.type !== 'application/pdf') {
          setErrors(prev => ({
            ...prev,
            [fieldName]: `${fieldName === 'healthInsurance' ? 'Health insurance' : fieldName === 'propertyCopy' ? 'Property copy' : 'Passport copy'} must be a PDF file`
          }))
          return
        }
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File size must be less than 10MB'
        }))
        return
      }
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }))
      // Clear error when file is selected
      if (errors[fieldName]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: ''
        }))
      }
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
      
      // Improved phone validation - check for complete phone number
      if (!formData.phone || formData.phone.trim() === '' || formData.phone.trim() === '+971') {
        newErrors.phone = 'Phone number is required'
      } else if (formData.phone.length < 10) {
        newErrors.phone = 'Please enter a complete phone number'
      }
      
      if (!formData.country_id) newErrors.country_id = 'Nationality is required'
      
      // Family-specific validation
      if (formData.type === 'family') {
        if (!formData.peopleCount) newErrors.peopleCount = 'Number of dependents is required'
        else {
          const count = parseInt(formData.peopleCount)
          if (count > 0) {
            // Validate that all people fields are filled
            for (let i = 0; i < count; i++) {
              if (!formData.people[i] || formData.people[i].trim() === '') {
                newErrors[`people[${i}]`] = 'Please select relationship for person ' + (i + 1)
              }
            }
          }
        }
      }
    }

    if (step === 2) {
      // Property copy is not required for family visa type
      if (formData.type !== 'family' && !formData.propertyCopy) {
        newErrors.propertyCopy = 'Property copy is required'
      }
      if (!formData.passportCopy) newErrors.passportCopy = 'Passport copy is required'
      // Visa copy is required for family visa type
      if (formData.type === 'family' && !formData.visaCopy) {
        newErrors.visaCopy = 'Visa copy is required for Family Visa'
      }
      // Studio photo and health insurance are optional for all visa types
      // No validation required for these fields
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
      // Note: User must manually click the submit button in step 3
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
     
    // Prevent multiple submissions
    if (hasSubmitted || isSubmitting) {
       return
    }
    
    // Only proceed if we're on step 3
    if (currentStep !== 3) {
       return
    }
    
    // Validate step 3 before submission
    if (!validateStep(3)) {
       toast.error('Please fix the errors before submitting')
      return
    }
    
     setIsSubmitting(true)
    setHasSubmitted(true)
    
    try {
      // Create FormData object to send files
      const formDataToSend = new FormData()
      
      // Add text fields
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('type', formData.type) // Add visa type to form data
      formDataToSend.append('country_id', formData.country_id) // Add country_id
      
      // Add family-specific fields
      if (formData.type === 'family') {
        formDataToSend.append('people_count', formData.peopleCount)
        // Add each person in the people array
        formData.people.forEach((person, index) => {
          if (person) {
            formDataToSend.append(`people[${index}]`, person)
          }
        })
      }
      
      // Add required files
      if (formData.propertyCopy) {
        formDataToSend.append('property', formData.propertyCopy)
      }
      if (formData.passportCopy) {
        formDataToSend.append('passport', formData.passportCopy)
      }
      if (formData.studioPhoto) {
        formDataToSend.append('studio_photo', formData.studioPhoto)
      }
      if (formData.healthInsurance) {
        formDataToSend.append('health_insurance', formData.healthInsurance)
      }
      
      // Add optional files
      if (formData.eidCopy) {
        formDataToSend.append('eid', formData.eidCopy)
      }
      if (formData.visaCopy) {
        formDataToSend.append('visa_copy', formData.visaCopy)
      }
      
      // Use the centralized API service for file upload
      const result = await api.upload(API_ENDPOINTS.VISA_REQUESTS, formDataToSend)
      
      // Show success message
      toast.success('Application Submitted Successfully! 🎉\nWe will contact you within 2-3 hours')
      
      // Navigate to dashboard after a short delay to show the toast
      setTimeout(() => {
        navigate('/')
      }, 2000)
      
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Something went wrong. Please try again.')
      setHasSubmitted(false) // Reset on error
    } finally {
      setIsSubmitting(false)
    }
  }

  const FileUploadField = ({ 
    name, 
    label, 
    description, 
    required = false, 
    accept = ".pdf,.jpg,.jpeg,.png",
    icon = <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e, name)}
          className="hidden"
          id={name}
        />
        <label
          htmlFor={name}
          className="flex items-center justify-center w-full h-24 sm:h-28 md:h-32 px-3 sm:px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <div className="flex flex-col items-center space-y-1 sm:space-y-2 text-center">
            {formData[name] ? (
              <>
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                <span className="text-xs sm:text-sm text-gray-600 break-words max-w-full px-1">{formData[name].name}</span>
              </>
            ) : (
              <>
                {icon}
                <span className="text-xs sm:text-sm text-gray-600 break-words max-w-full px-1">{description}</span>
              </>
            )}
          </div>
        </label>
      </div>
      {errors[name] && (
        <p className="text-xs sm:text-sm text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-4 sm:py-6 md:py-8">
      {/* Inject custom phone input styles */}
      <style dangerouslySetInnerHTML={{ __html: phoneInputStyles }} />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-3 sm:mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Visa Application Form
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-2 mb-3">
            Complete your application to secure your UAE residency
          </p>
          {/* Visa Type Indicator */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            <span>Visa Type: </span>
            <span className="ml-1 font-semibold capitalize">
              {formData.type === 'ten_years' ? '10 Years Golden Residency' :
               formData.type === 'five_years' ? '5 Years Retirement Visa' :
               formData.type === 'real_estate' ? 'Property Evaluation' :
               formData.type === 'family' ? 'Dependent Visa' : 'Visa Application'}
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-center ${
                    currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{step.id}</span>
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 sm:mx-2 md:mx-4 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                       {formData.type === 'family' ? 'Sponsor Name' : 'Full Name'}   <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                       {formData.type === 'family' ? 'Sponsor Email' : 'Email Address'} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {formData.type === 'family' ? 'Sponsor Phone Number' : 'Phone Number'} <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      defaultCountry="AE"
                      international={true}
                      withCountryCallingCode={true}
                      countryCallingCodeEditable={false}
                      className={`PhoneInputInput ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Nationality Field */}
                  <div className="relative nationality-dropdown">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                     {
                      formData.type==='family' ?' Sponsor  Nationality' : 'Nationality'
                     } <span className="text-red-500">*</span>
                    </label>
                    
                    {/* Advanced Dropdown */}
                    <div className="relative">
                      {/* Selected Value Display */}
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                        className={`w-full text-sm sm:text-base border rounded-md p-3 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                          isDropdownOpen 
                            ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' 
                            : 'border-gray-300 hover:border-purple-400'
                        } ${errors.country_id ? 'border-red-500' : ''}`}
                      >
                        <span className={formData.nationality ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.nationality ? (
                            <span className="flex items-center">
                              <span className="mr-2">{getCountryFlag(formData.nationality)}</span>
                              {formData.nationality}
                            </span>
                          ) : 'Select your nationality'}
                        </span>
                        <div className="flex items-center space-x-2">
                          {isLoadingCountries && (
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                          )}
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isDropdownOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden">
                          {/* Search Input */}
                          <div className="p-3 border-b border-gray-100">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search countries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                autoFocus
                              />
                              <svg
                                className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>

                          {/* Countries List */}
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.length === 0 ? (
                              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                                {isLoadingCountries ? 'Loading countries...' : 'No countries found'}
                              </div>
                            ) : (
                              filteredCountries.map((country, index) => {
                                const countryName = country.name || country
                                const countryId = country.id || country.name || country
                                const isHighlighted = index === highlightedIndex
                                const isSelected = formData.country_id === countryId
                                
                                return (
                                  <div
                                    key={index}
                                    onClick={() => {
                                      setFormData(prev => ({
                                        ...prev,
                                        country_id: country.id || country.name || country,
                                        nationality: countryName
                                      }))
                                      setIsDropdownOpen(false)
                                      setSearchQuery('')
                                    }}
                                    className={`px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center space-x-3 ${
                                      isHighlighted 
                                        ? 'bg-purple-50 text-purple-900' 
                                        : 'hover:bg-gray-50'
                                    } ${isSelected ? 'bg-purple-100 text-purple-900' : ''}`}
                                  >
                                    <div className="flex items-center space-x-3 flex-1">
                                      <span className="text-lg">{getCountryFlag(countryName)}</span>
                                      <span className="text-sm font-medium">{countryName}</span>
                                    </div>
                                    {isSelected && (
                                      <svg
                                        className="w-4 h-4 text-purple-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                )
                              })
                            )}
                          </div>

                          {/* Footer */}
                          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                            Use ↑↓ to navigate, Enter to select, Esc to close
                          </div>
                        </div>
                      )}
                    </div>

                    {errors.country_id && (
                      <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.country_id}</p>
                    )}
                  </div>

                  {/* Family-specific fields */}
                  {formData.type === 'family' && (
                    <>
                      <div className="relative people-count-dropdown">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Dependents <span className="text-red-500">*</span>
                        </label>
                        
                        <div className="relative">
                          <div
                            onClick={() => setIsPeopleCountDropdownOpen(!isPeopleCountDropdownOpen)}
                            onKeyDown={handlePeopleCountKeyDown}
                            tabIndex={0}
                            className={`w-full text-sm sm:text-base border rounded-md p-3 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                              isPeopleCountDropdownOpen 
                                ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' 
                                : 'border-gray-300 hover:border-purple-400'
                            } ${errors.peopleCount ? 'border-red-500' : ''}`}
                          >
                            <span className={formData.peopleCount ? 'text-gray-900' : 'text-gray-500'}>
                              {formData.peopleCount ? `${formData.peopleCount} dependent${parseInt(formData.peopleCount) > 1 ? 's' : ''}` : 'Select number of dependents'}
                            </span>
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isPeopleCountDropdownOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>

                          {isPeopleCountDropdownOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden">
                              <div className="max-h-48 overflow-y-auto">
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((count, index) => {
                                  const isHighlighted = index === highlightedPeopleCountIndex
                                  const isSelected = formData.peopleCount === count.toString()
                                  
                                  return (
                                    <div
                                      key={index}
                                      onClick={() => {
                                        setFormData(prev => ({
                                          ...prev,
                                          peopleCount: count.toString(),
                                          people: []
                                        }))
                                        setIsPeopleCountDropdownOpen(false)
                                      }}
                                      className={`px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center space-x-3 ${
                                        isHighlighted 
                                          ? 'bg-purple-50 text-purple-900' 
                                          : 'hover:bg-gray-50'
                                      } ${isSelected ? 'bg-purple-100 text-purple-900' : ''}`}
                                    >
                                      <div className="flex-1">
                                        <span className="text-sm font-medium">{count} dependent{count > 1 ? 's' : ''}</span>
                                      </div>
                                      {isSelected && (
                                        <svg
                                          className="w-4 h-4 text-purple-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {errors.peopleCount && (
                          <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.peopleCount}</p>
                        )}
                      </div>

                      {/* Dynamic people fields based on peopleCount */}
                      {formData.peopleCount && parseInt(formData.peopleCount) > 0 && (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Family Members <span className="text-red-500">*</span>
                          </label>
                          {Array.from({ length: parseInt(formData.peopleCount) }, (_, index) => (
                            <div key={index} className="relative family-members-dropdown">
                              <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                                Person {index + 1}
                              </label>
                              <div className="relative">
                                <div
                                  onClick={() => setIsFamilyMembersDropdownOpen(!isFamilyMembersDropdownOpen)}
                                  onKeyDown={(e) => handleFamilyMemberKeyDown(e, index)}
                                  tabIndex={0}
                                  className={`w-full text-sm sm:text-base border rounded-md p-3 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                                    isFamilyMembersDropdownOpen 
                                      ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' 
                                      : 'border-gray-300 hover:border-purple-400'
                                  } ${errors[`people[${index}]`] ? 'border-red-500' : ''}`}
                                >
                                  <span className={formData.people[index] ? 'text-gray-900' : 'text-gray-500'}>
                                    {formData.people[index] ? formData.people[index].charAt(0).toUpperCase() + formData.people[index].slice(1) : 'Select relationship'}
                                  </span>
                                  <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                      isFamilyMembersDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>

                                {isFamilyMembersDropdownOpen && (
                                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden">
                                    <div className="max-h-48 overflow-y-auto">
                                      {['husband', 'family', 'children'].map((relationship, relIndex) => {
                                        const isHighlighted = relIndex === highlightedFamilyMemberIndex
                                        const isSelected = formData.people[index] === relationship
                                        
                                        return (
                                          <div
                                            key={relIndex}
                                            onClick={() => {
                                              const newPeople = [...formData.people]
                                              newPeople[index] = relationship
                                              setFormData(prev => ({
                                                ...prev,
                                                people: newPeople
                                              }))
                                              setIsFamilyMembersDropdownOpen(false)
                                              // Clear error when user selects
                                              if (errors[`people[${index}]`]) {
                                                setErrors(prev => ({
                                                  ...prev,
                                                  [`people[${index}]`]: ''
                                                }))
                                              }
                                            }}
                                            className={`px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center space-x-3 ${
                                              isHighlighted 
                                                ? 'bg-purple-50 text-purple-900' 
                                                : 'hover:bg-gray-50'
                                            } ${isSelected ? 'bg-purple-100 text-purple-900' : ''}`}
                                          >
                                            <div className="flex-1">
                                              <span className="text-sm font-medium">{relationship.charAt(0).toUpperCase() + relationship.slice(1)}</span>
                                            </div>
                                            {isSelected && (
                                              <svg
                                                className="w-4 h-4 text-purple-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                              </svg>
                                            )}
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                              {errors[`people[${index}]`] && (
                                <p className="text-xs sm:text-sm text-red-600 mt-1">{errors[`people[${index}]`]}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Step 2: Document Upload */}
              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FileUploadField
                      name="propertyCopy"
                      label=  {formData.type === 'family' ? 'Sponsor property Copy' : 'property Copy'}   
                      description={formData.type === 'family' ? 'Upload property copy (PDF only) - Optional for Family Visa' : 'Upload property copy (PDF only)'}
                      required={formData.type !== 'family'}
                      accept=".pdf"
                      icon={<Building className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />
                    
                    <FileUploadField
                      name="passportCopy"
                      label=  {formData.type === 'family' ? 'Sponsor passport copy' : 'passport copy'}   
                    
                      description="Upload passport copy (PDF only)"
                      required={true}
                      accept=".pdf"
                      icon={<FileText className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FileUploadField
                      name="eidCopy"
                      label=  {formData.type === 'family' ? 'Sponsor EID copy (if available)' : 'EID  copy (if available)'}   
                      description="Upload EID copy (PDF/Image)"
                      required={false}
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={<CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />
                    
                    <FileUploadField
                      name="visaCopy"
                      label=  {formData.type === 'family' ? 'Sponsor Visa copy ' : 'Visa  copy '}   
                      description={formData.type === 'family' ? 'Upload visa copy (PDF/Image) - Required for Family Visa' : 'Upload visa copy (PDF/Image) - Optional'}
                      required={formData.type === 'family'}
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={<FileText className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FileUploadField
                      name="studioPhoto"
                      label="Studio Photo"
                      description="Upload studio photo (Image) - Optional"
                      required={false}
                      accept=".jpg,.jpeg,.png"
                      icon={<Camera className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />
                    
                    <FileUploadField
                      name="healthInsurance"
                      label="Health Insurance"
                      description="Upload health insurance (PDF only) - Optional"
                      required={false}
                      accept=".pdf"
                      icon={<Shield className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Application Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Name</p>
                        <p className="font-medium text-sm sm:text-base">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Email</p>
                        <p className="font-medium text-sm sm:text-base break-words">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-sm sm:text-base">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Nationality</p>
                        <p className="font-medium text-sm sm:text-base">{formData.nationality}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Visa Type</p>
                        <p className="font-medium text-sm sm:text-base capitalize">
                          {formData.type === 'ten_years' ? '10 Years Golden Residency' :
                           formData.type === 'five_years' ? '5 Years Retirement Visa' :
                           formData.type === 'real_estate' ? 'Property Evaluation' :
                           formData.type === 'family' ? 'Dependent Visa' : 'Visa Application'}
                        </p>
                      </div>
                      {/* Family-specific information */}
                      {formData.type === 'family' && formData.peopleCount && (
                        <>
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600">Number of Dependents</p>
                            <p className="font-medium text-sm sm:text-base">{formData.peopleCount}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600">Family Members</p>
                            <div className="space-y-1">
                              {formData.people.map((person, index) => (
                                person && (
                                  <p key={index} className="font-medium text-sm sm:text-base capitalize">
                                    Person {index + 1}: {person}
                                  </p>
                                )
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">Uploaded Documents:</p>
                      <ul className="space-y-1">
                        {formData.propertyCopy && <li className="text-xs sm:text-sm">✅ Property Copy</li>}
                        {!formData.propertyCopy && formData.type === 'family' && <li className="text-xs sm:text-sm text-gray-500">ℹ️ Property Copy (Optional for Family Visa)</li>}
                        {formData.passportCopy && <li className="text-xs sm:text-sm">✅ Passport Copy</li>}
                        {formData.eidCopy && <li className="text-xs sm:text-sm">✅ EID Copy</li>}
                        {formData.visaCopy && <li className="text-xs sm:text-sm">✅ Visa Copy</li>}
                        {!formData.visaCopy && formData.type === 'family' && <li className="text-xs sm:text-sm text-red-500">❌ Visa Copy (Required for Family Visa)</li>}
                        {!formData.visaCopy && formData.type !== 'family' && <li className="text-xs sm:text-sm text-gray-500">ℹ️ Visa Copy (Optional)</li>}
                        {formData.studioPhoto && <li className="text-xs sm:text-sm">✅ Studio Photo</li>}
                        {!formData.studioPhoto && <li className="text-xs sm:text-sm text-gray-500">ℹ️ Studio Photo (Optional)</li>}
                        {formData.healthInsurance && <li className="text-xs sm:text-sm">✅ Health Insurance</li>}
                        {!formData.healthInsurance && <li className="text-xs sm:text-sm text-gray-500">ℹ️ Health Insurance (Optional)</li>}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-800">
                      <strong>Important:</strong> Please ensure all required documents are uploaded. 
                      {formData.type === 'family' && ' Property copy is optional for Family Visa applications.'}
                      {formData.type === 'family' && ' Visa copy is required for Family Visa applications.'}
                      Studio photo and health insurance are optional for all visa types.
                      Our team will review your application and contact you within 2 to 3 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-sm sm:text-base"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-sm sm:text-base"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                   </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ApplicationForm 