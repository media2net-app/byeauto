"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Logo from "./Logo";
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
  LogOut,
  MessageCircle,
  Clock,
  BookOpen,
  Monitor
} from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  const navigation = [
    {
      name: t('dashboard'),
      href: `/${locale}/dashboard`,
      icon: BarChart3,
      current: pathname === `/${locale}/dashboard`,
      notifications: 0
    },
    {
      name: t('work'),
      href: `/${locale}/dashboard/work`,
      icon: Wrench,
      current: pathname === `/${locale}/dashboard/work`,
      notifications: 0
    },
    {
      name: t('work_timer'),
      href: `/${locale}/worktimer`,
      icon: Clock,
      current: pathname === `/${locale}/worktimer`,
      notifications: 0
    },
    {
      name: t('system_explanation'),
      href: `/${locale}/uitleg`,
      icon: BookOpen,
      current: pathname === `/${locale}/uitleg`,
      notifications: 0
    },
    {
      name: t('vehicles'),
      href: `/${locale}/dashboard/vehicles`,
      icon: Car,
      current: pathname === `/${locale}/dashboard/vehicles`,
      notifications: 0
    },
    {
      name: t('repairs'),
      href: `/${locale}/dashboard/repairs`,
      icon: Wrench,
      current: pathname === `/${locale}/dashboard/repairs`,
      notifications: 0
    },
    {
      name: t('clients'),
      href: `/${locale}/dashboard/clients`,
      icon: Users,
      current: pathname === `/${locale}/dashboard/clients`,
      notifications: 0
    },
    {
      name: t('messages'),
      href: `/${locale}/dashboard/messages`,
      icon: MessageCircle,
      current: pathname === `/${locale}/dashboard/messages`,
      notifications: 2
    },
    {
      name: t('analytics'),
      href: `/${locale}/dashboard/analytics`,
      icon: TrendingUp,
      current: pathname === `/${locale}/dashboard/analytics`,
      notifications: 0
    },
    {
      name: t('settings'),
      href: `/${locale}/dashboard/settings`,
      icon: Settings,
      current: pathname === `/${locale}/dashboard/settings`,
      notifications: 0
    }
  ];

  const tvDashboardLink = {
    name: t('tv_dashboard'),
    href: `/${locale}/tvdashboard`,
    icon: Monitor,
    current: pathname === `/${locale}/tvdashboard`,
    notifications: 0
  };

  const externalLinks = [
    {
      name: "Tuning Services",
      href: `/${locale}/tune`,
      icon: Zap,
      current: pathname === `/${locale}/tune`
    },
    {
      name: "I want this system, what does it cost?",
      href: `/${locale}/quote`,
      icon: CreditCard,
      current: pathname === `/${locale}/quote`
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
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
            </div>
          )}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors hidden lg:block"
            >
              {isCollapsed ? "→" : "←"}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

      {/* Navigation */}
      <nav className="p-3 sm:p-4 space-y-2">
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
                  className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors relative ${
                    item.current
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="relative">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    {item.notifications > 0 && isCollapsed && (
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                        {item.notifications > 9 ? '9+' : item.notifications}
                      </div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-xs sm:text-sm">{item.name}</span>
                      {item.notifications > 0 && (
                        <div className="bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                          {item.notifications > 9 ? '9+' : item.notifications}
                        </div>
                      )}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* TV Dashboard Button */}
        <div className="mb-4">
          <ul className="space-y-1">
            <li>
              <Link
                href={tvDashboardLink.href}
                className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors relative border border-purple-500 ${
                  tvDashboardLink.current
                    ? "bg-purple-600 text-white"
                    : "text-purple-400 hover:bg-purple-500 hover:text-white"
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="relative">
                  <tvDashboardLink.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                </div>
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-xs sm:text-sm">{tvDashboardLink.name}</span>
                  </div>
                )}
              </Link>
            </li>
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
                  className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    item.name === "I want this system, what does it cost?"
                      ? "border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                      : item.current
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  {!isCollapsed && <span className="text-xs sm:text-sm">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Logo size="sm" />
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-white">BYE AUTO</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          )}
          <button
            onClick={onLogout}
            className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-3 left-3 sm:top-4 sm:left-4 z-30 p-2 bg-gray-900 text-white rounded-lg lg:hidden shadow-lg"
      >
        <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </>
  );
} 