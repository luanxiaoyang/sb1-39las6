import { create } from 'zustand';
import { Schedule, WeekDay } from '../types/schedule';
import { format } from 'date-fns';

interface ScheduleState {
  schedules: Schedule[];
  isLoading: boolean;
  error: string | null;
  addSchedule: (agentId: string, schedule: Omit<Schedule, 'id'>) => void;
  removeSchedule: (scheduleId: string) => void;
  getAgentSchedules: (agentId: string) => Schedule[];
  getSchedulesByDay: (day: WeekDay) => Schedule[];
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  schedules: [],
  isLoading: false,
  error: null,

  addSchedule: (agentId, schedule) => {
    const newSchedule: Schedule = {
      ...schedule,
      id: `schedule-${Date.now()}`,
      agentId,
    };
    set((state) => ({
      schedules: [...state.schedules, newSchedule],
    }));
  },

  removeSchedule: (scheduleId) => {
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== scheduleId),
    }));
  },

  getAgentSchedules: (agentId) => {
    return get().schedules.filter((schedule) => schedule.agentId === agentId);
  },

  getSchedulesByDay: (day) => {
    return get().schedules.filter((schedule) => schedule.weekDay === day);
  },
}));