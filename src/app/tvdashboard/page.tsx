"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWork } from "@/contexts/WorkContext";

export default function TVDashboard() {
  const { t } = useLanguage();
  const { workItems } = useWork();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', {
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

  // Work hours calculation
  const workStartHour = 8; // 8:00 AM
  const workEndHour = 17; // 5:00 PM
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  
  // Calculate remaining work hours today
  const isWorkDay = currentTime.getDay() >= 1 && currentTime.getDay() <= 5; // Monday to Friday
  const isWorkTime = currentHour >= workStartHour && currentHour < workEndHour;
  
  let remainingWorkHours = 0;
  let expectedEndTime = null;
  
  if (isWorkDay && isWorkTime) {
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const workEndInMinutes = workEndHour * 60;
    remainingWorkHours = (workEndInMinutes - currentTimeInMinutes) / 60;
  }

  // Calculate remaining work for today
  const remainingWorkItems = workItems.filter(item => 
    item.status === 'pending' || item.status === 'in-progress'
  );
  
  const remainingWorkTime = remainingWorkItems.reduce((sum, item) => {
    const time = parseFloat(item.estimatedTime.replace('h', ''));
    return sum + time;
  }, 0);

  // Calculate expected completion time
  if (remainingWorkTime > 0 && remainingWorkHours > 0) {
    const completionTimeInMinutes = currentTime.getTime() + (remainingWorkTime * 60 * 60 * 1000);
    expectedEndTime = new Date(completionTimeInMinutes);
  }

  // Check if overtime is needed
  const needsOvertime = expectedEndTime && expectedEndTime.getHours() >= workEndHour;
  const overtimeHours = expectedEndTime ? Math.max(0, expectedEndTime.getHours() - workEndHour) : 0;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header with Live Time and Date */}
      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">BYE AUTO</h1>
            <p className="text-2xl text-gray-300">Werkplaats Dashboard</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-white mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-2xl text-gray-300">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Work Hours & Overtime Alert */}
      {isWorkDay && (
        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Remaining Work Hours */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Nog te werken</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">Vandaag:</span>
                  <span className="text-3xl font-bold text-blue-400">
                    {remainingWorkHours.toFixed(1)}h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">Normale tijd:</span>
                  <span className="text-xl font-bold text-white">
                    {workStartHour}:00 - {workEndHour}:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">Status:</span>
                  <span className={`text-xl font-bold ${isWorkTime ? 'text-green-400' : 'text-red-400'}`}>
                    {isWorkTime ? 'Werkend' : 'Buiten werktijd'}
                  </span>
                </div>
              </div>
            </div>

            {/* Expected Completion */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Verwachte Klaar</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">Nog te doen:</span>
                  <span className="text-3xl font-bold text-yellow-400">
                    {remainingWorkTime.toFixed(1)}h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">Verwacht klaar:</span>
                  <span className={`text-2xl font-bold ${needsOvertime ? 'text-red-400' : 'text-green-400'}`}>
                    {expectedEndTime ? expectedEndTime.toLocaleTimeString('nl-NL', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg text-gray-300">Items wachtend:</span>
                  <span className="text-xl font-bold text-white">
                    {pendingItems.length + inProgressItems.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Overtime Alert */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Overwerk</h3>
              <div className="space-y-3">
                {needsOvertime ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-lg text-gray-300">Overwerk nodig:</span>
                      <span className="text-3xl font-bold text-red-400">
                        {overtimeHours.toFixed(1)}h
                      </span>
                    </div>
                    <div className="bg-red-900 border border-red-700 rounded-lg p-3">
                      <div className="text-lg font-bold text-red-200">
                        ⚠️ Overwerk tot {expectedEndTime?.toLocaleTimeString('nl-NL', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-sm text-red-300 mt-1">
                        Plan extra tijd in!
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-lg text-gray-300">Overwerk:</span>
                      <span className="text-3xl font-bold text-green-400">
                        0h
                      </span>
                    </div>
                    <div className="bg-green-900 border border-green-700 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-200">
                        ✅ Op schema
                      </div>
                      <div className="text-sm text-green-300 mt-1">
                        Geen overwerk nodig
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Planning Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Vandaag</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Totaal werk:</span>
              <span className="text-2xl font-bold text-white">{workItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Klaar:</span>
              <span className="text-2xl font-bold text-green-400">{completedItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Bezig:</span>
              <span className="text-2xl font-bold text-blue-400">{inProgressItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Wachtend:</span>
              <span className="text-2xl font-bold text-yellow-400">{pendingItems.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Team</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Marius:</span>
              <span className="text-xl font-bold text-white">{teamWorkload.Marius} taken</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Alexandru:</span>
              <span className="text-xl font-bold text-white">{teamWorkload.Alexandru} taken</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Vasile:</span>
              <span className="text-xl font-bold text-white">{teamWorkload.Vasile} taken</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Efficiëntie</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Gemiddelde tijd:</span>
              <span className="text-xl font-bold text-white">{avgTime.toFixed(1)}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Tijd bespaard:</span>
              <span className="text-xl font-bold text-green-400">+0.3h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg text-gray-300">Klanttevredenheid:</span>
              <span className="text-xl font-bold text-blue-400">98%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Urgent</h3>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completed */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-400">Klaar</h2>
            <div className="bg-green-600 text-white px-4 py-2 rounded-full text-xl font-bold">
              {completedItems.length}
            </div>
          </div>
          <div className="space-y-4">
            {completedItems.map(item => (
              <div key={item.id} className="bg-green-900 border border-green-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.vehicle}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(item.status)}`}>
                    Klaar
                  </span>
                </div>
                <p className="text-lg text-green-200 mb-2">{item.workType}</p>
                <p className="text-green-300 mb-2">Klant: {item.client}</p>
                <div className="flex justify-between text-sm text-green-300">
                  <span>Door: {item.assignedTo}</span>
                  <span>{item.startTime} - {item.endTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-blue-400">Bezig</h2>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-xl font-bold">
              {inProgressItems.length}
            </div>
          </div>
          <div className="space-y-4">
            {inProgressItems.map(item => (
              <div key={item.id} className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.vehicle}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(item.status)}`}>
                    Bezig
                  </span>
                </div>
                <p className="text-lg text-blue-200 mb-2">{item.workType}</p>
                <p className="text-blue-300 mb-2">Klant: {item.client}</p>
                <div className="flex justify-between text-sm text-blue-300 mb-2">
                  <span>Door: {item.assignedTo}</span>
                  <span>Gestart: {item.startTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-bold ${getPriorityColor(item.priority)}`}>
                    Prioriteit: {item.priority}
                  </span>
                  <span className="text-sm text-blue-300">Est: {item.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-yellow-400">Wachtend</h2>
            <div className="bg-yellow-600 text-white px-4 py-2 rounded-full text-xl font-bold">
              {pendingItems.length}
            </div>
          </div>
          <div className="space-y-4">
            {pendingItems.map(item => (
              <div key={item.id} className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.vehicle}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(item.status)}`}>
                    Wachtend
                  </span>
                </div>
                <p className="text-lg text-yellow-200 mb-2">{item.workType}</p>
                <p className="text-yellow-300 mb-2">Klant: {item.client}</p>
                <div className="flex justify-between text-sm text-yellow-300 mb-2">
                  <span>Toegewezen: {item.assignedTo}</span>
                  <span>Est: {item.estimatedTime}</span>
                </div>
                <div className={`text-sm font-bold ${getPriorityColor(item.priority)}`}>
                  Prioriteit: {item.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 