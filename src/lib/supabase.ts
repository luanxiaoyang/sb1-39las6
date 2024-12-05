import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zflzwezskibhrnyitxrf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmbHp3ZXpza2liaHJueWl0eHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNDgxNTUsImV4cCI6MjA0NzgyNDE1NX0.fsEWggzJPYXdHa5b0BXaNXEC7MFOb9184YkOrql1d7I';

export const supabase = createClient(supabaseUrl, supabaseKey);