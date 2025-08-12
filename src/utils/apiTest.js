// API Test Utility
import { apiRequest, buildApiUrl, apiConfig } from '../config/api.js'

export const testApiConnection = async () => {
  console.log('🔍 Testing API Connection...')
  console.log('Base URL:', apiConfig.baseURL)
  console.log('Full login URL:', buildApiUrl(apiConfig.endpoints.login))
  
  try {
    // Test basic connectivity
    const response = await fetch(apiConfig.baseURL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })
    
    console.log('✅ API server is reachable')
    console.log('Status:', response.status)
    console.log('Headers:', response.headers)
    
    return {
      success: true,
      status: response.status,
      message: 'API server is reachable'
    }
  } catch (error) {
    console.error('❌ API connection failed:', error)
    return {
      success: false,
      error: error.message,
      message: 'API server is not reachable'
    }
  }
}

export const testLoginEndpoint = async (email = 'test@example.com', password = 'test123') => {
  console.log('🔍 Testing Login Endpoint...')
  
  try {
    const loginData = { email, password }
    
    const response = await apiRequest(apiConfig.endpoints.login, {
      method: 'POST',
      body: JSON.stringify(loginData),
      credentials: 'include',
      mode: 'cors'
    })
    
    console.log('✅ Login endpoint is working')
    console.log('Response:', response)
    
    return {
      success: true,
      response,
      message: 'Login endpoint is working'
    }
  } catch (error) {
    console.error('❌ Login endpoint failed:', error)
    return {
      success: false,
      error: error.message,
      message: 'Login endpoint failed'
    }
  }
}

// Add this to your browser console to test:
// import('./src/utils/apiTest.js').then(module => module.testApiConnection())
// import('./src/utils/apiTest.js').then(module => module.testLoginEndpoint()) 