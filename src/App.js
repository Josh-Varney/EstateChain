import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import LoginScreen from './components/form/login-account/login-account.tsx';
import CreateAccountScreen from "./components/form/create-account/create-account.tsx"
import ForgotPasswordScreen from './components/form/forgot-password/forgot-password.tsx';
import HomeScreen from './components/dummy-portal/components/DummyHub.tsx'
import ProtectedRoute from './contexts/authContext/route_context.tsx'
import LandingPage from './components/landing/landing-page/landing.tsx' 
import FAQPage from './components/landing/faq-page/faq.tsx' 
import TechnologyPage from './components/landing/technology-page/technology.tsx' 
import FeaturesPage from './components/landing/feature-page/features.tsx' 
import PricingPage from './components/landing/pricing-page/pricing.tsx'  
import AboutPage from './components/landing/contact-page/about.tsx'  
import CaseStudiesPage from "./components/landing/info/case-page/case.tsx"
import NewsInsightsPage from "./components/landing/info/news-page/news&insights.tsx"
import CookiePolicyPage from "./components/landing/policy/cookie-page/cookies.tsx"
import PrivacyPolicyPage from "./components/landing/policy/privacy-page/privacy-policy.tsx"
import TermsOfServicePage from "./components/landing/policy/t&c-page/t&c.tsx"
import TokenInformation from "./components/landing/info/tokenisation-page/token-guide.tsx"
import Selector from "./components/portal-selection/selector.tsx"

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/faq' element={<FAQPage /> } />
          <Route path='/technology' element={<TechnologyPage />} />
          <Route path='/features' element={<FeaturesPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<CreateAccountScreen />} />
          <Route path="/forgot" element={<ForgotPasswordScreen />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about-us" element={<AboutPage /> } />
          <Route path="/info/case-studies" element={<CaseStudiesPage />} />
          <Route path='/info/news&insights' element={<NewsInsightsPage />} />
          <Route path='/policy/cookie-policy' element={<CookiePolicyPage />} />
          <Route path='/policy/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/policy/t&c-policy' element={<TermsOfServicePage />} />
          <Route path='/info/tokenisation' element={<TokenInformation />} />
          <Route
            path="/simulation"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/selector'
            element={
              <ProtectedRoute>
                <Selector />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
