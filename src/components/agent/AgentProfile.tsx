import React, { useState } from 'react';
import { useAgentAuthStore } from '../../store/useAgentAuthStore';
import { Camera } from 'lucide-react';

export const AgentProfile: React.FC = () => {
  const { agent, updateAgentProfile } = useAgentAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: agent?.name || '',
    email: agent?.email || '',
    department: agent?.department || '',
    specialization: agent?.specialization || '',
  });

  if (!agent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAgentProfile(formData);
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    // Generate a new avatar using DiceBear
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}-${Date.now()}`;
    updateAgentProfile({ avatar: newAvatar });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              onClick={handleAvatarChange}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
              title="Change avatar"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Sales">Sales</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Customer Support">Customer Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1">{agent.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{agent.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Department</h3>
              <p className="mt-1">{agent.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Specialization</h3>
              <p className="mt-1">{agent.specialization}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};