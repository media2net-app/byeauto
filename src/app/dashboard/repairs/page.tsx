"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Plus, Search, Filter, Wrench, Edit, Trash2, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Repair {
  id: string;
  vehicle: string;
  licensePlate: string;
  client: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "urgent";
  priority: "low" | "medium" | "high";
  startDate: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  cost: number;
  technician: string;
  notes: string;
}

export default function RepairsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const handleLogout = () => {
    router.push("/");
  };

  const repairs: Repair[] = [
    {
      id: "1",
      vehicle: "BMW X5 2020",
      licensePlate: "B-123-ABC",
      client: "Ion Popescu",
      description: "Engine diagnostic and electrical system repair",
      status: "completed",
      priority: "high",
      startDate: "2024-01-10",
      estimatedCompletion: "2024-01-15",
      actualCompletion: "2024-01-14",
      cost: 850,
      technician: "Mihai Popescu",
      notes: "Engine running smoothly after repair"
    },
    {
      id: "2",
      vehicle: "BMW 320i 2019",
      licensePlate: "B-456-DEF",
      client: "Maria Ionescu",
      description: "Brake system inspection and pad replacement",
      status: "in-progress",
      priority: "medium",
      startDate: "2024-01-20",
      estimatedCompletion: "2024-01-25",
      cost: 320,
      technician: "Alexandru Dumitrescu",
      notes: "Front brake pads need replacement"
    },
    {
      id: "3",
      vehicle: "BMW 520d 2021",
      licensePlate: "B-789-GHI",
      client: "Alexandru Dumitrescu",
      description: "Oil change and filter replacement",
      status: "completed",
      priority: "low",
      startDate: "2024-01-18",
      estimatedCompletion: "2024-01-18",
      actualCompletion: "2024-01-18",
      cost: 120,
      technician: "Elena Vasilescu",
      notes: "Regular maintenance completed"
    },
    {
      id: "4",
      vehicle: "BMW X3 2018",
      licensePlate: "B-012-JKL",
      client: "Elena Vasilescu",
      description: "Transmission inspection and fluid change",
      status: "urgent",
      priority: "high",
      startDate: "2024-01-22",
      estimatedCompletion: "2024-01-26",
      cost: 450,
      technician: "Mihai Popescu",
      notes: "Transmission showing signs of wear"
    }
  ];

  const filteredRepairs = repairs.filter(repair => {
    const matchesSearch = repair.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || repair.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || repair.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-900 text-green-300";
      case "in-progress": return "bg-blue-900 text-blue-300";
      case "pending": return "bg-yellow-900 text-yellow-300";
      case "urgent": return "bg-red-900 text-red-300";
      default: return "bg-gray-900 text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "urgent": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Repairs</h1>
                <p className="text-gray-400 mt-1">Manage repair orders and service history</p>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Repair</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search repairs by vehicle, client, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="urgent">Urgent</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Repairs List */}
          <div className="space-y-4">
            {filteredRepairs.map((repair) => (
              <div key={repair.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{repair.vehicle}</h3>
                      <p className="text-gray-400">{repair.licensePlate} • {repair.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(repair.status)}`}>
                      {repair.status.replace('-', ' ').charAt(0).toUpperCase() + repair.status.slice(1)}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(repair.priority)}`}>
                      {repair.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-white mb-2">{repair.description}</p>
                  <p className="text-sm text-gray-400">{repair.notes}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-gray-400 text-sm">Technician:</span>
                    <p className="text-white">{repair.technician}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Start Date:</span>
                    <p className="text-white">{repair.startDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Estimated:</span>
                    <p className="text-white">{repair.estimatedCompletion}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Cost:</span>
                    <p className="text-white font-medium">€{repair.cost}</p>
                  </div>
                </div>

                {repair.actualCompletion && (
                  <div className="mb-4 p-3 bg-green-900 border border-green-700 rounded-lg">
                    <p className="text-green-300 text-sm">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Completed on {repair.actualCompletion}
                    </p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-1">
                    <Edit className="w-4 h-4" />
                    <span>Update</span>
                  </button>
                  <button className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredRepairs.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No repairs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 