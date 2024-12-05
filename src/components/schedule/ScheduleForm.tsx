import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAgentStore } from '../../store/useAgentStore';
import { useScheduleStore } from '../../store/useScheduleStore';
import type { ScheduleFormData } from '../../types/schedule';

const scheduleSchema = z.object({
  agentId: z.string().min(1, 'Please select an agent'),
  weekDay: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  isRecurring: z.boolean(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const ScheduleForm: React.FC = () => {
  const { agents } = useAgentStore();
  const { addSchedule } = useScheduleStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
  });

  const onSubmit = (data: ScheduleFormData) => {
    addSchedule(data.agentId, {
      weekDay: data.weekDay,
      shifts: [{
        start: data.startTime,
        end: data.endTime,
      }],
      isRecurring: data.isRecurring,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Agent</label>
        <select
          {...register('agentId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select an agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        {errors.agentId && (
          <p className="mt-1 text-sm text-red-600">{errors.agentId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Day of Week</label>
        <select
          {...register('weekDay')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
            <option key={day} value={day}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            {...register('startTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            {...register('endTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('isRecurring')}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 block text-sm text-gray-900">Recurring Schedule</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Schedule
      </button>
    </form>
  );
};