import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChatApp } from './components/ChatApp';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLogin } from './components/admin/AdminLogin';
import { AgentLogin } from './components/agent/AgentLogin';
import { AgentProfile } from './components/agent/AgentProfile';
import { useAdminAuthStore } from './store/useAdminAuthStore';
import { useAgentAuthStore } from './store/useAgentAuthStore';

function App() {
  const { isAdminAuthenticated } = useAdminAuthStore();
  const { isAgentAuthenticated } = useAgentAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ChatApp />} />
        
        {/* Admin routes */}
        <Route
          path="/cigar"
          element={
            isAdminAuthenticated ? (
              <AdminPanel />
            ) : (
              <Navigate to="/cigar/login" replace />
            )
          }
        />
        <Route path="/cigar/login" element={<AdminLogin />} />
        
        {/* Agent routes */}
        <Route
          path="/agent/dashboard"
          element={
            isAgentAuthenticated ? (
              <ChatApp />
            ) : (
              <Navigate to="/agent/login" replace />
            )
          }
        />
        <Route
          path="/agent/profile"
          element={
            isAgentAuthenticated ? (
              <AgentProfile />
            ) : (
              <Navigate to="/agent/login" replace />
            )
          }
        />
        <Route path="/agent/login" element={<AgentLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;