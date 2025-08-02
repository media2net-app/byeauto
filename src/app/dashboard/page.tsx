"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const stats = [
    { name: "Vehicles in Service", value: "12", change: "+3 this week", changeType: "positive" },
    { name: "Avg Repair Time", value: "2.5h", change: "-0.3h vs last week", changeType: "positive" },
    { name: "Repairs in Progress", value: "8", change: "+2 this week", changeType: "positive" },
    { name: "Monthly Revenue", value: "€8,450", change: "+12% vs last month", changeType: "positive" },
  ];

  const recentActivity = [
    { id: 1, action: "BMW X5 Repair Completed", vehicle: "Engine diagnostic and electrical system repair finished", time: "1 hour ago" },
    { id: 2, action: "New BMW 320i Arrived", vehicle: "Client Maria Ionescu - brake system inspection needed", time: "3 hours ago" },
    { id: 3, action: "Urgent Repair Alert", vehicle: "BMW X3 requires immediate transmission inspection", time: "5 hours ago" },
  ];

  const vehicles = [
    { id: "bmw1", name: "BMW X5 2020", client: "Ion Popescu", status: "În Service", priority: "Înaltă", indicator: "Reparații Active", type: "active" },
    { id: "bmw2", name: "BMW 320i 2019", client: "Maria Ionescu", status: "În Așteptare", priority: "Medie", indicator: "Programat", type: "maintenance" },
    { id: "bmw3", name: "BMW 520d 2021", client: "Alexandru Dumitrescu", status: "Finalizat", priority: "Scăzută", indicator: "Gata de Livrare", type: "completed" },
    { id: "bmw4", name: "BMW X3 2018", client: "Elena Vasilescu", status: "Diagnostic", priority: "Înaltă", indicator: "Urgent", type: "urgent" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">BYE AUTO</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="text-sm text-gray-300">John Doe</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-300 mt-2">Welcome back! Here&apos;s what&apos;s happening with your fleet.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-900 border border-gray-700 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === "positive" ? "text-green-400" : "text-red-400"
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BMW Service Management */}
        <div className="mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">BMW Service Management</h3>
              <p className="text-sm text-gray-400 mt-1">Service auto dedicat BMW cu experiența - reparatii, întreținere - electrica și mecanică!</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="border border-gray-700 bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`w-3 h-3 rounded-full mb-3 ${
                      vehicle.type === 'active' ? 'bg-green-500' :
                      vehicle.type === 'maintenance' ? 'bg-yellow-500' :
                      vehicle.type === 'completed' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`}></div>
                    <h4 className="font-medium text-white mb-1">{vehicle.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">Client: {vehicle.client}</p>
                    <div className="space-y-1 mb-3">
                      <span className="text-xs text-gray-400">Status: {vehicle.status}</span>
                      <span className="text-xs text-gray-400 block">Prioritate: {vehicle.priority}</span>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.vehicle}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Add New Vehicle
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Create Repair Order
                </button>
                <Link href="/client" className="block">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Client Portal
                  </button>
                </Link>
                <Link href="/quote" className="block">
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    System Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 