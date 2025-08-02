"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
  const [language, setLanguage] = useState("en");
  const [activeTab, setActiveTab] = useState("system");

  // System Development Features
  const systemFeatures = [
    {
      id: "dashboard",
      name: "BMW Service Dashboard",
      description: "Complete repair management system with real-time tracking",
      price: 2500,
      category: "Core"
    },
    {
      id: "client-portal",
      name: "Client Portal",
      description: "License plate lookup, VIN search, and vehicle specifications",
      price: 1800,
      category: "Core"
    },
    {
      id: "quote-system",
      name: "Quote System",
      description: "Automated quote generation and management",
      price: 1200,
      category: "Core"
    },
    {
      id: "analytics",
      name: "Analytics & Reports",
      description: "Business intelligence and performance tracking",
      price: 1500,
      category: "Advanced"
    },
    {
      id: "mobile-app",
      name: "Mobile Application",
      description: "iOS and Android apps for field operations",
      price: 3000,
      category: "Advanced"
    },
    {
      id: "api-integration",
      name: "API Integration",
      description: "Third-party integrations and data synchronization",
      price: 2000,
      category: "Advanced"
    },
    {
      id: "multi-language",
      name: "Multi-language Support",
      description: "English, Romanian, and Dutch language support",
      price: 800,
      category: "Enhancement"
    },
    {
      id: "backup-system",
      name: "Backup & Security",
      description: "Automated backups and advanced security features",
      price: 1000,
      category: "Enhancement"
    }
  ];

  // BMW F32 420d N47 Stage 2+ Project
  const bmwProject = {
    vehicle: "BMW 420d F32 (N47 engine, 184 hp stock)",
    goal: "Reliable Stage 2+/3 upgrade to ±270–280 hp / ±580–600 Nm",
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
      }
    ],
    expectedResults: {
      power: "±270–280 hp",
      torque: "±580–600 Nm",
      acceleration: "0–100 km/h in ~5.5s",
      reliability: "Smooth, reliable performance if all steps are followed"
    },
    budget: {
      min: 4700,
      max: 7500,
      note: "Can vary depending on chosen brands and labor rate"
    }
  };

  const getSystemTotal = () => systemFeatures.reduce((sum, f) => sum + f.price, 0);
  const getSystemMaintenance = () => Math.round(getSystemTotal() * 0.15);
  const getSystemTotalWithMaintenance = () => getSystemTotal() + getSystemMaintenance();

  const getBmwUpgradesTotal = () => {
    return bmwProject.upgrades.reduce((total, category) => {
      return total + category.items.reduce((sum, item) => sum + item.price, 0);
    }, 0);
  };

  const getCombinedTotal = () => getSystemTotalWithMaintenance() + getBmwUpgradesTotal();

  const translations = {
    en: {
      title: "BYE Auto - Complete Solution Proposal",
      subtitle: "System Development + BMW F32 420d N47 Stage 2+ Project",
      systemTab: "System Development",
      bmwTab: "BMW Project",
      combinedTab: "Combined Offer",
      systemTitle: "BMW Service Management System",
      bmwTitle: "BMW F32 420d N47 – STAGE 2+ / MAX PERFORMANCE BUILD",
      vehicle: "Vehicle",
      goal: "Goal",
      upgrades: "Required Upgrades",
      expectedResults: "Expected Results",
      budget: "Estimated Budget",
      clientNotes: "Client Notes",
      core: "Core Features",
      advanced: "Advanced Features",
      enhancement: "Enhancements",
      performanceUpgrades: "Performance Upgrades",
      preventiveWork: "Preventive Work",
      totalPrice: "Total Price",
      maintenance: "Annual Maintenance",
      totalInvestment: "Total Investment",
      combinedTotal: "Combined Total Investment",
      techStack: "Technology Stack",
      deployment: "Deployment",
      support: "Support & Maintenance"
    },
    nl: {
      title: "BYE Auto - Complete Oplossing Voorstel",
      subtitle: "Systeem Ontwikkeling + BMW F32 420d N47 Stage 2+ Project",
      systemTab: "Systeem Ontwikkeling",
      bmwTab: "BMW Project",
      combinedTab: "Gecombineerde Aanbieding",
      systemTitle: "BMW Service Management Systeem",
      bmwTitle: "BMW F32 420d N47 – STAGE 2+ / MAX PERFORMANCE BUILD",
      vehicle: "Voertuig",
      goal: "Doel",
      upgrades: "Benodigde Upgrades",
      expectedResults: "Verwachte Resultaten",
      budget: "Geschatte Begroting",
      clientNotes: "Klantnotities",
      core: "Kernfuncties",
      advanced: "Geavanceerde Functies",
      enhancement: "Verbeteringen",
      performanceUpgrades: "Prestatie Upgrades",
      preventiveWork: "Preventief Werk",
      totalPrice: "Totale Prijs",
      maintenance: "Jaarlijks Onderhoud",
      totalInvestment: "Totale Investering",
      combinedTotal: "Gecombineerde Totale Investering",
      techStack: "Technologie Stack",
      deployment: "Implementatie",
      support: "Ondersteuning & Onderhoud"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">BYE Auto</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
              >
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
              </select>
              <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white">
                Dashboard
              </Link>
              <Link href="/" className="text-sm text-gray-400 hover:text-white">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.title}</h2>
          <p className="text-gray-400 text-sm sm:text-base">{t.subtitle}</p>
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
            {t.systemTab}
          </button>
          <button
            onClick={() => setActiveTab("bmw")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "bmw"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            {t.bmwTab}
          </button>
          <button
            onClick={() => setActiveTab("combined")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "combined"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            {t.combinedTab}
          </button>
        </div>

        {/* System Development Tab */}
        {activeTab === "system" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">{t.systemTitle}</h3>
                
                {/* Core Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">{t.core}</h4>
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
                  <h4 className="text-lg font-medium text-white mb-4">{t.advanced}</h4>
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
                  <h4 className="text-lg font-medium text-white mb-4">{t.enhancement}</h4>
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

                {/* Technical Specifications */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-white mb-4">{t.techStack}</h4>
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
                      <h5 className="text-md font-medium text-white mb-2">{t.deployment}</h5>
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
                <h3 className="text-xl font-semibold text-white mb-6">{t.totalInvestment}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t.totalPrice}:</span>
                    <span className="text-2xl font-bold text-purple-400">€{getSystemTotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t.maintenance}:</span>
                    <span className="text-lg font-semibold text-white">€{getSystemMaintenance().toLocaleString()}</span>
                  </div>
                  
                  <hr className="border-gray-700" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-white">{t.totalInvestment}:</span>
                    <span className="text-2xl font-bold text-green-400">€{getSystemTotalWithMaintenance().toLocaleString()}</span>
                  </div>
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
              <h3 className="text-xl font-semibold text-white mb-6">{t.bmwTitle}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">{t.vehicle}</h4>
                  <p className="text-gray-400">{bmwProject.vehicle}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">{t.goal}</h4>
                  <p className="text-gray-400">{bmwProject.goal}</p>
                </div>
              </div>

              {/* Expected Results */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-3">{t.expectedResults}</h4>
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
                            {item.description && (
                              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                            )}
                            {item.details && (
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
                <h4 className="text-lg font-medium text-white mb-4">{t.budget}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total (including installation):</span>
                    <span className="text-2xl font-bold text-green-400">€{bmwProject.budget.min.toLocaleString()} – €{bmwProject.budget.max.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400 italic">{bmwProject.budget.note}</p>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-medium text-white mb-4">{t.clientNotes}</h4>
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

        {/* Combined Offer Tab */}
        {activeTab === "combined" && (
          <div className="space-y-8">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Complete BYE Auto Solution</h3>
              <p className="text-gray-400 mb-6">
                Get both the professional BMW service management system and the complete BMW F32 420d N47 Stage 2+ performance build.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Summary */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-white mb-4">{t.systemTitle}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">System Development:</span>
                      <span className="text-white font-medium">€{getSystemTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Annual Maintenance:</span>
                      <span className="text-white font-medium">€{getSystemMaintenance().toLocaleString()}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="text-white font-medium">Total System:</span>
                      <span className="text-purple-400 font-bold">€{getSystemTotalWithMaintenance().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* BMW Project Summary */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-white mb-4">BMW F32 420d N47 Stage 2+</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Performance Upgrades:</span>
                      <span className="text-white font-medium">€{bmwProject.upgrades[0].items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Preventive Work:</span>
                      <span className="text-white font-medium">€{bmwProject.upgrades[1].items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="text-white font-medium">Total BMW Project:</span>
                      <span className="text-purple-400 font-bold">€{getBmwUpgradesTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combined Total */}
              <div className="mt-8 bg-purple-900 border border-purple-700 rounded-lg p-6">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">{t.combinedTotal}</h4>
                  <div className="text-3xl font-bold text-purple-300">€{getCombinedTotal().toLocaleString()}</div>
                  <p className="text-purple-200 mt-2">Complete solution: System + BMW Performance Build</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h5 className="text-white font-medium mb-2">Performance</h5>
                  <p className="text-sm text-gray-400">270-280 hp BMW with professional management system</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">🛠️</span>
                  </div>
                  <h5 className="text-white font-medium mb-2">Professional</h5>
                  <p className="text-sm text-gray-400">Complete business solution with quality parts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">📈</span>
                  </div>
                  <h5 className="text-white font-medium mb-2">Growth</h5>
                  <p className="text-sm text-gray-400">Scale your BMW service business efficiently</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 