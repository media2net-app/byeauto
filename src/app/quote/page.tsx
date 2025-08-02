"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("system");
  const [showProposalModal, setShowProposalModal] = useState(false);

  // Check if this is the first visit and show modal automatically
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('quotePageVisited');
    if (!hasVisitedBefore) {
      setShowProposalModal(true);
      localStorage.setItem('quotePageVisited', 'true');
    }
  }, []);

  // System Development Features
  const systemFeatures: SystemFeature[] = [
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
      note: "Can vary depending on chosen brands and labor rate. Includes M4-look & quad exhaust system"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('complete_solution_proposal')}</h2>
          <p className="text-gray-400 text-sm sm:text-base">{t('system_development_bmw_project')}</p>
          <button
            onClick={() => setShowProposalModal(true)}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            🤝 {t('view_special_proposal')}
          </button>
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

        {/* Proposal Modal */}
        {showProposalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">🤝 Special Partnership Proposal</h3>
                  <button
                    onClick={() => setShowProposalModal(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Introduction */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">📋 What You&apos;re Looking At</h4>
                    <p className="text-gray-300 mb-3">
                      This quote page contains <strong>two separate proposals</strong>:
                    </p>
                                         <ul className="text-gray-300 space-y-2 ml-4">
                       <li>• <strong>System Development</strong> - Complete BMW service management system (normally €{getSystemTotalIncludingMaintenance().toLocaleString()})</li>
                       <li>• <strong>BMW F32 420d Project</strong> - Stage 2+ performance build with M4-look & quad exhaust for your car (normally €{bmwProject.budget.min.toLocaleString()} - €{bmwProject.budget.max.toLocaleString()})</li>
                     </ul>
                  </div>

                  {/* Proposal */}
                  <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">💡 Our Special Proposal</h4>
                    <p className="text-gray-300 mb-4">
                      Instead of paying for each service separately, we propose a <strong>mutual exchange</strong>:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <h5 className="font-semibold text-white mb-2">🎯 What I Do For You</h5>
                        <p className="text-gray-300 text-sm">
                          Develop and deploy the complete BMW service management system <strong>FREE OF CHARGE</strong>
                        </p>
                      </div>
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <h5 className="font-semibold text-white mb-2">🚗 What You Do For Me</h5>
                        <p className="text-gray-300 text-sm">
                          Perform the complete BMW F32 420d Stage 2+ build <strong>FREE OF CHARGE</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">✅ Win-Win Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2">For BYE AUTO:</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Professional system worth €{getSystemTotalIncludingMaintenance().toLocaleString()}</li>
                          <li>• Complete business automation</li>
                          <li>• Competitive advantage</li>
                          <li>• Long-term business growth</li>
                        </ul>
                      </div>
                                             <div>
                         <h5 className="font-semibold text-white mb-2">For You:</h5>
                         <ul className="text-gray-300 text-sm space-y-1">
                           <li>• BMW Stage 2+ build with M4-look worth €{bmwProject.budget.min.toLocaleString()}</li>
                           <li>• Maximum performance upgrade</li>
                           <li>• Professional tuning service</li>
                           <li>• Quality parts and workmanship</li>
                           <li>• Custom quad exhaust system</li>
                         </ul>
                       </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 text-center">
                    <h4 className="text-lg font-semibold text-white mb-3">🤝 Ready to Shake Hands?</h4>
                    <p className="text-gray-300 mb-4">
                      This is a <strong>partnership proposal</strong> where both parties benefit equally. 
                      No money changes hands - just mutual value exchange.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => setShowProposalModal(false)}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        Accept Proposal
                      </button>
                      <button
                        onClick={() => setShowProposalModal(false)}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
} 