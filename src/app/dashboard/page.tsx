"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const stats = [
    { name: "Total Vehicles", value: "1,234", change: "+12%", changeType: "positive" },
    { name: "Active Rentals", value: "89", change: "+5%", changeType: "positive" },
    { name: "Revenue", value: "€45,678", change: "+8%", changeType: "positive" },
    { name: "Customers", value: "567", change: "+3%", changeType: "positive" },
  ];

  const recentActivity = [
    { id: 1, action: "New vehicle added", vehicle: "BMW X5", time: "2 minutes ago" },
    { id: 2, action: "Rental completed", vehicle: "Audi A4", time: "15 minutes ago" },
    { id: 3, action: "Payment received", vehicle: "Mercedes C-Class", time: "1 hour ago" },
    { id: 4, action: "Customer registered", vehicle: "Volkswagen Golf", time: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BYE Auto</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="text-sm text-gray-700">John Doe</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
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
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your fleet.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.vehicle}</p>
                      </div>
                      <span className="text-sm text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Add New Vehicle
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Create Rental
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  View Reports
                </button>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                  Manage Customers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 