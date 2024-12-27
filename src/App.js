import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import LoginScreen from './components/form/login-account/login-account.tsx';
import CreateAccountScreen from "./components/form/create-account/create-account.tsx";
import ForgotPasswordScreen from './components/form/forgot-password/forgot-password.tsx';
import DummyDashboard from './components/dummy-portal/DummyHub.tsx';
import ProtectedRoute from './contexts/authContext/route_context.tsx';
import LandingPage from './components/landing/landing-page/landing.tsx';
import FAQPage from './components/landing/faq-page/faq.tsx';
import TechnologyPage from './components/landing/technology-page/technology.tsx';
import FeaturesPage from './components/landing/feature-page/features.tsx';
import PricingPage from './components/landing/pricing-page/pricing.tsx';
import AboutPage from './components/landing/contact-page/about.tsx';
import CaseStudiesPage from "./components/landing/info/case-page/case.tsx";
import NewsInsightsPage from "./components/landing/info/news-page/news&insights.tsx";
import CookiePolicyPage from "./components/landing/policy/cookie-page/cookies.tsx";
import PrivacyPolicyPage from "./components/landing/policy/privacy-page/privacy-policy.tsx";
import TermsOfServicePage from "./components/landing/policy/t&c-page/t&c.tsx";
import TokenInformation from "./components/landing/info/tokenisation-page/token-guide.tsx";
import Selector from "./components/portal-selection/selector.tsx";
import DummyMarket from './components/dummy-portal/components/marketplace/DummyMarketPlace.tsx';
import DummyTransactions from './components/dummy-portal/components/transactions/DummyTransactions.tsx';
import DummyAnalytics from './components/dummy-portal/components/analytics/DummyAnalytics.tsx';
import DummyCommunity from './components/dummy-portal/components/community/DummyCommunity.tsx';
import DummyInformation from './components/dummy-portal/components/info/DummyInfo.tsx';

function App() {
  useEffect(() => {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "ped8aa446i");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/technology' element={<TechnologyPage />} />
        <Route path='/features' element={<FeaturesPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<CreateAccountScreen />} />
        <Route path="/forgot" element={<ForgotPasswordScreen />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about-us" element={<AboutPage />} />
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
              <DummyDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/simulation/mockmarketplace'
          element={
            <ProtectedRoute>
              <DummyMarket />
            </ProtectedRoute>
          }
        />
        <Route
          path='/simulation/mocktransactions'
          element={
            <ProtectedRoute>
              <DummyTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path='/simulation/mockanalytics'
          element={
            <ProtectedRoute>
              <DummyAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path='/simulation/mockcommunity'
          element={
            <ProtectedRoute>
              <DummyCommunity />
            </ProtectedRoute>
          }
        />
        <Route
          path='/simulation/mockinformation'
          element={
            <ProtectedRoute>
              <DummyInformation />
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
