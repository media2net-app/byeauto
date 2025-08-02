"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { TrendingUp, TrendingDown, DollarSign, Car, Users, Wrench, Calendar, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("month");

  const handleLogout = () => {
    router.push("/");
  };

  const stats = [
    {
      name: "Total Revenue",
      value: "€24,500",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      name: "Active Vehicles",
      value: "18",
      change: "+3",
      changeType: "positive",
      icon: Car,
      color: "text-blue-400"
    },
    {
      name: "Total Clients",
      value: "45",
      change: "+5",
      changeType: "positive",
      icon: Users,
      color: "text-purple-400"
    },
    {
      name: "Repairs Completed",
      value: "32",
      change: "+8",
      changeType: "positive",
      icon: Wrench,
      color: "text-yellow-400"
    }
  ];

  const monthlyData = [
    { month: "Jan", revenue: 18500, repairs: 28, clients: 42 },
    { month: "Feb", revenue: 19200, repairs: 31, clients: 44 },
    { month: "Mar", revenue: 20100, repairs: 29, clients: 43 },
    { month: "Apr", revenue: 21800, repairs: 35, clients: 46 },
    { month: "May", revenue: 22400, repairs: 33, clients: 45 },
    { month: "Jun", revenue: 23100, repairs: 37, clients: 47 },
    { month: "Jul", revenue: 24500, repairs: 32, clients: 45 }
  ];

  const topServices = [
    { name: "Oil Change & Filters", count: 45, revenue: 5400 },
    { name: "Brake System Service", count: 28, revenue: 8400 },
    { name: "Engine Diagnostics", count: 22, revenue: 6600 },
    { name: "Electrical Repairs", count: 18, revenue: 7200 },
    { name: "Transmission Service", count: 15, revenue: 6750 }
  ];

  const recentActivity = [
    { action: "BMW X5 repair completed", client: "Ion Popescu", amount: "€850", time: "2 hours ago" },
    { action: "New client registered", client: "Maria Ionescu", amount: "€0", time: "4 hours ago" },
    { action: "BMW 320i maintenance", client: "Alexandru Dumitrescu", amount: "€320", time: "6 hours ago" },
    { action: "BMW X3 diagnostic", client: "Elena Vasilescu", amount: "€150", time: "8 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-gray-400 mt-1">Business insights and performance metrics</p>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === "positive" ? "text-green-400" : "text-red-400"
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">vs last period</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-400">{data.month}</div>
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.revenue / 25000) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-20 text-sm text-white text-right">€{data.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Services */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top Services</h3>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{service.name}</p>
                        <p className="text-sm text-gray-400">{service.count} repairs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">€{service.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{activity.amount}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 