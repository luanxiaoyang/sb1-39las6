import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useAgentStore } from '../store/useAgentStore';
import { AgentSelector } from './AgentSelector';

export const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState('');
  const { addMessage, isTyping } = useChatStore();
  const { user } = useAuthStore();
  const { selectedAgent } = useAgentStore();

  const handleSend = () => {
    if (!message.trim() || !user || !selectedAgent) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      content: message,
      type: 'text' as const,
      senderId: user.id,
      receiverId: selectedAgent.id,
      timestamp: new Date(),
      status: 'sent' as const,
    };

    addMessage(newMessage);
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Agent Selection Sidebar */}
      <div className="w-80 border-r bg-white overflow-y-auto">
        <AgentSelector />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          {selectedAgent ? (
            <div className="flex items-center space-x-4">
              <img
                src={selectedAgent.avatar}
                alt={selectedAgent.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold">{selectedAgent.name}</h2>
                <p className="text-sm text-gray-500">{selectedAgent.department}</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Please select an agent to start chatting</div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Messages will be rendered here */}
        </div>

        {/* Typing Indicator */}
        {isTyping && selectedAgent && (
          <div className="px-4 py-2 text-sm text-gray-500">
            {selectedAgent.name} is typing...
          </div>
        )}

        {/* Chat Input */}
        <div className="border-t bg-white p-4">
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={!selectedAgent}
            >
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={selectedAgent ? "Type your message..." : "Select an agent to start chatting"}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
              disabled={!selectedAgent}
            />
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={!selectedAgent}
            >
              <Mic className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={handleSend}
              disabled={!selectedAgent}
              className={`p-2 rounded-full ${
                selectedAgent
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};