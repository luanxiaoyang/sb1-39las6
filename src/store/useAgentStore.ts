import { create } from 'zustand';
import { User } from '../types/chat';
import { supabase } from '../lib/supabase';
import { createHash } from 'crypto';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

interface AgentState {
  agents: User[];
  selectedAgent: User | null;
  setSelectedAgent: (agent: User | null) => void;
  addAgent: (agent: Partial<User>, password: string) => Promise<void>;
  removeAgent: (agentId: string) => Promise<void>;
  updateAgent: (agentId: string, updates: Partial<User>) => Promise<void>;
  updateAgentStatus: (agentId: string, status: 'online' | 'offline' | 'busy') => Promise<void>;
  fetchAgents: () => Promise<void>;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  selectedAgent: null,
  
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  
  addAgent: async (agent, password) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          name: agent.name,
          email: agent.email,
          role: 'agent',
          status: 'offline',
          department: agent.department,
          specialization: agent.specialization,
          avatar_url: agent.avatar,
          password_hash: hashPassword(password)
        }])
        .select()
        .single();

      if (error) throw error;

      const newAgent: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: 'agent',
        status: data.status,
        department: data.department,
        specialization: data.specialization,
        avatar: data.avatar_url,
      };

      set((state) => ({ agents: [...state.agents, newAgent] }));
    } catch (error) {
      console.error('Failed to add agent:', error);
      throw error;
    }
  },

  removeAgent: async (agentId) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', agentId);

      if (error) throw error;

      set((state) => ({
        agents: state.agents.filter(agent => agent.id !== agentId)
      }));
    } catch (error) {
      console.error('Failed to remove agent:', error);
      throw error;
    }
  },

  updateAgent: async (agentId, updates) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          email: updates.email,
          department: updates.department,
          specialization: updates.specialization,
          avatar_url: updates.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('id', agentId);

      if (error) throw error;

      set((state) => ({
        agents: state.agents.map(agent =>
          agent.id === agentId ? { ...agent, ...updates } : agent
        )
      }));
    } catch (error) {
      console.error('Failed to update agent:', error);
      throw error;
    }
  },

  updateAgentStatus: async (agentId, status) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', agentId);

      if (error) throw error;

      set((state) => ({
        agents: state.agents.map(agent =>
          agent.id === agentId ? { ...agent, status } : agent
        )
      }));
    } catch (error) {
      console.error('Failed to update agent status:', error);
      throw error;
    }
  },

  fetchAgents: async () => {
    try {
      const { data: agents, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'agent');

      if (error) throw error;

      set({ agents: agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        email: agent.email,
        role: 'agent',
        status: agent.status,
        department: agent.department,
        specialization: agent.specialization,
        avatar: agent.avatar_url,
      })) });
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      throw error;
    }
  },
}));