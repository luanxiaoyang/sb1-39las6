import React, { useEffect } from 'react';
import { useAgentStore } from '../store/useAgentStore';

export const AgentSelector: React.FC = () => {
  const { agents, selectedAgent, setSelectedAgent, fetchAgents } = useAgentStore();

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return (
    <div className="bg-white p-4 border-b">
      <h3 className="text-lg font-semibold mb-4">Available Agents</h3>
      <div className="grid grid-cols-1 gap-4">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
              selectedAgent?.id === agent.id
                ? 'bg-blue-50 border-blue-500'
                : 'hover:bg-gray-50 border-transparent'
            } border`}
          >
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{agent.name}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    agent.status === 'online'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {agent.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{agent.department}</p>
              <p className="text-xs text-gray-400">{agent.specialization}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};