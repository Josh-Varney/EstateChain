import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes as well
import './App.css';
import InitialiseScreen from './components/form/Initialise.tsx';
import CreateAccountScreen from './components/form/Create.tsx';
import ForgotPasswordScreen from './components/form/Forgot.tsx';
import HomeScreen from './components/portal/Home.tsx'

function App() {
  return (
    <Router>
      <Routes>
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
