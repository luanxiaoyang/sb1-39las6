import React from 'react';
import { MessageSquare, Calendar, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface NavigationProps {
  currentView: 'chat' | 'schedule';
  onViewChange: (view: 'chat' | 'schedule') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuthStore();

  if (!user || user.role === 'user') return null;

  return (
    <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onViewChange('chat')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            currentView === 'chat'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </button>
        <button
          onClick={() => onViewChange('schedule')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            currentView === 'schedule'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Schedule</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32'}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};