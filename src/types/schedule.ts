import { User } from './chat';

export type ShiftTime = {
  start: string; // HH:mm format
  end: string;   // HH:mm format
};

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface Schedule {
  id: string;
  agentId: string;
  weekDay: WeekDay;
  shifts: ShiftTime[];
  isRecurring: boolean;
  startDate?: string;  // YYYY-MM-DD format
  endDate?: string;    // YYYY-MM-DD format
}

export interface ScheduleFormData {
  weekDay: WeekDay;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  startDate?: string;
  endDate?: string;
}