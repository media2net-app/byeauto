"use client";

import { useState, useEffect, useRef } from "react";
import { useWork, WorkItem } from "@/contexts/WorkContext";
import { useTranslations } from "next-intl";
import { Play, Pause, Square, Clock, Car, User } from "lucide-react";

type TimerState = 'idle' | 'running' | 'paused';

interface TimerData {
  startTime: Date | null;
  pauseTime: Date | null;
  totalPausedTime: number; // in milliseconds
  currentSessionStart: Date | null;
}

export default function WorkTimer() {
  const t = useTranslations();
  const { workItems, updateWorkItemStatus } = useWork();
  const [selectedWorkItem, setSelectedWorkItem] = useState<WorkItem | null>(null);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [elapsedTime, setElapsedTime] = useState(0); // in milliseconds
  const [timerData, setTimerData] = useState<TimerData>({
    startTime: null,
    pauseTime: null,
    totalPausedTime: 0,
    currentSessionStart: null
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get available work items (pending and in-progress)
  const availableWorkItems = workItems.filter(item => 
    item.status === 'pending' || item.status === 'in-progress'
  );

  // Get waiting cars count
  const waitingCars = workItems.filter(item => item.status === 'pending');
  const inProgressCars = workItems.filter(item => item.status === 'in-progress');

  // Format time display
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Start timer
  const startTimer = () => {
    if (!selectedWorkItem) return;

    const now = new Date();
    setTimerState('running');
    setTimerData(prev => ({
      ...prev,
      startTime: prev.startTime || now,
      currentSessionStart: now,
      pauseTime: null
    }));

    // Update work item status to in-progress if it was pending
    if (selectedWorkItem.status === 'pending') {
      updateWorkItemStatus(selectedWorkItem.id, 'in-progress');
    }
  };

  // Pause timer
  const pauseTimer = () => {
    if (timerState !== 'running') return;

    const now = new Date();
    setTimerState('paused');
    setTimerData(prev => ({
      ...prev,
      pauseTime: now,
      totalPausedTime: prev.totalPausedTime + (now.getTime() - (prev.currentSessionStart?.getTime() || 0))
    }));
  };

  // Stop timer
  const stopTimer = () => {
    if (!selectedWorkItem) return;

    const now = new Date();
    setTimerState('idle');
    
    // Calculate final elapsed time
    const finalElapsedTime = elapsedTime + (now.getTime() - (timerData.currentSessionStart?.getTime() || 0));
    
    // Update work item with completion and actual work time
    updateWorkItemStatus(selectedWorkItem.id, 'completed');
    
    // Reset timer
    setElapsedTime(0);
    setTimerData({
      startTime: null,
      pauseTime: null,
      totalPausedTime: 0,
      currentSessionStart: null
    });
    setSelectedWorkItem(null);
  };

  // Update elapsed time
  useEffect(() => {
    if (timerState === 'running') {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => {
          const now = new Date();
          const sessionStart = timerData.currentSessionStart || now;
          const sessionElapsed = now.getTime() - sessionStart.getTime();
          return prev + sessionElapsed;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState, timerData.currentSessionStart]);

  // Auto-select first available work item
  useEffect(() => {
    if (availableWorkItems.length > 0 && !selectedWorkItem) {
      setSelectedWorkItem(availableWorkItems[0]);
    }
  }, [availableWorkItems, selectedWorkItem]);

  // Get background color based on timer state
  const getBackgroundColor = () => {
    switch (timerState) {
      case 'idle': return 'bg-green-600';
      case 'running': return 'bg-orange-500';
      case 'paused': return 'bg-red-600';
      default: return 'bg-green-600';
    }
  };

  // Get button color based on timer state
  const getButtonColor = () => {
    switch (timerState) {
      case 'idle': return 'bg-green-700 hover:bg-green-800';
      case 'running': return 'bg-orange-600 hover:bg-orange-700';
      case 'paused': return 'bg-red-700 hover:bg-red-800';
      default: return 'bg-green-700 hover:bg-green-800';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundColor()} transition-colors duration-500 flex flex-col`}>
      {/* Header */}
      <div className="p-6 text-white">
        <h1 className="text-4xl font-bold text-center mb-2">BYE AUTO</h1>
        <p className="text-xl text-center opacity-90 mb-4">{t('work_timer')}</p>
        
        {/* Queue Status */}
        <div className="flex justify-center space-x-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{waitingCars.length}</div>
            <div className="text-sm opacity-90">{t('waiting')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{inProgressCars.length}</div>
            <div className="text-sm opacity-90">{t('in_progress')}</div>
          </div>
        </div>
      </div>

      {/* Work Item Selection */}
      <div className="px-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Car className="w-6 h-6 mr-2" />
            {t('selected_vehicle')}
          </h2>
          
          {selectedWorkItem ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg font-medium">{selectedWorkItem.vehicle}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                  {selectedWorkItem.status === 'in-progress' ? t('in_progress') : t('pending')}
                </span>
              </div>
              <div className="text-white/90">
                <div className="flex items-center mb-1">
                  <User className="w-4 h-4 mr-2" />
                  <span>{t('client')}: {selectedWorkItem.client}</span>
                </div>
                <div className="flex items-center mb-1">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{t('work_type')}: {selectedWorkItem.workType}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">{t('assigned_to')}: {selectedWorkItem.assignedTo}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white/70 text-center py-4">
              {t('no_work_items_available')}
            </div>
          )}
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
          <div className="text-center">
            <div className="text-8xl font-mono font-bold text-white mb-8">
              {formatTime(elapsedTime)}
            </div>
            
            {/* Timer Controls */}
            <div className="flex justify-center space-x-4">
              {timerState === 'idle' && (
                <button
                  onClick={startTimer}
                  disabled={!selectedWorkItem}
                  className={`${getButtonColor()} text-white px-8 py-4 rounded-xl text-xl font-bold flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Play className="w-6 h-6" />
                  <span>{t('start')}</span>
                </button>
              )}
              
              {timerState === 'running' && (
                <>
                  <button
                    onClick={pauseTimer}
                    className={`${getButtonColor()} text-white px-8 py-4 rounded-xl text-xl font-bold flex items-center space-x-2 transition-all duration-200`}
                  >
                    <Pause className="w-6 h-6" />
                    <span>{t('pause')}</span>
                  </button>
                  <button
                    onClick={stopTimer}
                    className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-xl text-xl font-bold flex items-center space-x-2 transition-all duration-200"
                  >
                    <Square className="w-6 h-6" />
                    <span>{t('stop')}</span>
                  </button>
                </>
              )}
              
              {timerState === 'paused' && (
                <>
                  <button
                    onClick={startTimer}
                    className={`${getButtonColor()} text-white px-8 py-4 rounded-xl text-xl font-bold flex items-center space-x-2 transition-all duration-200`}
                  >
                    <Play className="w-6 h-6" />
                    <span>{t('resume')}</span>
                  </button>
                  <button
                    onClick={stopTimer}
                    className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-xl text-xl font-bold flex items-center space-x-2 transition-all duration-200"
                  >
                    <Square className="w-6 h-6" />
                    <span>{t('stop')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">
                {timerState === 'idle' && t('ready_to_start')}
                {timerState === 'running' && t('work_in_progress')}
                {timerState === 'paused' && t('work_paused')}
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm opacity-75">
              {selectedWorkItem && (
                <span>{t('estimated_time')}: {selectedWorkItem.estimatedTime}</span>
              )}
              <span className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                {t('waiting')}: {waitingCars.length}
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                {t('in_progress')}: {inProgressCars.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 