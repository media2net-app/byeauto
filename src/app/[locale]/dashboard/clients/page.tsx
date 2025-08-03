"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Plus, Search, Users, Edit, Trash2, Eye, Phone, Mail, Car, Calendar } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalVehicles: number;
  totalSpent: number;
  lastVisit: string;
  status: "active" | "inactive" | "vip";
  notes: string;
}

export default function ClientsPage() {
  const router = useRouter();
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogout = () => {
    router.push("/");
  };

  const clients: Client[] = [
    {
      id: "1",
      name: "Ion Popescu",
      email: "ion.popescu@email.com",
      phone: "+40 721 123 456",
      address: "Strada Victoriei 123, București",
      joinDate: "2020-03-15",
      totalVehicles: 2,
      totalSpent: 2850,
      lastVisit: "2024-01-15",
      status: "vip",
      notes: "Regular customer, prefers premium service"
    },
    {
      id: "2",
      name: "Maria Ionescu",
      email: "maria.ionescu@email.com",
      phone: "+40 722 234 567",
      address: "Bulevardul Unirii 45, București",
      joinDate: "2021-07-22",
      totalVehicles: 1,
      totalSpent: 1200,
      lastVisit: "2024-01-20",
      status: "active",
      notes: "New customer, very satisfied with service"
    },
    {
      id: "3",
      name: "Alexandru Dumitrescu",
      email: "alex.dumitrescu@email.com",
      phone: "+40 723 345 678",
      address: "Strada Lipscani 78, București",
      joinDate: "2019-11-08",
      totalVehicles: 3,
      totalSpent: 4200,
      lastVisit: "2024-01-18",
      status: "vip",
      notes: "Long-term customer, multiple BMW vehicles"
    },
    {
      id: "4",
      name: "Elena Vasilescu",
      email: "elena.vasilescu@email.com",
      phone: "+40 724 456 789",
      address: "Calea Floreasca 12, București",
      joinDate: "2022-01-30",
      totalVehicles: 1,
      totalSpent: 800,
      lastVisit: "2024-01-22",
      status: "active",
      notes: "Prefers weekend appointments"
    },
    {
      id: "5",
      name: "Mihai Popescu",
      email: "mihai.popescu@email.com",
      phone: "+40 725 567 890",
      address: "Strada Dorobanți 90, București",
      joinDate: "2023-05-12",
      totalVehicles: 0,
      totalSpent: 0,
      lastVisit: "2023-12-15",
      status: "inactive",
      notes: "Inactive customer, no recent visits"
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip": return "bg-purple-900 text-purple-300";
      case "active": return "bg-green-900 text-green-300";
      case "inactive": return "bg-gray-900 text-gray-300";
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
                  <h1 className="text-2xl font-bold text-white">{t('clients')}</h1>
                  <p className="text-gray-400 mt-1">Manage your customer database</p>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Client</span>
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
                placeholder="Search clients by name, email, or phone..."
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
              <option value="vip">VIP</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div key={client.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                      <p className="text-gray-400">{client.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {client.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{client.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{client.totalVehicles} vehicles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Member since {client.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Total Spent:</span>
                    <span className="text-white font-medium">€{client.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Last Visit:</span>
                    <span className="text-white">{client.lastVisit}</span>
                  </div>
                </div>

                {client.notes && (
                  <div className="mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300">{client.notes}</p>
                  </div>
                )}

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

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No clients found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 