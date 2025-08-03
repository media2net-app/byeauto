"use client";

import { useState } from "react";
import { useWork, WorkItem } from "@/contexts/WorkContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Clock, User, Car } from "lucide-react";

export default function WorkManagement() {
  const router = useRouter();
  const { t } = useLanguage();
  const { workItems, addWorkItem, updateWorkItemStatus, updateWorkItem, deleteWorkItem, getTotalWorkHours, getTotalActualHours, getOverTimeHours } = useWork();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [newItem, setNewItem] = useState({
    vehicle: "",
    client: "",
    workType: "",
    priority: "medium" as WorkItem['priority'],
    estimatedTime: "",
    assignedTo: ""
  });

  const handleLogout = () => {
    router.push("/");
  };

  const handleAddItem = () => {
    addWorkItem({
      ...newItem,
      status: "pending"
    });
    setNewItem({
      vehicle: "",
      client: "",
      workType: "",
      priority: "medium",
      estimatedTime: "",
      assignedTo: ""
    });
    setIsAddModalOpen(false);
  };

  const handleEditItem = () => {
    if (selectedItem) {
      updateWorkItem(selectedItem.id, newItem);
      setIsEditModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Weet je zeker dat je deze taak wilt verwijderen?")) {
      deleteWorkItem(id);
    }
  };

  const handleStatusChange = (id: string, newStatus: WorkItem['status']) => {
    updateWorkItemStatus(id, newStatus);
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

  // Get time tracking data
  const totalWorkHours = getTotalWorkHours();
  const totalActualHours = getTotalActualHours();
  const totalOvertimeHours = getOverTimeHours();

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Werkbeheer</h1>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-green-400 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Real-time updates</span>
                </div>
                <div className="text-sm text-blue-400">
                  <span>Total: {totalWorkHours.toFixed(1)}h | </span>
                  <span>Efectiv: {totalActualHours.toFixed(1)}h | </span>
                  <span className="text-red-400">Overtime: {totalOvertimeHours.toFixed(1)}h</span>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nieuwe Taak</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Kanban Board */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-yellow-400">Wachtend</h2>
                <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {pendingItems.length}
                </div>
              </div>
              <div className="space-y-4">
                {pendingItems.map(item => (
                  <div key={item.id} className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{item.vehicle}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(item.id, 'in-progress')}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          Start
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setNewItem({
                              vehicle: item.vehicle,
                              client: item.client,
                              workType: item.workType,
                              priority: item.priority,
                              estimatedTime: item.estimatedTime,
                              assignedTo: item.assignedTo || ""
                            });
                            setIsEditModalOpen(true);
                          }}
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-yellow-200 text-sm mb-2">{item.workType}</p>
                    <p className="text-yellow-300 text-sm mb-2">Klant: {item.client}</p>
                    <div className="flex justify-between text-xs text-yellow-300">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {item.assignedTo}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.estimatedTime}
                      </span>
                    </div>
                    <div className={`text-xs font-bold mt-2 ${getPriorityColor(item.priority)}`}>
                      Prioriteit: {item.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-400">Bezig</h2>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {inProgressItems.length}
                </div>
              </div>
              <div className="space-y-4">
                {inProgressItems.map(item => (
                  <div key={item.id} className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{item.vehicle}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(item.id, 'completed')}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Klaar
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'pending')}
                          className="bg-yellow-600 text-white px-2 py-1 rounded text-xs hover:bg-yellow-700"
                        >
                          Terug
                        </button>
                      </div>
                    </div>
                    <p className="text-blue-200 text-sm mb-2">{item.workType}</p>
                    <p className="text-blue-300 text-sm mb-2">Klant: {item.client}</p>
                    <div className="flex justify-between text-xs text-blue-300 mb-2">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {item.assignedTo}
                      </span>
                      <span>Gestart: {item.startTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${getPriorityColor(item.priority)}`}>
                        Prioriteit: {item.priority}
                      </span>
                      <span className="text-xs text-blue-300">Est: {item.estimatedTime}</span>
                    </div>
                    {item.actualWorkHours && (
                      <div className="flex justify-between text-xs text-blue-300 mt-1">
                        <span>Efectiv: {item.actualWorkHours.toFixed(1)}h</span>
                        {item.isOverTime && (
                          <span className="text-red-400">+{item.overtimeHours?.toFixed(1)}h overtime</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-green-400">Klaar</h2>
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {completedItems.length}
                </div>
              </div>
              <div className="space-y-4">
                {completedItems.map(item => (
                  <div key={item.id} className="bg-green-900 border border-green-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{item.vehicle}</h3>
                      <button
                        onClick={() => handleStatusChange(item.id, 'in-progress')}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Herstart
                      </button>
                    </div>
                    <p className="text-green-200 text-sm mb-2">{item.workType}</p>
                    <p className="text-green-300 text-sm mb-2">Klant: {item.client}</p>
                    <div className="flex justify-between text-xs text-green-300">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {item.assignedTo}
                      </span>
                      <span>{item.startTime} - {item.endTime}</span>
                    </div>
                    {item.actualWorkHours && (
                      <div className="flex justify-between text-xs text-green-300 mt-1">
                        <span>Timp efectiv: {item.actualWorkHours.toFixed(1)}h</span>
                        <span>Estimat: {item.estimatedTime}</span>
                        {item.isOverTime && (
                          <span className="text-red-400">+{item.overtimeHours?.toFixed(1)}h</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Nieuwe Taak</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Voertuig"
                value={newItem.vehicle}
                onChange={(e) => setNewItem({...newItem, vehicle: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <input
                type="text"
                placeholder="Klant"
                value={newItem.client}
                onChange={(e) => setNewItem({...newItem, client: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <input
                type="text"
                placeholder="Werkzaamheid"
                value={newItem.workType}
                onChange={(e) => setNewItem({...newItem, workType: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <select
                value={newItem.priority}
                onChange={(e) => setNewItem({...newItem, priority: e.target.value as WorkItem['priority']})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              >
                <option value="low">Lage Prioriteit</option>
                <option value="medium">Gemiddelde Prioriteit</option>
                <option value="high">Hoge Prioriteit</option>
              </select>
              <input
                type="text"
                placeholder="Geschatte tijd (bijv. 2h)"
                value={newItem.estimatedTime}
                onChange={(e) => setNewItem({...newItem, estimatedTime: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <select
                value={newItem.assignedTo}
                onChange={(e) => setNewItem({...newItem, assignedTo: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              >
                <option value="">Selecteer teamlid</option>
                <option value="Marius">Marius</option>
                <option value="Alexandru">Alexandru</option>
                <option value="Vasile">Vasile</option>
              </select>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleAddItem}
                className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Toevoegen
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Taak Bewerken</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Voertuig"
                value={newItem.vehicle}
                onChange={(e) => setNewItem({...newItem, vehicle: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <input
                type="text"
                placeholder="Klant"
                value={newItem.client}
                onChange={(e) => setNewItem({...newItem, client: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <input
                type="text"
                placeholder="Werkzaamheid"
                value={newItem.workType}
                onChange={(e) => setNewItem({...newItem, workType: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <select
                value={newItem.priority}
                onChange={(e) => setNewItem({...newItem, priority: e.target.value as WorkItem['priority']})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              >
                <option value="low">Lage Prioriteit</option>
                <option value="medium">Gemiddelde Prioriteit</option>
                <option value="high">Hoge Prioriteit</option>
              </select>
              <input
                type="text"
                placeholder="Geschatte tijd (bijv. 2h)"
                value={newItem.estimatedTime}
                onChange={(e) => setNewItem({...newItem, estimatedTime: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              />
              <select
                value={newItem.assignedTo}
                onChange={(e) => setNewItem({...newItem, assignedTo: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
              >
                <option value="">Selecteer teamlid</option>
                <option value="Marius">Marius</option>
                <option value="Alexandru">Alexandru</option>
                <option value="Vasile">Vasile</option>
              </select>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleEditItem}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Opslaan
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 