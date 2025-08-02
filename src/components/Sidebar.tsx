"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Car, 
  Wrench, 
  Users, 
  TrendingUp, 
  Settings, 
  Zap, 
  CreditCard,
  Menu,
  X,
  LogOut
} from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      current: pathname === "/dashboard"
    },
    {
      name: "Vehicles",
      href: "/dashboard/vehicles",
      icon: Car,
      current: pathname === "/dashboard/vehicles"
    },
    {
      name: "Repairs",
      href: "/dashboard/repairs",
      icon: Wrench,
      current: pathname === "/dashboard/repairs"
    },
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: Users,
      current: pathname === "/dashboard/clients"
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: TrendingUp,
      current: pathname === "/dashboard/analytics"
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings"
    }
  ];

  const externalLinks = [
    {
      name: "Tuning Services",
      href: "/tune",
      icon: Zap,
      current: pathname === "/tune"
    },
    {
      name: "I want this system, what does it cost?",
      href: "/quote",
      icon: CreditCard,
      current: pathname === "/quote"
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-50 bg-gray-900 border-r border-gray-700 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">BA</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">BYE AUTO</h2>
              <p className="text-gray-400 text-xs">CARS & SERVICE</p>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors hidden lg:block"
          >
            {isCollapsed ? "→" : "←"}
          </button>
                           <button
                   onClick={() => setIsMobileOpen(false)}
                   className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
                 >
                   <X className="w-5 h-5" />
                 </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <div className="mb-4">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Main Navigation
            </h3>
          )}
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                                       <Link
                         href={item.href}
                         className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                           item.current
                             ? "bg-purple-600 text-white"
                             : "text-gray-300 hover:bg-gray-800 hover:text-white"
                         }`}
                       >
                         <item.icon className="w-5 h-5 mr-3" />
                         {!isCollapsed && <span>{item.name}</span>}
                       </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              External Links
            </h3>
          )}
          <ul className="space-y-1">
            {externalLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.name === "I want this system, what does it cost?"
                      ? "border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                      : item.current
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">BA</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">BYE AUTO</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          )}
                           <button
                   onClick={onLogout}
                   className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                   title="Logout"
                 >
                   <LogOut className="w-5 h-5" />
                 </button>
        </div>
      </div>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-gray-900 text-white rounded-lg lg:hidden"
        style={{ marginLeft: '1rem' }}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
} 