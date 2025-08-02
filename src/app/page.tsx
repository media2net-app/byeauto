"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  Wrench, 
  Settings, 
  Car, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "BMW Service & Repair",
      description: "Complete diagnostic and repair services for all BMW models",
      color: "bg-blue-600"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Performance Tuning",
      description: "Stage 1, 2, and 3+ tuning for maximum performance",
      color: "bg-purple-600"
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Preventive Maintenance",
      description: "Regular maintenance to keep your BMW in perfect condition",
      color: "bg-green-600"
    }
  ];

  const stats = [
    { number: "100+", label: "Happy Customers" },
    { number: "500+", label: "Services Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "4.8★", label: "Customer Rating" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">BYE AUTO</h1>
              <span className="ml-2 text-gray-400 text-xs sm:text-sm hidden sm:block">BMW Service & Performance</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Services</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Contact</a>
              <LanguageSwitcher />
              <Link 
                href="/login"
                className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm lg:text-base"
              >
                Admin Login
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 bg-gray-900">
              <nav className="flex flex-col space-y-3">
                <a 
                  href="#services" 
                  className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <LanguageSwitcher />
                  <Link 
                    href="/login"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              BMW Service & Performance
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Professional BMW service, repair, and performance tuning in Dragodana. From routine maintenance to stage 3+ builds, we keep your BMW running at its best.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a 
                href="#contact"
                className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center text-sm sm:text-base"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#services"
                className="border border-white text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors font-medium text-sm sm:text-base"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Our Services</h2>
            <p className="text-gray-400 text-base sm:text-lg px-4">Comprehensive BMW care and performance solutions</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6 hover:border-purple-500 transition-colors">
                <div className={`${service.color} w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white mb-3 sm:mb-4`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{service.description}</p>
                <a href="#contact" className="text-purple-400 hover:text-purple-300 flex items-center text-sm sm:text-base">
                  Learn More <ChevronRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">About BYE AUTO</h2>
              <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">
                We are passionate BMW enthusiasts and certified technicians with years of experience in BMW service, repair, and performance tuning, serving Dragodana and surrounding areas.
              </p>
              <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8">
                From routine maintenance to complete stage 3+ builds, we provide professional service with attention to detail and quality workmanship at our location in Dragodana.
              </p>
                              <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-gray-300 text-sm sm:text-base">4.8 Rating (16 reviews)</span>
                  </div>
                </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Why Choose BYE AUTO?</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  BMW Certified Technicians
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  Latest Diagnostic Equipment
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  Quality Parts & Materials
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  Competitive Pricing
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  Warranty on All Work
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Contact Us</h2>
            <p className="text-gray-400 text-base sm:text-lg px-4">Ready to give your BMW the care it deserves?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Call Us</h3>
              <p className="text-gray-400 text-sm sm:text-base">0764 755 733</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Visit Us</h3>
              <p className="text-gray-400 text-sm sm:text-base">Cimitirului nr 95, Dragodana 137201</p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Business Hours</h3>
              <p className="text-gray-400 text-sm sm:text-base">Mon-Fri: 8:30AM-6PM</p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <a 
              href="#contact"
              className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm sm:text-base"
            >
              Book Your Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">BYE AUTO</h3>
              <p className="text-gray-400 text-sm sm:text-base">Professional BMW service and performance tuning.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>BMW Service & Repair</li>
                <li>Performance Tuning</li>
                <li>Preventive Maintenance</li>
                <li>Diagnostics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>0764 755 733</li>
                <li>Cimitirului nr 95, Dragodana 137201</li>
                <li>Mon-Fri: 8:30AM-6PM</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Admin</h4>
              <Link 
                href="/login"
                className="text-purple-400 hover:text-purple-300 text-sm sm:text-base"
              >
                Admin Login
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 BYE AUTO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
