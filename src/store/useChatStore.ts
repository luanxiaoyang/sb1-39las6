import { create } from 'zustand';
import { Message, ChatSession } from '../types/chat';
import { supabase } from '../lib/supabase';

interface ChatState {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Message) => Promise<void>;
  setTyping: (typing: boolean) => void;
  startNewSession: () => Promise<void>;
  fetchMessages: (sessionId: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentSession: null,
  sessions: [],
  messages: [],
  isTyping: false,

  addMessage: async (message) => {
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          content: message.content,
          type: message.type,
          sender_id: message.senderId,
          receiver_id: message.receiverId,
          session_id: get().currentSession?.id,
          status: message.status,
          metadata: message.metadata
        }]);

      if (error) throw error;

      set((state) => ({
        messages: [...state.messages, message],
      }));
    } catch (error) {
      console.error('Failed to add message:', error);
      throw error;
    }
  },

  setTyping: (typing) => {
    set({ isTyping: typing });
  },

  startNewSession: async () => {
    try {
      const { data: session, error } = await supabase
        .from('chat_sessions')
        .insert([{
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      const newSession: ChatSession = {
        id: session.id,
        participants: [],
        messages: [],
        createdAt: new Date(session.created_at),
        updatedAt: new Date(session.updated_at),
        status: 'active',
      };

      set((state) => ({
        currentSession: newSession,
        sessions: [...state.sessions, newSession],
      }));
    } catch (error) {
      console.error('Failed to start new session:', error);
      throw error;
    }
  },

  fetchMessages: async (sessionId: string) => {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      set({ messages: messages as Message[] });
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw error;
    }
  },
}));