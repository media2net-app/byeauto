"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface SystemFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface BmwUpgradeItem {
  name: string;
  price: number;
  description?: string;
  details?: string;
}

interface BmwUpgradeCategory {
  category: string;
  items: BmwUpgradeItem[];
}

export default function QuotePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("system");

  // System Development Features
  const systemFeatures: SystemFeature[] = [
    {
      id: "dashboard",
      name: t('bmw_service_dashboard'),
      description: t('dashboard_desc'),
      price: 2500,
      category: "Core"
    },
    {
      id: "client-portal",
      name: t('client_portal'),
      description: t('client_portal_desc'),
      price: 1800,
      category: "Core"
    },
    {
      id: "quote-system",
      name: t('quote_system'),
      description: t('quote_system_desc'),
      price: 1200,
      category: "Core"
    },
    {
      id: "website",
      name: t('bye_auto_website'),
      description: t('website_desc'),
      price: 3500,
      category: "Core"
    },
    {
      id: "analytics",
      name: t('analytics_reports'),
      description: t('analytics_desc'),
      price: 1500,
      category: "Advanced"
    },
    {
      id: "mobile-app",
      name: t('mobile_application'),
      description: t('mobile_app_desc'),
      price: 3000,
      category: "Advanced"
    },
    {
      id: "api-integration",
      name: t('api_integration'),
      description: t('api_desc'),
      price: 2000,
      category: "Advanced"
    },
    {
      id: "multi-language",
      name: t('multi_language_support'),
      description: t('multi_lang_desc'),
      price: 800,
      category: "Enhancement"
    },
    {
      id: "backup-system",
      name: t('backup_security'),
      description: t('backup_desc'),
      price: 1000,
      category: "Enhancement"
    }
  ];

  // BMW F32 420d N47 Stage 2+ Project
  const bmwProject: {
    vehicle: string;
    goal: string;
    upgrades: BmwUpgradeCategory[];
    expectedResults: {
      power: string;
      torque: string;
      acceleration: string;
      reliability: string;
    };
    budget: {
      min: number;
      max: number;
      note: string;
    };
  } = {
    vehicle: t('vehicle_desc'),
    goal: t('goal_desc'),
    upgrades: [
      {
        category: "Performance Upgrades",
        items: [
          {
            name: "Hybrid Turbo Upgrade",
            description: "High-performance turbo with larger compressor wheel (Darkside, BPC Turbos, Turbologic)",
            details: "Target boost: 2.0–2.3 bar",
            price: 1200
          },
          {
            name: "Downpipe + DPF Delete",
            description: "Full stainless steel downpipe, DPF removal for better flow",
            details: "Not legal for road use in NL - customer aware",
            price: 800
          },
          {
            name: "EGR & Swirl Flap Delete",
            description: "Close EGR via software and/or block-off plates, swirl flaps removal",
            details: "Prevents future engine damage",
            price: 400
          },
          {
            name: "Upgraded Front Mount Intercooler",
            description: "Larger core for better cooling (do88, Wagner, Airtec)",
            price: 600
          },
          {
            name: "Clutch Upgrade or xHP TCU Tune",
            description: "Manual: reinforced clutch kit (Sachs, Black Diamond) | Automatic: xHP TCU software stage 2/3",
            price: 800
          },
          {
            name: "Custom Stage 3 ECU Remap",
            description: "Full dyno tuning with smoke control, torque limiters unlocked",
            details: "MAP, boost, fuel and EGT optimized",
            price: 1000
          }
        ]
      },
      {
        category: "Preventive Work",
        items: [
          {
            name: "Glow Plugs Replacement",
            price: 200
          },
          {
            name: "Catch Can Installation",
            price: 150
          },
          {
            name: "Timing Chain Inspection",
            price: 100
          },
          {
            name: "Injectors & Sensors Check",
            price: 150
          },
          {
            name: "Full Service (Oil, Filters, Coolant)",
            price: 300
          }
        ]
      },
      {
        category: "M4-Look & Quad Exhaust System",
        items: [
          {
            name: "Quad Exhaust System (Custom RVS)",
            description: "Custom quad exhaust system suitable for F32 diesel with quad setup",
            details: "A-brands: REMUS, Bastuck, Friedrich Motorsport, or custom RVS. Note: Original M4 exhaust doesn't fit plug & play due to 2.0 diesel (different chassis and engine layout)",
            price: 1600
          },
          {
            name: "M4-Style Rear Diffuser",
            description: "M4-style diffuser for F32 with M-package bumper",
            details: "Fits M Sport rear bumper (not standard bumper!). Materials: ABS, carbon-look or real carbon. Examples: Maxton Design, Kies Motorsports, Sterckenn",
            price: 375
          },
          {
            name: "Installation & Custom Fabrication",
            description: "Mounting, welding, bumper modifications and custom brackets",
            details: "Right side has no mounting points → welding or brackets needed. Heat shields + right side cutout must be modified. Ensure proper damping and sound evacuation for diesel (no resonance)",
            price: 650
          }
        ]
      }
    ],
    expectedResults: {
      power: "±270–280 hp",
      torque: "±580–600 Nm",
      acceleration: "0–100 km/h in ~5.5s",
      reliability: "Smooth, reliable performance if all steps are followed"
    },
    budget: {
      min: 6550,
      max: 10900,
      note: t('budget_note')
    }
  };

  const getSystemTotal = () => systemFeatures.reduce((sum, f) => sum + f.price, 0);
  const getSystemMaintenance = () => Math.round(getSystemTotal() * 0.15);
  const getSystemTotalIncludingMaintenance = () => getSystemTotal() + getSystemMaintenance();







  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16 space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">BYE Auto</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/dashboard" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                {t('dashboard')}
              </Link>
              <Link href="/" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                {t('logout')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('complete_solution_proposal')}</h2>
          <p className="text-gray-400 text-sm sm:text-base">{t('system_development_bmw_project')}</p>
        </div>

        {/* Special Proposal Introduction */}
        <div className="mb-8">
          <div className="bg-purple-900 border border-purple-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">🤝 {t('special_partnership_proposal')}</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">📋 {t('what_youre_looking_at')}</h4>
                <p className="text-gray-300 mb-3">
                  {t('two_separate_proposals')}
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• <strong>{t('system_development')}</strong> - {t('system_development_desc')} (normally €{getSystemTotalIncludingMaintenance().toLocaleString()})</li>
                  <li>• <strong>{t('bmw_project')}</strong> - {t('bmw_project_desc')} (normally €{bmwProject.budget.min.toLocaleString()} - €{bmwProject.budget.max.toLocaleString()})</li>
                </ul>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">💡 {t('our_special_proposal')}</h4>
                <p className="text-gray-300 mb-4">
                  {t('mutual_exchange_desc')}
                </p>
                <div className="space-y-3">
                  <div className="bg-purple-900 border border-purple-700 rounded-lg p-3">
                    <h5 className="font-semibold text-white mb-1">🎯 {t('what_i_do_for_you')}</h5>
                    <p className="text-gray-300 text-sm">
                      {t('develop_system_free')}
                    </p>
                  </div>
                  <div className="bg-green-900 border border-green-700 rounded-lg p-3">
                    <h5 className="font-semibold text-white mb-1">🚗 {t('what_you_do_for_me')}</h5>
                    <p className="text-gray-300 text-sm">
                      {t('perform_build_free')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-900 border border-blue-700 rounded-lg p-4 text-center">
              <h4 className="text-lg font-semibold text-white mb-2">✅ {t('win_win_partnership')}</h4>
              <p className="text-gray-300">
                {t('partnership_proposal_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("system")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "system"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            {t('system_development')}
          </button>
          <button
            onClick={() => setActiveTab("bmw")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "bmw"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            {t('bmw_project')}
          </button>
        </div>

        {/* System Development Tab */}
        {activeTab === "system" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">{t('bmw_service_management_system')}</h3>
                
                {/* Core Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">{t('core_features')}</h4>
                  <div className="space-y-4">
                    {systemFeatures.filter(f => f.category === "Core").map((feature) => (
                      <div key={feature.id} className="border border-gray-700 bg-gray-800 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="mt-1 h-4 w-4 bg-purple-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <div>
                              <div className="font-medium text-white">{feature.name}</div>
                              <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-purple-400">€{feature.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">{t('advanced_features')}</h4>
                  <div className="space-y-4">
                    {systemFeatures.filter(f => f.category === "Advanced").map((feature) => (
                      <div key={feature.id} className="border border-gray-700 bg-gray-800 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="mt-1 h-4 w-4 bg-purple-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <div>
                              <div className="font-medium text-white">{feature.name}</div>
                              <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-purple-400">€{feature.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhancements */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">{t('enhancements')}</h4>
                  <div className="space-y-4">
                    {systemFeatures.filter(f => f.category === "Enhancement").map((feature) => (
                      <div key={feature.id} className="border border-gray-700 bg-gray-800 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="mt-1 h-4 w-4 bg-purple-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <div>
                              <div className="font-medium text-white">{feature.name}</div>
                              <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-purple-400">€{feature.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete System Overview */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-700 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-white mb-6 text-center">🚀 Complete BYE Auto System Overview</h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Admin Dashboard Functions */}
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <span className="mr-2">⚙️</span>
                          Admin Dashboard Functions
                        </h5>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Vehicle Management (Add, Edit, Delete)</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Repair Order Management</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Client Database & History</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Real-time Analytics & Reports</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">WhatsApp Business Integration</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Multi-language Support (EN/RO)</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Automated Quote Generation</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Inventory Management</span>
                          </div>
                        </div>
                      </div>

                      {/* Website Functions */}
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <span className="mr-2">🌐</span>
                          BYE Auto Website Functions
                        </h5>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Company Information & About</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">BMW Service & Repair Services</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Performance Tuning Options</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Online Booking System</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">License Plate Lookup Tool</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Contact Form & Location</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Customer Reviews & Gallery</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm">✓</span>
                            <span className="text-gray-300 text-sm">Mobile Responsive Design</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tuning Services Section */}
                    <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <span className="mr-2">🏎️</span>
                        Performance Tuning Services (Website Integration)
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-700 border border-gray-600 rounded-lg p-3">
                          <h6 className="font-semibold text-white mb-2">Stage 1 Tuning</h6>
                          <p className="text-gray-300 text-sm">Software optimization for stock hardware</p>
                          <p className="text-green-400 text-sm font-medium mt-2">+15-25% Power Increase</p>
                        </div>
                        <div className="bg-gray-700 border border-gray-600 rounded-lg p-3">
                          <h6 className="font-semibold text-white mb-2">Stage 2 Tuning</h6>
                          <p className="text-gray-300 text-sm">Hardware upgrades + software optimization</p>
                          <p className="text-green-400 text-sm font-medium mt-2">+30-45% Power Increase</p>
                        </div>
                        <div className="bg-gray-700 border border-gray-600 rounded-lg p-3">
                          <h6 className="font-semibold text-white mb-2">Stage 3+ Tuning</h6>
                          <p className="text-gray-300 text-sm">Complete performance build with custom parts</p>
                          <p className="text-green-400 text-sm font-medium mt-2">+50-70% Power Increase</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-white mb-4">{t('technology_stack')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-md font-medium text-white mb-2">Technology</h5>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Next.js 15 (React Framework)</li>
                        <li>• TypeScript (Type Safety)</li>
                        <li>• Tailwind CSS (Styling)</li>
                        <li>• Framer Motion (Animations)</li>
                        <li>• PostgreSQL (Database)</li>
                        <li>• Prisma (ORM)</li>
                        <li>• NextAuth.js (Authentication)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-md font-medium text-white mb-2">{t('deployment')}</h5>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Vercel (Hosting)</li>
                        <li>• Automatic Deployments</li>
                        <li>• SSL Certificate</li>
                        <li>• CDN Distribution</li>
                        <li>• 99.9% Uptime</li>
                        <li>• Daily Backups</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Calculator */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-white mb-6">{t('total_investment')}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-white">{t('total_investment')}:</span>
                    <span className="text-2xl font-bold text-green-400">€{getSystemTotalIncludingMaintenance().toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400 italic">{t('includes_maintenance')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BMW Project Tab */}
        {activeTab === "bmw" && (
          <div className="space-y-8">
            {/* Project Overview */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white mb-6">{t('bmw_f32_stage2_title')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">{t('vehicle')}</h4>
                  <p className="text-gray-400">{bmwProject.vehicle}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">{t('goal')}</h4>
                  <p className="text-gray-400">{bmwProject.goal}</p>
                </div>
              </div>

              {/* Expected Results */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-3">{t('expected_results')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Power</p>
                    <p className="text-white font-medium">{bmwProject.expectedResults.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Torque</p>
                    <p className="text-white font-medium">{bmwProject.expectedResults.torque}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">0-100 km/h</p>
                    <p className="text-white font-medium">{bmwProject.expectedResults.acceleration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Reliability</p>
                    <p className="text-white font-medium text-sm">{bmwProject.expectedResults.reliability}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrades */}
            {bmwProject.upgrades.map((category, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
                <h4 className="text-lg font-medium text-white mb-4">{category.category}</h4>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border border-gray-700 bg-gray-800 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 h-4 w-4 bg-purple-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                                                      <div>
                              <div className="font-medium text-white">{item.name}</div>
                              {'description' in item && item.description && (
                                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                              )}
                              {'details' in item && item.details && (
                                <p className="text-sm text-gray-500 mt-1 italic">{item.details}</p>
                              )}
                            </div>
                        </div>
                        <span className="text-lg font-bold text-purple-400">€{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Budget and Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-medium text-white mb-4">{t('estimated_budget')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total (including installation):</span>
                    <span className="text-2xl font-bold text-green-400">€{bmwProject.budget.min.toLocaleString()} – €{bmwProject.budget.max.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400 italic">{bmwProject.budget.note}</p>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-medium text-white mb-4">{t('client_notes')}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Car will be mainly used in Romania</li>
                  <li>• APK and emissions are not a concern for this build</li>
                  <li>• Priority: maximum power with long-term reliability</li>
                  <li>• No budget shortcuts – only quality parts</li>
                  <li>• Tuning must be done on dyno, with logs provided</li>
                </ul>
              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
} 