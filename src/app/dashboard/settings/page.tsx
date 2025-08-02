"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Settings, User, Bell, Shield, Database, Globe, Save, X } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    maintenance: true,
    repairs: true,
    clients: false
  });

  const handleLogout = () => {
    router.push("/");
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "data", name: "Data & Backup", icon: Database },
    { id: "preferences", name: "Preferences", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow-sm border-b border-gray-700">
          <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">{t('settings')}</h1>
                  <p className="text-gray-400 mt-1">Manage your account and preferences</p>
                </div>
                <LanguageSwitcher />
              </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Profile Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="BYE AUTO Administrator"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@byeauto.com"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+40 721 123 456"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <input
                      type="text"
                      defaultValue="Administrator"
                      disabled
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Notification Channels</h4>
                    <div className="space-y-3">
                      {Object.entries(notifications).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-300 capitalize">{key} Notifications</span>
                          <button
                            onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              value ? 'bg-purple-600' : 'bg-gray-600'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Notification Types</h4>
                    <div className="space-y-3">
                      {Object.entries(notifications).slice(3).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-300 capitalize">{key} Updates</span>
                          <button
                            onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              value ? 'bg-purple-600' : 'bg-gray-600'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Enable 2FA</span>
                      <button className="w-12 h-6 bg-gray-600 rounded-full">
                        <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Backup Tab */}
            {activeTab === "data" && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Data & Backup</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Backup Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Automatic Backups</p>
                          <p className="text-sm text-gray-400">Daily backups at 2:00 AM</p>
                        </div>
                        <button className="w-12 h-6 bg-purple-600 rounded-full">
                          <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Cloud Storage</p>
                          <p className="text-sm text-gray-400">Backup to secure cloud storage</p>
                        </div>
                        <button className="w-12 h-6 bg-purple-600 rounded-full">
                          <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Data Export</h4>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Export All Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Preferences</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Language & Region</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                        <select className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                          <option value="en">English</option>
                          <option value="ro">Romanian</option>
                          <option value="nl">Dutch</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                        <select className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                          <option value="UTC+2">Europe/Bucharest (UTC+2)</option>
                          <option value="UTC+1">Europe/Amsterdam (UTC+1)</option>
                          <option value="UTC+0">Europe/London (UTC+0)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">Display Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Dark Mode</span>
                        <button className="w-12 h-6 bg-purple-600 rounded-full">
                          <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Compact View</span>
                        <button className="w-12 h-6 bg-gray-600 rounded-full">
                          <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 