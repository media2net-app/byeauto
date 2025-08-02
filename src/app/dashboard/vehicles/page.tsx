"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
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
  ]);

  const handleLogout = () => {
    router.push("/");
  };



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

  // Function handlers
  const handleAddVehicle = () => {
    setIsAddModalOpen(true);
  };

  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsViewModalOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
    }
  };

  const handleSaveVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Date.now().toString() // Simple ID generation
    };
    setVehicles([...vehicles, newVehicle]);
    setIsAddModalOpen(false);
  };

  const handleUpdateVehicle = (vehicleData: Vehicle) => {
    setVehicles(vehicles.map(v => v.id === vehicleData.id ? vehicleData : v));
    setIsEditModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">{t('vehicles')}</h1>
                  <p className="text-gray-400 mt-1">Manage your BMW fleet</p>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  <button 
                    onClick={handleAddVehicle}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Vehicle</span>
                  </button>
                </div>
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
                  <button 
                    onClick={() => handleViewVehicle(vehicle)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button 
                    onClick={() => handleEditVehicle(vehicle)}
                    className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
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

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <VehicleModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveVehicle}
          mode="add"
        />
      )}

      {/* View Vehicle Modal */}
      {isViewModalOpen && selectedVehicle && (
        <VehicleModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          vehicle={selectedVehicle}
          mode="view"
        />
      )}

      {/* Edit Vehicle Modal */}
      {isEditModalOpen && selectedVehicle && (
        <VehicleModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateVehicle}
          vehicle={selectedVehicle}
          mode="edit"
        />
      )}
    </div>
  );
}

// Vehicle Modal Component
interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (vehicle: Omit<Vehicle, 'id'>) => void;
  onUpdate?: (vehicle: Vehicle) => void;
  vehicle?: Vehicle;
  mode: 'add' | 'edit' | 'view';
}

function VehicleModal({ isOpen, onClose, onSave, onUpdate, vehicle, mode }: VehicleModalProps) {
  const [formData, setFormData] = useState({
    licensePlate: vehicle?.licensePlate || '',
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year || '',
    client: vehicle?.client || '',
    status: vehicle?.status || 'active' as Vehicle['status'],
    lastService: vehicle?.lastService || '',
    nextService: vehicle?.nextService || '',
    mileage: vehicle?.mileage || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'add' && onSave) {
      onSave(formData);
    } else if (mode === 'edit' && onUpdate && vehicle) {
      onUpdate({ ...formData, id: vehicle.id });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            {mode === 'add' ? 'Add New Vehicle' : mode === 'edit' ? 'Edit Vehicle' : 'Vehicle Details'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {mode === 'view' ? (
          // View Mode
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">License Plate</label>
              <p className="text-white">{vehicle?.licensePlate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Make</label>
              <p className="text-white">{vehicle?.make}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Model</label>
              <p className="text-white">{vehicle?.model}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
              <p className="text-white">{vehicle?.year}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Client</label>
              <p className="text-white">{vehicle?.client}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <p className="text-white">{vehicle?.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Last Service</label>
              <p className="text-white">{vehicle?.lastService}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Next Service</label>
              <p className="text-white">{vehicle?.nextService}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Mileage</label>
              <p className="text-white">{vehicle?.mileage}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          // Add/Edit Mode
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">License Plate</label>
              <input
                type="text"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Make</label>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => handleInputChange('make', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as Vehicle['status'])}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="completed">Completed</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Last Service</label>
              <input
                type="date"
                value={formData.lastService}
                onChange={(e) => handleInputChange('lastService', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Next Service</label>
              <input
                type="date"
                value={formData.nextService}
                onChange={(e) => handleInputChange('nextService', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Mileage</label>
              <input
                type="text"
                value={formData.mileage}
                onChange={(e) => handleInputChange('mileage', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., 45,000 km"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {mode === 'add' ? 'Add Vehicle' : 'Update Vehicle'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 