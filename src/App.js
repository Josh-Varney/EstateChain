import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import InitialiseScreen from './components/form/Initialise.tsx';
import CreateAccountScreen from './components/form/Create.tsx';
import ForgotPasswordScreen from './components/form/Forgot.tsx';
import HomeScreen from './components/dummy-portal/DummyHub.tsx'
import ProtectedRoute from './contexts/authContext/route_context.tsx'
import LandingPage from './components/landing/landing-page/landing.tsx' 
import FAQPage from './components/landing/faq-page/faq.tsx' 
import TechnologyPage from './components/landing/technology-page/technology.tsx' 
import FeaturesPage from './components/landing/feature-page/features.tsx' 
import PricingPage from './components/landing/pricing-page/pricing.tsx'  
import AboutPage from './components/landing/contact-page/about.tsx'  
import CaseStudiesPage from "./components/landing/info/case-page/case.tsx"
import NewsInsightsPage from "./components/landing/info/news-page/news&insights.tsx"
import TokenizationGuidePage from "./components/landing/info/tokenisation-page/token.tsx"
import WhitePapersPage from "./components/landing/info/white-page/white.tsx"
import CookiePolicyPage from "./components/landing/policy/cookie-page/cookies.tsx"
import PrivacyPolicyPage from "./components/landing/policy/privacy-page/privacy-policy.tsx"
import TermsOfServicePage from "./components/landing/policy/t&c-page/t&c.tsx"

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/faq' element={<FAQPage /> } />
          <Route path='/technology' element={<TechnologyPage />} />
          <Route path='/features' element={<FeaturesPage />} />
          <Route path="/login" element={<InitialiseScreen />} />
          <Route path="/register" element={<CreateAccountScreen />} />
          <Route path="/forgot" element={<ForgotPasswordScreen />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<AboutPage /> } />
          <Route path="/info/case-studies" element={<CaseStudiesPage />} />
          <Route path='/info/news&insights' element={<NewsInsightsPage />} />
          <Route path='/info/tokenisation' element={<TokenizationGuidePage />} />
          <Route path='/policy/cookie-policy' element={<CookiePolicyPage />} />
          <Route path='/info/research' element={<WhitePapersPage /> } />
          <Route path='/policy/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/policy/t&c' element={<TermsOfServicePage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
