"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Plus, Search, Filter, Car, Edit, Trash2, Eye } from "lucide-react";

interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: string;
  client: string;
  status: "active" | "maintenance" | "completed" | "urgent";
  lastService: string;
  nextService: string;
  mileage: string;
}

export default function VehiclesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogout = () => {
    router.push("/");
  };

  const vehicles: Vehicle[] = [
    {
      id: "1",
      licensePlate: "B-123-ABC",
      make: "BMW",
      model: "X5",
      year: "2020",
      client: "Ion Popescu",
      status: "active",
      lastService: "2024-01-15",
      nextService: "2024-07-15",
      mileage: "45,000 km"
    },
    {
      id: "2",
      licensePlate: "B-456-DEF",
      make: "BMW",
      model: "320i",
      year: "2019",
      client: "Maria Ionescu",
      status: "maintenance",
      lastService: "2024-02-20",
      nextService: "2024-08-20",
      mileage: "38,000 km"
    },
    {
      id: "3",
      licensePlate: "B-789-GHI",
      make: "BMW",
      model: "520d",
      year: "2021",
      client: "Alexandru Dumitrescu",
      status: "completed",
      lastService: "2024-03-10",
      nextService: "2024-09-10",
      mileage: "52,000 km"
    },
    {
      id: "4",
      licensePlate: "B-012-JKL",
      make: "BMW",
      model: "X3",
      year: "2018",
      client: "Elena Vasilescu",
      status: "urgent",
      lastService: "2024-01-05",
      nextService: "2024-07-05",
      mileage: "67,000 km"
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-900 text-green-300";
      case "maintenance": return "bg-yellow-900 text-yellow-300";
      case "completed": return "bg-blue-900 text-blue-300";
      case "urgent": return "bg-red-900 text-red-300";
      default: return "bg-gray-900 text-gray-300";
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
                <h1 className="text-2xl font-bold text-white">Vehicles</h1>
                <p className="text-gray-400 mt-1">Manage your BMW fleet</p>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
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
                placeholder="Search vehicles by license plate, client, or model..."
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
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="completed">Completed</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-gray-400">{vehicle.year}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">License Plate:</span>
                    <span className="text-white font-medium">{vehicle.licensePlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Client:</span>
                    <span className="text-white">{vehicle.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mileage:</span>
                    <span className="text-white">{vehicle.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Service:</span>
                    <span className="text-white">{vehicle.lastService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Service:</span>
                    <span className="text-white">{vehicle.nextService}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-1">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No vehicles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 