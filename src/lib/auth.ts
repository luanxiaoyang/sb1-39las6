import { supabase } from './supabase';
import { User } from '../types/chat';
import { createHash } from 'crypto';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export async function signIn(email: string, password: string) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .eq('password_hash', hashPassword(password))
      .single();

    if (error) throw error;

    if (!profile) {
      throw new Error('Invalid email or password');
    }

    const user: User = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
      status: profile.status || 'offline',
      department: profile.department,
      specialization: profile.specialization,
      avatar: profile.avatar_url,
    };

    return { user, error: null };
  } catch (error) {
    return { user: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

export async function signOut() {
  // Simple signout - just clear local state
  return Promise.resolve();
}

export async function getCurrentUser() {
  return null; // We'll rely on the store's persisted state instead
}