import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/chat';
import { supabase } from '../lib/supabase';

interface AgentAuthState {
  agent: User | null;
  isAgentAuthenticated: boolean;
  agentLogin: (email: string, password: string) => Promise<boolean>;
  agentLogout: () => void;
  updateAgentProfile: (updates: Partial<User>) => void;
}

export const useAgentAuthStore = create<AgentAuthState>()(
  persist(
    (set) => ({
      agent: null,
      isAgentAuthenticated: false,

      agentLogin: async (email: string, password: string) => {
        try {
          // First, try to sign in with Supabase auth
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (authError) throw authError;

          if (authData.user) {
            // Fetch the agent's profile from the profiles table
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authData.user.id)
              .eq('role', 'agent')
              .single();

            if (profileError) throw profileError;

            if (profileData) {
              const agent: User = {
                id: profileData.id,
                name: profileData.name,
                email: profileData.email,
                role: 'agent',
                status: profileData.status || 'offline',
                department: profileData.department,
                specialization: profileData.specialization,
                avatar: profileData.avatar_url,
              };

              set({ agent, isAgentAuthenticated: true });
              return true;
            }
          }
          return false;
        } catch (error) {
          console.error('Agent login failed:', error);
          return false;
        }
      },

      agentLogout: async () => {
        try {
          await supabase.auth.signOut();
          set({ agent: null, isAgentAuthenticated: false });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },

      updateAgentProfile: async (updates: Partial<User>) => {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              name: updates.name,
              email: updates.email,
              department: updates.department,
              specialization: updates.specialization,
              avatar_url: updates.avatar,
              updated_at: new Date().toISOString(),
            })
            .eq('id', get().agent?.id);

          if (error) throw error;

          set((state) => ({
            agent: state.agent ? { ...state.agent, ...updates } : null,
          }));
        } catch (error) {
          console.error('Failed to update profile:', error);
          throw error;
        }
      },
    }),
    {
      name: 'agent-auth',
    }
  )
);