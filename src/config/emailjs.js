// EmailJS Configuration
// Replace these with your actual EmailJS credentials from https://dashboard.emailjs.com

// Safe way to access environment variables in browser
const getEnvVar = (name, fallback = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name] || fallback
  }
  return fallback
}

export const emailjsConfig = {
  // Get this from: https://dashboard.emailjs.com/admin/account
  // Look for "Public Key" or "User ID"
  publicKey: getEnvVar('REACT_APP_EMAILJS_PUBLIC_KEY', ''),
  
  // Get this from: https://dashboard.emailjs.com/admin (Email Services tab)
  // Click on your service to see the Service ID
  serviceId: getEnvVar('REACT_APP_EMAILJS_SERVICE_ID', ''),
  
  // Get this from: https://dashboard.emailjs.com/admin (Email Templates tab)  
  // Click on your template to see the Template ID
  templateId: getEnvVar('REACT_APP_EMAILJS_TEMPLATE_ID', '')
}

export const recipientEmail = 'eng.rayanhnide98@gmail.com'

// Check if EmailJS is properly configured
export const isEmailJSConfigured = () => {
  return emailjsConfig.publicKey && 
         emailjsConfig.serviceId && 
         emailjsConfig.templateId &&
         !emailjsConfig.publicKey.includes('your_') &&
         !emailjsConfig.serviceId.includes('your_') &&
         !emailjsConfig.templateId.includes('your_')
}

// For direct configuration (alternative to environment variables)
// Uncomment and replace with your actual values:
/*
export const emailjsConfig = {
  publicKey: 'user_YOUR_ACTUAL_PUBLIC_KEY',
  serviceId: 'service_YOUR_ACTUAL_SERVICE_ID',
  templateId: 'template_YOUR_ACTUAL_TEMPLATE_ID'
}
*/ 