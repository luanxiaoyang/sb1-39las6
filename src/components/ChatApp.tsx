import React from 'react';
import { ChatWindow } from './ChatWindow';
import { ScheduleManager } from './schedule/ScheduleManager';
import { Navigation } from './Navigation';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

export const ChatApp: React.FC = () => {
  const { isAuthenticated, loginAsGuest, user } = useAuthStore();
  const [currentView, setCurrentView] = useState<'chat' | 'schedule'>('chat');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Chat Support</h1>
          <button
            onClick={() => loginAsGuest()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  if (user?.role === 'user') {
    return <ChatWindow />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 overflow-hidden">
        {currentView === 'chat' ? <ChatWindow /> : <ScheduleManager />}
      </div>
    </div>
  );
};