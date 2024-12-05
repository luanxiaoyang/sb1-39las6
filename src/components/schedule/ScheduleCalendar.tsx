import React from 'react';
import { useScheduleStore } from '../../store/useScheduleStore';
import type { User, WeekDay } from '../../types/chat';

interface ScheduleCalendarProps {
  agents: User[];
}

const weekDays: WeekDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ agents }) => {
  const { schedules } = useScheduleStore();

  const getScheduleForSlot = (agentId: string, day: WeekDay, time: string) => {
    return schedules.find(schedule => 
      schedule.agentId === agentId &&
      schedule.weekDay === day &&
      schedule.shifts.some(shift => {
        const slotTime = parseInt(time.split(':')[0], 10);
        const startTime = parseInt(shift.start.split(':')[0], 10);
        const endTime = parseInt(shift.end.split(':')[0], 10);
        return slotTime >= startTime && slotTime < endTime;
      })
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-50">Time</th>
            {weekDays.map(day => (
              <th key={day} className="border p-2 bg-gray-50">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td className="border p-2 bg-gray-50 font-medium">{time}</td>
              {weekDays.map(day => (
                <td key={`${day}-${time}`} className="border p-2">
                  <div className="space-y-1">
                    {agents.map(agent => {
                      const schedule = getScheduleForSlot(agent.id, day, time);
                      return schedule ? (
                        <div
                          key={agent.id}
                          className="text-xs p-1 rounded bg-blue-100 text-blue-800"
                        >
                          {agent.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};