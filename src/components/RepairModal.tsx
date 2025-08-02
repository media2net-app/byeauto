"use client";

import { useState } from "react";
import { CheckCircle, Wrench, Clock, FileText, ChevronDown, X } from "lucide-react";

interface RepairItem {
  id: string;
  name: string;
  description: string;
  materials: string[];
  cost: number;
  price: number;
  profit: number;
  status: "pending" | "in-progress" | "completed";
}

interface VehicleData {
  id: string;
  name: string;
  client: string;
  licensePlate: string;
  vin: string;
  mileage: string;
  repairs: RepairItem[];
  totalCost: number;
  totalPrice: number;
  totalProfit: number;
  profitMargin: number;
}

interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: VehicleData | null;
}

export default function RepairModal({ isOpen, onClose, vehicle }: RepairModalProps) {
  const [selectedRepair, setSelectedRepair] = useState<string | null>(null);

  if (!isOpen || !vehicle) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-900 text-green-300";
      case "in-progress":
        return "bg-blue-900 text-blue-300";
      case "pending":
        return "bg-yellow-900 text-yellow-300";
      default:
        return "bg-gray-900 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in-progress":
        return Wrench;
      case "pending":
        return Clock;
      default:
        return FileText;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">{vehicle.name}</h2>
            <p className="text-gray-400">Client: {vehicle.client}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vehicle Info */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <p className="text-sm text-gray-400">License Plate</p>
              <p className="text-white font-medium">{vehicle.licensePlate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">VIN</p>
              <p className="text-white font-mono text-sm">{vehicle.vin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Mileage</p>
              <p className="text-white font-medium">{vehicle.mileage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Repairs</p>
              <p className="text-white font-medium">{vehicle.repairs.length}</p>
            </div>
          </div>
        </div>

        {/* Repairs List */}
        <div className="px-4 sm:px-6 py-4">
          <h3 className="text-lg font-semibold text-white mb-4">Repair Details</h3>
          <div className="space-y-4">
            {vehicle.repairs.map((repair) => (
              <div
                key={repair.id}
                className={`border border-gray-700 rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedRepair === repair.id ? "bg-gray-800" : "bg-gray-800/50 hover:bg-gray-800"
                }`}
                onClick={() => setSelectedRepair(selectedRepair === repair.id ? null : repair.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const IconComponent = getStatusIcon(repair.status);
                      return <IconComponent className="w-5 h-5 text-green-400" />;
                    })()}
                    <h4 className="font-medium text-white">{repair.name}</h4>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(repair.status)}`}>
                      {repair.status.replace("-", " ")}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {selectedRepair === repair.id && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Description</p>
                      <p className="text-white text-sm">{repair.description}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-2">Materials Required</p>
                      <div className="flex flex-wrap gap-2">
                        {repair.materials.map((material, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div className="text-center p-3 bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-400">Material Cost</p>
                        <p className="text-white font-bold">€{repair.cost}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-400">Client Price</p>
                        <p className="text-white font-bold">€{repair.price}</p>
                      </div>
                      <div className="text-center p-3 bg-green-900 rounded-lg">
                        <p className="text-xs text-green-300">Profit</p>
                        <p className="text-green-300 font-bold">€{repair.profit}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-700 bg-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-400">Total Cost</p>
              <p className="text-white font-bold">€{vehicle.totalCost}</p>
            </div>
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-400">Total Price</p>
              <p className="text-white font-bold">€{vehicle.totalPrice}</p>
            </div>
            <div className="text-center p-3 bg-green-900 rounded-lg">
              <p className="text-xs text-green-300">Total Profit</p>
              <p className="text-green-300 font-bold">€{vehicle.totalProfit}</p>
            </div>
            <div className="text-center p-3 bg-purple-900 rounded-lg">
              <p className="text-xs text-purple-300">Profit Margin</p>
              <p className="text-purple-300 font-bold">{vehicle.profitMargin}%</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Edit Repairs
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
} 