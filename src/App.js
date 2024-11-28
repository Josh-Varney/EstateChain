import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import InitialiseScreen from './components/form/Initialise.tsx';
import CreateAccountScreen from './components/form/Create.tsx';
import ForgotPasswordScreen from './components/form/Forgot.tsx';
import HomeScreen from './components/dummy-portal/DummyHub.tsx'
import ProtectedRoute from './contexts/authContext/route_context.tsx'
import LandingPage from './components/landing/landing.tsx' 
import FAQPage from './components/landing/faq.tsx' 
import TechnologyPage from './components/landing/technology.tsx' 
import FeaturesPage from './components/landing/features.tsx' 

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/faq' element={<FAQPage /> } />
          <Route path='/technology' element={<TechnologyPage />} />
          <Route path='/features' element={<FeaturesPage />} />
          <Route path="/" element={<InitialiseScreen />} />
          <Route path="/register" element={<CreateAccountScreen />} />
          <Route path="/forgot" element={<ForgotPasswordScreen />} />
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
