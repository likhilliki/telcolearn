import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { tlcService } from './services/tlc';

// Pages
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { Quiz } from './pages/Quiz';
import { Games } from './pages/Games';
import { Wallet } from './pages/Wallet';
import { Redeem } from './pages/Redeem';
import { Leaderboard } from './pages/Leaderboard';
import { Admin } from './pages/Admin';
import { Docs } from './pages/Docs';

function App() {
  const user = tlcService.getCurrentUser();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/onboarding" 
            element={user && !user.selectedTrack ? <Onboarding /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/courses" 
            element={user ? <Courses /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/quiz" 
            element={user ? <Quiz /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/games" 
            element={user ? <Games /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/wallet" 
            element={user ? <Wallet /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/redeem" 
            element={user ? <Redeem /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/leaderboard" 
            element={user ? <Leaderboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/admin" 
            element={user ? <Admin /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/docs" 
            element={<Docs />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;