import React from 'react';
import { useAgentStore } from '../../store/useAgentStore';
import { ScheduleForm } from './ScheduleForm';
import { ScheduleCalendar } from './ScheduleCalendar';

export const ScheduleManager: React.FC = () => {
  const { agents } = useAgentStore();

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Agent Scheduling</h1>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Add New Schedule</h2>
          <ScheduleForm />
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <ScheduleCalendar agents={agents} />
        </div>
      </div>
    </div>
  );
};