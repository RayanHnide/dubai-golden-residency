import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import Layout from './components/Layout.jsx'
import App from './App.jsx'
import GoldenVisaDetails from './pages/GoldenVisaDetails.jsx'
import RetirementVisaDetails from './pages/RetirementVisaDetails.jsx'
import PropertyValuationDetails from './pages/PropertyValuationDetails.jsx'
import DependentVisaDetails from './pages/DependentVisaDetails.jsx'
import ApplicationForm from './pages/ApplicationForm.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="/golden-visa-details" element={<GoldenVisaDetails />} />
            <Route path="/retirement-visa-details" element={<RetirementVisaDetails />} />
            <Route path="/property-valuation-details" element={<PropertyValuationDetails />} />
            <Route path="/dependent-visa-details" element={<DependentVisaDetails />} />
            <Route path="/application-form" element={<ApplicationForm />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
