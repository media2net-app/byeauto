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
    { number: "500+", label: "Happy Customers" },
    { number: "1000+", label: "Services Completed" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">BYE AUTO</h1>
              <span className="ml-2 text-gray-400 text-sm">BMW Service & Performance</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <LanguageSwitcher />
              <Link 
                href="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Admin Login
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <Link 
                    href="/login"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              BMW Service & Performance
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional BMW service, repair, and performance tuning. From routine maintenance to stage 3+ builds, we keep your BMW running at its best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#services"
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors font-medium"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400 text-lg">Comprehensive BMW care and performance solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors">
                <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <a href="#contact" className="text-purple-400 hover:text-purple-300 flex items-center">
                  Learn More <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About BYE AUTO</h2>
              <p className="text-gray-400 text-lg mb-6">
                We are passionate BMW enthusiasts and certified technicians with years of experience in BMW service, repair, and performance tuning.
              </p>
              <p className="text-gray-400 text-lg mb-8">
                From routine maintenance to complete stage 3+ builds, we provide professional service with attention to detail and quality workmanship.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 text-gray-300">5.0 Rating</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Why Choose BYE AUTO?</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  BMW Certified Technicians
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Latest Diagnostic Equipment
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Quality Parts & Materials
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Competitive Pricing
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Warranty on All Work
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-400 text-lg">Ready to give your BMW the care it deserves?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <p className="text-gray-400">+40 721 123 456</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-gray-400">Bucharest, Romania</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
              <p className="text-gray-400">Mon-Fri: 8AM-6PM</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="#contact"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Book Your Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">BYE AUTO</h3>
              <p className="text-gray-400">Professional BMW service and performance tuning.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>BMW Service & Repair</li>
                <li>Performance Tuning</li>
                <li>Preventive Maintenance</li>
                <li>Diagnostics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+40 721 123 456</li>
                <li>Bucharest, Romania</li>
                <li>Mon-Fri: 8AM-6PM</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Admin</h4>
              <Link 
                href="/login"
                className="text-purple-400 hover:text-purple-300"
              >
                Admin Login
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BYE AUTO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
