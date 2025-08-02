"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [language, setLanguage] = useState("en");

  const features = [
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

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const getSelectedFeatures = () => features.filter(f => selectedFeatures.includes(f.id));
  const getTotalPrice = () => getSelectedFeatures().reduce((sum, f) => sum + f.price, 0);
  const getMaintenanceCost = () => Math.round(getTotalPrice() * 0.15);
  const getTotalWithMaintenance = () => getTotalPrice() + getMaintenanceCost();

  const translations = {
    en: {
      title: "BYE Auto System Development Quote",
      subtitle: "Complete BMW service management solution",
      features: "Features",
      pricing: "Pricing",
      technical: "Technical Specifications",
      investment: "Investment Calculator",
      totalPrice: "Total Price",
      maintenance: "Annual Maintenance",
      totalInvestment: "Total Investment",
      selectFeatures: "Select Features",
      core: "Core Features",
      advanced: "Advanced Features", 
      enhancement: "Enhancements",
      techStack: "Technology Stack",
      deployment: "Deployment",
      support: "Support & Maintenance"
    },
    nl: {
      title: "BYE Auto Systeem Ontwikkeling Offerte",
      subtitle: "Complete BMW service management oplossing",
      features: "Functies",
      pricing: "Prijzen",
      technical: "Technische Specificaties",
      investment: "Investeringscalculator",
      totalPrice: "Totale Prijs",
      maintenance: "Jaarlijks Onderhoud",
      totalInvestment: "Totale Investering",
      selectFeatures: "Selecteer Functies",
      core: "Kernfuncties",
      advanced: "Geavanceerde Functies",
      enhancement: "Verbeteringen",
      techStack: "Technologie Stack",
      deployment: "Implementatie",
      support: "Ondersteuning & Onderhoud"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BYE Auto</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
              </select>
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
                Dashboard
              </Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{t.selectFeatures}</h3>
              
              {/* Core Features */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">{t.core}</h4>
                <div className="space-y-4">
                  {features.filter(f => f.category === "Core").map((feature) => (
                    <div key={feature.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id={feature.id}
                            checked={selectedFeatures.includes(feature.id)}
                            onChange={() => toggleFeature(feature.id)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div>
                            <label htmlFor={feature.id} className="font-medium text-gray-900 cursor-pointer">
                              {feature.name}
                            </label>
                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">€{feature.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Features */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">{t.advanced}</h4>
                <div className="space-y-4">
                  {features.filter(f => f.category === "Advanced").map((feature) => (
                    <div key={feature.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id={feature.id}
                            checked={selectedFeatures.includes(feature.id)}
                            onChange={() => toggleFeature(feature.id)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div>
                            <label htmlFor={feature.id} className="font-medium text-gray-900 cursor-pointer">
                              {feature.name}
                            </label>
                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">€{feature.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhancements */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">{t.enhancement}</h4>
                <div className="space-y-4">
                  {features.filter(f => f.category === "Enhancement").map((feature) => (
                    <div key={feature.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id={feature.id}
                            checked={selectedFeatures.includes(feature.id)}
                            onChange={() => toggleFeature(feature.id)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div>
                            <label htmlFor={feature.id} className="font-medium text-gray-900 cursor-pointer">
                              {feature.name}
                            </label>
                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">€{feature.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{t.technical}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">{t.techStack}</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
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
                  <h4 className="text-lg font-medium text-gray-900 mb-4">{t.deployment}</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
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

          {/* Pricing Calculator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{t.investment}</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t.totalPrice}:</span>
                  <span className="text-2xl font-bold text-blue-600">€{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t.maintenance}:</span>
                  <span className="text-lg font-semibold text-gray-900">€{getMaintenanceCost().toLocaleString()}</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">{t.totalInvestment}:</span>
                  <span className="text-2xl font-bold text-green-600">€{getTotalWithMaintenance().toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-6 font-medium">
                Request Quote
              </button>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">{t.support}</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 24/7 Technical Support</li>
                  <li>• Monthly Updates</li>
                  <li>• Security Patches</li>
                  <li>• Performance Monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 