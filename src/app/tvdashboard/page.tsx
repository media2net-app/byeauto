"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWork, useWorkUpdates } from "@/contexts/WorkContext";
import { useOpeningHours } from "@/contexts/OpeningHoursContext";

export default function TVDashboard() {
  const { t } = useLanguage();
  const { workItems, getTotalWorkHours, getTotalActualHours, getOverTimeHours } = useWork();
  const { getCurrentDayHours, isCurrentlyOpen, getRemainingHoursToday, getWorkEndTime } = useOpeningHours();
  const lastUpdate = useWorkUpdates(); // Real-time updates
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUpdateIndicator, setShowUpdateIndicator] = useState(false);

  // Show update indicator when data changes
  useEffect(() => {
    setShowUpdateIndicator(true);
    const timer = setTimeout(() => setShowUpdateIndicator(false), 2000);
    return () => clearTimeout(timer);
  }, [lastUpdate]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ro-RO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in-progress': return 'bg-blue-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  // Helper function to format hours to minutes for better readability
  const formatTimeToMinutes = (hours: number) => {
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes}min`;
    } else {
      const wholeHours = Math.floor(hours);
      const remainingMinutes = Math.round((hours - wholeHours) * 60);
      if (remainingMinutes === 0) {
        return `${wholeHours}h`;
      } else {
        return `${wholeHours}h ${remainingMinutes}min`;
      }
    }
  };

  const completedItems = workItems.filter(item => item.status === 'completed');
  const inProgressItems = workItems.filter(item => item.status === 'in-progress');
  const pendingItems = workItems.filter(item => item.status === 'pending');

  // Calculate team workload
  const teamWorkload = {
    Marius: workItems.filter(item => item.assignedTo === 'Marius').length,
    Alexandru: workItems.filter(item => item.assignedTo === 'Alexandru').length,
    Vasile: workItems.filter(item => item.assignedTo === 'Vasile').length
  };

  // Calculate efficiency metrics
  const totalEstimatedTime = workItems.reduce((sum, item) => {
    const time = parseFloat(item.estimatedTime.replace('h', ''));
    return sum + time;
  }, 0);
  
  const avgTime = totalEstimatedTime / workItems.length || 0;

  // Get current day opening hours
  const currentDayHours = getCurrentDayHours();
  const isWorkDay = currentDayHours?.enabled || false;
  const isWorkTime = isCurrentlyOpen();
  
  // Calculate remaining work hours today
  let remainingWorkHours = getRemainingHoursToday();
  let expectedEndTime = null;

  // Calculate remaining work for today
  const remainingWorkItems = workItems.filter(item => 
    item.status === 'pending' || item.status === 'in-progress'
  );
  
  const remainingWorkTime = remainingWorkItems.reduce((sum, item) => {
    const time = parseFloat(item.estimatedTime.replace('h', ''));
    return sum + time;
  }, 0);

  // Get total work hours for the day
  const totalWorkHours = getTotalWorkHours();
  const totalActualHours = getTotalActualHours();
  const totalOvertimeHours = getOverTimeHours();

  // Calculate expected completion time
  if (remainingWorkTime > 0 && remainingWorkHours > 0) {
    const completionTimeInMinutes = currentTime.getTime() + (remainingWorkTime * 60 * 60 * 1000);
    expectedEndTime = new Date(completionTimeInMinutes);
  }

  // Check if overtime is needed
  const needsOvertime = expectedEndTime && currentDayHours && expectedEndTime.getHours() >= parseInt(currentDayHours.close.split(':')[0]);
  const overtimeHours = expectedEndTime && currentDayHours ? Math.max(0, expectedEndTime.getHours() - parseInt(currentDayHours.close.split(':')[0])) : 0;

  return (
    <div className="h-screen bg-black text-white p-4 overflow-hidden flex flex-col">
      {/* Update Indicator */}
      {showUpdateIndicator && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          🔄 Date actualizate
        </div>
      )}
      
      {/* Header with Live Time and Date */}
      <div className="bg-gray-900 rounded-xl p-3 mb-3 shadow-lg flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
                    <h1 className="text-3xl font-bold text-white mb-1">BYE AUTO</h1>
        <p className="text-lg text-gray-300">{t('workshop_dashboard')}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white mb-1">
              {formatTime(currentTime)}
            </div>
            <div className="text-lg text-gray-300">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Work Hours & Overtime Alert */}
      {isWorkDay && (
        <div className="mb-3 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {/* Remaining Work Hours */}
            <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">{t('remaining_work_hours')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('today')}:</span>
                  <span className="text-xl font-bold text-blue-400">
                    {formatTimeToMinutes(remainingWorkHours)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('normal_time')}:</span>
                  <span className="text-xl font-bold text-white">
                    {currentDayHours ? `${currentDayHours.open} - ${currentDayHours.close}` : t('closed')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('working_status')}:</span>
                  <span className={`text-xl font-bold ${isWorkTime ? 'text-green-400' : 'text-red-400'}`}>
                    {isWorkTime ? t('working') : t('outside_work_hours')}
                  </span>
                </div>
              </div>
            </div>

            {/* Expected Completion */}
            <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">{t('expected_completion')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('remaining_work')}:</span>
                  <span className="text-xl font-bold text-yellow-400">
                    {formatTimeToMinutes(remainingWorkTime)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('expected_finish')}:</span>
                  <span className={`text-2xl font-bold ${needsOvertime ? 'text-red-400' : 'text-green-400'}`}>
                    {expectedEndTime ? expectedEndTime.toLocaleTimeString('ro-RO', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('waiting_items')}:</span>
                  <span className="text-xl font-bold text-white">
                    {pendingItems.length + inProgressItems.length}
                  </span>
                </div>
                {needsOvertime && expectedEndTime && (
                  <div className="bg-red-900 border border-red-700 rounded-lg p-3 mt-3">
                    <div className="text-lg font-bold text-red-200">
                      ⚠️ {t('work_until')} {expectedEndTime.toLocaleTimeString('ro-RO', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-sm text-red-300 mt-1">
                      {formatTimeToMinutes(overtimeHours)} {t('overtime')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Overtime Alert */}
            <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">{t('overtime_alert')}</h3>
              <div className="space-y-3">
                {needsOvertime ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-lg text-gray-300">{t('overtime_needed')}:</span>
                      <span className="text-xl font-bold text-red-400">
                        {formatTimeToMinutes(overtimeHours)}
                      </span>
                    </div>
                    <div className="bg-red-900 border border-red-700 rounded-lg p-3">
                      <div className="text-lg font-bold text-red-200">
                        ⚠️ {t('overtime_until')} {expectedEndTime?.toLocaleTimeString('ro-RO', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-sm text-red-300 mt-1">
                        {t('plan_extra_time')}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-lg text-gray-300">{t('overtime_alert')}:</span>
                      <span className="text-3xl font-bold text-green-400">
                        0h
                      </span>
                    </div>
                    <div className="bg-green-900 border border-green-700 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-200">
                        ✅ {t('on_schedule')}
                      </div>
                      <div className="text-sm text-green-300 mt-1">
                        {t('no_overtime_needed')}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">{t('today_schedule')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('program')}:</span>
                  <span className="text-xl font-bold text-white">
                    {currentDayHours ? `${currentDayHours.open} - ${currentDayHours.close}` : t('closed')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('status')}:</span>
                  <span className={`text-xl font-bold ${isWorkTime ? 'text-green-400' : 'text-red-400'}`}>
                    {isWorkTime ? t('working') : t('outside_work_hours')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('remaining')}:</span>
                  <span className="text-xl font-bold text-blue-400">
                    {formatTimeToMinutes(remainingWorkHours)}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Registration */}
            <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">{t('time_registration')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('total_estimated')}:</span>
                  <span className="text-xl font-bold text-blue-400">
                    {formatTimeToMinutes(totalWorkHours)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('worked_actual')}:</span>
                  <span className="text-xl font-bold text-green-400">
                    {formatTimeToMinutes(totalActualHours)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('overtime_hours')}:</span>
                  <span className="text-xl font-bold text-red-400">
                    {formatTimeToMinutes(totalOvertimeHours)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">{t('efficiency_percentage')}:</span>
                  <span className={`text-xl font-bold ${totalActualHours > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                    {totalActualHours > 0 ? ((totalWorkHours / totalActualHours) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Planning Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-3 flex-shrink-0">
        <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">{t('today')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">{t('total_work')}:</span>
              <span className="text-2xl font-bold text-white">{workItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">{t('ready')}:</span>
              <span className="text-2xl font-bold text-green-400">{completedItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">{t('in_progress')}:</span>
              <span className="text-2xl font-bold text-blue-400">{inProgressItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">{t('waiting')}:</span>
              <span className="text-2xl font-bold text-yellow-400">{pendingItems.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">{t('team')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Marius:</span>
              <span className="text-xl font-bold text-white">{teamWorkload.Marius} {t('tasks')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Alexandru:</span>
              <span className="text-xl font-bold text-white">{teamWorkload.Alexandru} {t('tasks')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Vasile:</span>
              <span className="text-xl font-bold text-white">{teamWorkload.Vasile} {t('tasks')}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">{t('efficiency')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">{t('average_time')}:</span>
                              <span className="text-lg font-bold text-white">{formatTimeToMinutes(avgTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">{t('time_saved')}:</span>
              <span className="text-lg font-bold text-green-400">+{formatTimeToMinutes(0.3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">{t('customer_satisfaction')}:</span>
              <span className="text-xl font-bold text-blue-400">98%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-3 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">{t('urgent')}</h3>
          <div className="space-y-3">
            {workItems.filter(item => item.priority === 'high' && item.status !== 'completed').map(item => (
              <div key={item.id} className="bg-red-900 rounded-lg p-3">
                <div className="text-lg font-bold text-white">{item.vehicle}</div>
                <div className="text-sm text-red-200">{item.workType}</div>
                <div className="text-sm text-red-300">{item.assignedTo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0">
        {/* Completed */}
        <div className="bg-gray-900 rounded-xl p-3 shadow-lg flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h2 className="text-xl font-bold text-green-400">{t('ready')}</h2>
            <div className="bg-green-600 text-white px-2 py-1 rounded-full text-base font-bold">
              {completedItems.length}
            </div>
          </div>
          <div className="space-y-2 flex-1 grid grid-rows-3 gap-2">
            {completedItems.map(item => (
                              <div key={item.id} className="bg-green-900 border border-green-700 rounded-lg p-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-white">{item.vehicle}</h3>
                  <span className={`px-1 py-0.5 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                    {t('ready')}
                  </span>
                </div>
                <p className="text-xs text-green-200 mb-1">{item.workType}</p>
                <p className="text-xs text-green-300 mb-1">{t('client')}: {item.client}</p>
                <div className="flex justify-between text-xs text-green-300">
                  <span>{t('assigned_to')}: {item.assignedTo}</span>
                  <span>{item.startTime} - {item.endTime}</span>
                </div>
                {item.actualWorkHours && (
                  <div className="flex justify-between text-xs text-green-300 mt-1">
                    <span>{t('actual_time')}: {formatTimeToMinutes(item.actualWorkHours)}</span>
                    <span>{t('estimated')}: {item.estimatedTime}</span>
                    {item.isOverTime && (
                      <span className="text-red-400">+{formatTimeToMinutes(item.overtimeHours || 0)} {t('overtime')}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-gray-900 rounded-xl p-3 shadow-lg flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h2 className="text-xl font-bold text-blue-400">{t('in_progress')}</h2>
            <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-base font-bold">
              {inProgressItems.length}
            </div>
          </div>
          <div className="space-y-2 flex-1 grid grid-rows-3 gap-2">
            {inProgressItems.map(item => (
                              <div key={item.id} className="bg-blue-900 border border-blue-700 rounded-lg p-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-white">{item.vehicle}</h3>
                  <span className={`px-1 py-0.5 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                    {t('in_progress')}
                  </span>
                </div>
                <p className="text-xs text-blue-200 mb-1">{item.workType}</p>
                <p className="text-xs text-blue-300 mb-1">{t('client')}: {item.client}</p>
                <div className="flex justify-between text-xs text-blue-300 mb-1">
                  <span>{t('assigned_to')}: {item.assignedTo}</span>
                  <span>{t('started_at')}: {item.startTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${getPriorityColor(item.priority)}`}>
                    {t('priority')}: {t(item.priority)}
                  </span>
                  <span className="text-xs text-blue-300">{t('estimated_time')}: {item.estimatedTime}</span>
                </div>
                {item.actualStartTime && !item.actualEndTime && (
                  <div className="text-xs text-blue-300 mt-1">
                    {t('started_at')}: {item.startTime}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gray-900 rounded-xl p-3 shadow-lg flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h2 className="text-xl font-bold text-yellow-400">{t('waiting')}</h2>
            <div className="bg-yellow-600 text-white px-2 py-1 rounded-full text-base font-bold">
              {pendingItems.length}
            </div>
          </div>
          <div className="space-y-2 flex-1 grid grid-rows-3 gap-2">
            {pendingItems.map(item => (
                              <div key={item.id} className="bg-yellow-900 border border-yellow-700 rounded-lg p-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-white">{item.vehicle}</h3>
                  <span className={`px-1 py-0.5 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                    {t('waiting')}
                  </span>
                </div>
                <p className="text-xs text-yellow-200 mb-1">{item.workType}</p>
                <p className="text-xs text-yellow-300 mb-1">{t('client')}: {item.client}</p>
                <div className="flex justify-between text-xs text-yellow-300 mb-1">
                  <span>{t('assigned_to')}: {item.assignedTo}</span>
                  <span>{t('estimated_time')}: {item.estimatedTime}</span>
                </div>
                <div className={`text-xs font-bold ${getPriorityColor(item.priority)}`}>
                  {t('priority')}: {t(item.priority)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 