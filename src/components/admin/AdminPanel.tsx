import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/useAdminAuthStore';
import { useAgentStore } from '../../store/useAgentStore';
import { LogOut, UserPlus, Users, Trash2 } from 'lucide-react';
import { AddAgentForm } from './AddAgentForm';
import type { User } from '../../types/chat';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogout } = useAdminAuthStore();
  const { agents, addAgent, removeAgent, updateAgentStatus } = useAgentStore();
  const [showAddAgentForm, setShowAddAgentForm] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate('/cigar/login');
  };

  const handleAddAgent = (agentData: Partial<User>) => {
    addAgent(agentData as User);
    setShowAddAgentForm(false);
  };

  const handleRemoveAgent = (agentId: string) => {
    if (window.confirm('Are you sure you want to remove this agent?')) {
      removeAgent(agentId);
    }
  };

  const handleStatusChange = (agentId: string, status: 'online' | 'offline' | 'busy') => {
    updateAgentStatus(agentId, status);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-500" />
              <span className="ml-2 text-lg font-semibold">Admin Panel</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Agent Management</h2>
              <button 
                onClick={() => setShowAddAgentForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Agent
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {agents.map((agent) => (
                  <li key={agent.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={agent.avatar}
                          alt={agent.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.department}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <select
                          value={agent.status}
                          onChange={(e) => handleStatusChange(agent.id, e.target.value as 'online' | 'offline' | 'busy')}
                          className="text-sm border-gray-300 rounded-md"
                        >
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                          <option value="busy">Busy</option>
                        </select>
                        <button
                          onClick={() => handleRemoveAgent(agent.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showAddAgentForm && (
        <AddAgentForm
          onSubmit={handleAddAgent}
          onClose={() => setShowAddAgentForm(false)}
        />
      )}
    </div>
  );
};