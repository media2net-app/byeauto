"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import RepairModal from "@/components/RepairModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface VehicleData {
  id: string;
  name: string;
  client: string;
  licensePlate: string;
  vin: string;
  mileage: string;
  repairs: Array<{
    id: string;
    name: string;
    description: string;
    materials: string[];
    cost: number;
    price: number;
    profit: number;
    status: "pending" | "in-progress" | "completed";
  }>;
  totalCost: number;
  totalPrice: number;
  totalProfit: number;
  profitMargin: number;
}

export default function TVDashboard() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicles = [
    { id: "bmw1", name: "BMW X5 2020", client: "Ion Popescu", status: t('in_service'), priority: t('high_priority'), indicator: t('active_repairs'), type: "active" },
    { id: "bmw2", name: "BMW 320i 2019", client: "Maria Ionescu", status: t('waiting'), priority: t('medium_priority'), indicator: t('scheduled'), type: "maintenance" },
    { id: "bmw3", name: "BMW 520d 2021", client: "Alexandru Dumitrescu", status: t('completed'), priority: t('low_priority'), indicator: t('ready_for_delivery'), type: "completed" },
    { id: "bmw4", name: "BMW X3 2018", client: "Elena Vasilescu", status: t('diagnostic'), priority: t('high_priority'), indicator: t('urgent'), type: "urgent" },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  const handleVehicleClick = (vehicleId: string) => {
    // Simulate fetching vehicle data
    const vehicleData = {
      id: vehicleId,
      name: vehicles.find(v => v.id === vehicleId)?.name || "",
      client: vehicles.find(v => v.id === vehicleId)?.client || "",
      licensePlate: "B-123-ABC",
      vin: "WBA12345678901234",
      mileage: "45,000 km",
      repairs: [
        {
          id: "repair1",
          name: "Oil Change & Filters",
          description: "Complete oil change with new oil filter and air filter replacement",
          materials: ["5W-30 Oil", "Oil Filter", "Air Filter", "Drain Plug Gasket"],
          cost: 45,
          price: 120,
          profit: 75,
          status: "completed" as const
        },
        {
          id: "repair2",
          name: "Brake Pad Replacement",
          description: "Front brake pad replacement with brake fluid check",
          materials: ["Front Brake Pads", "Brake Cleaner", "Brake Fluid"],
          cost: 85,
          price: 180,
          profit: 95,
          status: "in-progress" as const
        },
        {
          id: "repair3",
          name: "Electrical System Diagnostic",
          description: "Complete electrical system check and battery test",
          materials: ["Diagnostic Tool", "Battery Tester", "Multimeter"],
          cost: 30,
          price: 150,
          profit: 120,
          status: "pending" as const
        }
      ],
      totalCost: 160,
      totalPrice: 450,
      totalProfit: 290,
      profitMargin: 64
    };
    
    setSelectedVehicle(vehicleData);
    setIsModalOpen(true);
  };

  const stats = [
    { name: t('vehicles_in_service'), value: "12", change: `+3 ${t('this_week')}`, changeType: "positive" },
    { name: t('avg_repair_time'), value: "2.5h", change: `-0.3h ${t('vs_last_week')}`, changeType: "positive" },
    { name: t('repairs_in_progress'), value: "8", change: `+2 ${t('this_week')}`, changeType: "positive" },
    { name: t('monthly_revenue'), value: "€8,450", change: `+12% ${t('vs_last_month')}`, changeType: "positive" },
  ];

  const recentActivity = [
    { id: 1, action: t('bmw_x5_repair_completed'), vehicle: t('engine_diagnostic_finished'), time: t('1_hour_ago') },
    { id: 2, action: t('new_bmw_320i_arrived'), vehicle: t('client_maria_brake_inspection'), time: t('3_hours_ago') },
    { id: 3, action: t('urgent_repair_alert'), vehicle: t('bmw_x3_transmission_inspection'), time: t('5_hours_ago') },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* TV-Optimized Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">BA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">BYE AUTO</h1>
              <p className="text-gray-400 text-lg">TV Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wider">
              Navigation
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-4 bg-purple-600 text-white rounded-lg text-lg font-medium">
                Dashboard
              </button>
              <button className="w-full text-left p-4 text-gray-300 hover:bg-gray-800 rounded-lg text-lg font-medium">
                Vehicles
              </button>
              <button className="w-full text-left p-4 text-gray-300 hover:bg-gray-800 rounded-lg text-lg font-medium">
                Repairs
              </button>
              <button className="w-full text-left p-4 text-gray-300 hover:bg-gray-800 rounded-lg text-lg font-medium">
                Clients
              </button>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-700">
            <button 
              onClick={handleLogout}
              className="w-full p-4 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Pre-header with language selector */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="px-6 py-4 flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Header */}
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">TV Dashboard</h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="text-xl text-gray-200 text-center sm:text-left drop-shadow-md">
                  {t('welcome_back_bye_auto')}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white">{t('overview')}</h2>
            <p className="text-gray-300 mt-3 text-xl">{t('welcome_message')}</p>
          </div>

          {/* Stats Grid - TV Optimized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-400">{stat.name}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`text-lg font-medium ${
                    stat.changeType === "positive" ? "text-green-400" : "text-red-400"
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BMW Service Management - TV Optimized */}
          <div className="mb-8">
            <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg">
              <div className="px-6 py-6 border-b border-gray-700">
                <h3 className="text-2xl font-medium text-white">{t('bmw_service_management')}</h3>
                <p className="text-lg text-gray-400 mt-2">{t('bmw_service_description')}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {vehicles.map((vehicle) => (
                    <div 
                      key={vehicle.id} 
                      className="border border-gray-700 bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow cursor-pointer hover:border-purple-500"
                      onClick={() => handleVehicleClick(vehicle.id)}
                    >
                      <div className={`w-4 h-4 rounded-full mb-4 ${
                        vehicle.type === 'active' ? 'bg-green-500' :
                        vehicle.type === 'maintenance' ? 'bg-yellow-500' :
                        vehicle.type === 'completed' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}></div>
                      <h4 className="font-medium text-white mb-3 text-xl">{vehicle.name}</h4>
                      <p className="text-lg text-gray-300 mb-4">Client: {vehicle.client}</p>
                      <div className="space-y-2 mb-4">
                        <span className="text-lg text-gray-400">Status: {vehicle.status}</span>
                        <span className="text-lg text-gray-400 block">Prioritate: {vehicle.priority}</span>
                      </div>
                      <div className={`text-lg px-4 py-2 rounded-full ${
                        vehicle.type === 'active' ? 'bg-green-900 text-green-300' :
                        vehicle.type === 'maintenance' ? 'bg-yellow-900 text-yellow-300' :
                        vehicle.type === 'completed' ? 'bg-blue-900 text-blue-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {vehicle.indicator}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid - TV Optimized */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg">
                <div className="px-6 py-6 border-b border-gray-700">
                  <h3 className="text-2xl font-medium text-white">{t('recent_activity')}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-6">
                        <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-xl font-medium text-white">{activity.action}</p>
                          <p className="text-lg text-gray-400">{activity.vehicle}</p>
                        </div>
                        <span className="text-lg text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions - TV Optimized */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg">
                <div className="px-6 py-6 border-b border-gray-700">
                  <h3 className="text-2xl font-medium text-white">{t('quick_actions')}</h3>
                </div>
                <div className="p-6 space-y-6">
                  <button className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl hover:bg-purple-700 transition-colors text-xl font-medium">
                    {t('add_new_vehicle')}
                  </button>
                  <button className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition-colors text-xl font-medium">
                    {t('create_repair_order')}
                  </button>
                  <Link href="/quote" className="block">
                    <button className="w-full bg-red-600 text-white py-4 px-6 rounded-xl hover:bg-red-700 transition-colors text-xl font-medium">
                      {t('system_quote')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repair Modal */}
      <RepairModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicle={selectedVehicle}
      />
    </div>
  );
} 