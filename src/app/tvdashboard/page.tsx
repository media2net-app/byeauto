'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle, AlertCircle, PlayCircle, XCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  estimatedTime: string;
  assignedTo: string;
}

interface PlanningItem {
  id: string;
  time: string;
  description: string;
  type: 'appointment' | 'task' | 'break';
}

export default function TVDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'BMW X5 Motor Olie Vervangen',
      status: 'done',
      priority: 'high',
      estimatedTime: '1.5 uur',
      assignedTo: 'Jan'
    },
    {
      id: '2',
      title: 'Audi A4 Remmen Controleren',
      status: 'in-progress',
      priority: 'high',
      estimatedTime: '2 uur',
      assignedTo: 'Piet'
    },
    {
      id: '3',
      title: 'Mercedes C200 Diagnose',
      status: 'todo',
      priority: 'medium',
      estimatedTime: '1 uur',
      assignedTo: 'Klaas'
    },
    {
      id: '4',
      title: 'BMW 320d Airco Reparatie',
      status: 'todo',
      priority: 'low',
      estimatedTime: '3 uur',
      assignedTo: 'Jan'
    },
    {
      id: '5',
      title: 'Audi Q7 Banden Vervangen',
      status: 'in-progress',
      priority: 'medium',
      estimatedTime: '1 uur',
      assignedTo: 'Piet'
    }
  ]);

  const [planning] = useState<PlanningItem[]>([
    { id: '1', time: '09:00', description: 'Team Meeting', type: 'appointment' },
    { id: '2', time: '10:30', description: 'BMW X5 Olie Vervangen', type: 'task' },
    { id: '3', time: '12:00', description: 'Lunch Pauze', type: 'break' },
    { id: '4', time: '13:30', description: 'Audi A4 Remmen', type: 'task' },
    { id: '5', time: '15:00', description: 'Mercedes Diagnose', type: 'task' },
    { id: '6', time: '16:30', description: 'Dagelijkse Afsluiting', type: 'appointment' }
  ]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case 'todo':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getPlanningIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'task':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'break':
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'in-progress'),
    done: tasks.filter(task => task.status === 'done')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6">
      {/* Header met tijd en datum */}
      <div className="mb-8">
        <div className="text-center">
          <div className="text-6xl font-bold mb-2 font-mono">
            {formatTime(currentTime)}
          </div>
          <div className="text-2xl text-blue-200">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Planning voor vandaag */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-blue-100">Planning Vandaag</h2>
          <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {planning.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-shrink-0">
                  {getPlanningIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-blue-100">{item.time}</div>
                  <div className="text-sm text-blue-200">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-blue-100">Werkplaats Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-300px)]">
            {/* Te Doen */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-yellow-300">Te Doen</h3>
                <div className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold">
                  {filteredTasks.todo.length}
                </div>
              </div>
              <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                {filteredTasks.todo.map((task) => (
                  <div key={task.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{task.title}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{task.assignedTo}</span> • {task.estimatedTime}
                        </div>
                      </div>
                      {getStatusIcon(task.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Uitvoering */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-300">In Uitvoering</h3>
                <div className="bg-blue-500 text-blue-900 px-2 py-1 rounded-full text-sm font-bold">
                  {filteredTasks.inProgress.length}
                </div>
              </div>
              <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                {filteredTasks.inProgress.map((task) => (
                  <div key={task.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{task.title}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{task.assignedTo}</span> • {task.estimatedTime}
                        </div>
                      </div>
                      {getStatusIcon(task.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Klaar */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-300">Klaar</h3>
                <div className="bg-green-500 text-green-900 px-2 py-1 rounded-full text-sm font-bold">
                  {filteredTasks.done.length}
                </div>
              </div>
              <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                {filteredTasks.done.map((task) => (
                  <div key={task.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{task.title}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{task.assignedTo}</span> • {task.estimatedTime}
                        </div>
                      </div>
                      {getStatusIcon(task.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-blue-200 text-sm">
        BYE Auto Werkplaats Dashboard • Live Update
      </div>
    </div>
  );
}