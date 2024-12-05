export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role: 'user' | 'agent' | 'admin';
  status?: 'online' | 'offline' | 'busy';
  department?: string;
  specialization?: string;
}

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'file' | 'audio';
  senderId: string;
  receiverId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  metadata?: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    duration?: number;
  };
}

export interface ChatSession {
  id: string;
  participants: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed' | 'pending';
  agentId?: string;
}