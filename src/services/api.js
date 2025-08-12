// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend.dubai-golden-recedency.com/api'

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Get authentication token from localStorage
  getAuthToken() {
    return localStorage.getItem('adminToken')
  }

  // Get auth headers
  getAuthHeaders() {
    const token = this.getAuthToken()
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminEmail')
        window.location.href = '/login'
        throw new Error('Session expired. Please login again.')
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET'
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    })
  }

  // File upload request
  async upload(endpoint, formData) {
    const token = this.getAuthToken()
    const url = `${this.baseURL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData
      })

      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminEmail')
        window.location.href = '/login'
        throw new Error('Session expired. Please login again.')
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Upload Error (${endpoint}):`, error)
      throw error
    }
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/login',
  LOGOUT: '/logout',
  USER: '/user',
  
  // Countries
  COUNTRIES: '/countries',
  
  // Visa Applications
  VISA_REQUESTS: '/visa-requests',
  VISA_REQUEST: (id) => `/visa-requests/${id}`,
  DELETE_VISA_REQUEST: '/visa-requests/delete',
  
  // File Storage
  STORAGE_BASE: 'https://backend.dubai-golden-recedency.com/storage'
}

// Create API instance
const api = new ApiService()

// Export API methods
export default api 