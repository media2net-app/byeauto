"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import { 
  Wrench, 
  Settings, 
  Car, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  ArrowRight,
  ChevronRight,
  Zap,
  Gauge,
  Target,
  Award,
  CheckCircle
} from "lucide-react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('homepage');
  const locale = useLocale();

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('stage_1_tuning'),
      description: t('stage_1_description'),
      color: "bg-gradient-to-br from-blue-600 to-blue-800",
      features: t.raw('stage_1_features')
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: t('stage_2_tuning'),
      description: t('stage_2_description'),
      color: "bg-gradient-to-br from-purple-600 to-purple-800",
      features: t.raw('stage_2_features')
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('stage_3_tuning'),
      description: t('stage_3_description'),
      color: "bg-gradient-to-br from-red-600 to-red-800",
      features: t.raw('stage_3_features')
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: t('bmw_service_repair'),
      description: t('bmw_service_description'),
      color: "bg-gradient-to-br from-gray-600 to-gray-800",
      features: t.raw('bmw_service_features')
    }
  ];

  const stats = [
    { number: t('tuned_bmws_count'), label: t('tuned_bmws'), icon: <Car className="w-6 h-6" /> },
    { number: t('hp_gained'), label: t('hp_gained_label'), icon: <Zap className="w-6 h-6" /> },
    { number: t('years_experience'), label: t('years_experience_label'), icon: <Award className="w-6 h-6" /> },
    { number: t('customer_rating'), label: t('customer_rating_label'), icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Logo size="xl" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">{t('navigation.services')}</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">{t('navigation.about')}</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">{t('navigation.contact')}</a>
              <LanguageSwitcher />
              <Link 
                href={`/${locale}/login`}
                className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm lg:text-base"
              >
                {t('navigation.admin_login')}
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
                  {t('navigation.services')}
                </a>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.about')}
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.contact')}
                </a>
                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <LanguageSwitcher />
                  <Link 
                    href={`/${locale}/login`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.admin_login')}
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* BMW M4 CSL Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bmw-m4-csl-bg.jpg')`
          }}
        ></div>
        
        {/* Black Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="text-white">
                <div className="mb-6">
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {t('bmw_tuning_specialists')}
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-white">
                    {t('more_power')}
                  </span>
                  <span className="block text-white">
                    {t('more_driving_pleasure')}
                  </span>
                  <span className="block text-white">
                    {t('safe_and_fast')}
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-white mb-8 max-w-2xl leading-relaxed">
                  {t('hero_description')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#contact"
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold flex items-center justify-center text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                  >
                    {t('start_tuning_journey')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="#services"
                    className="group border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-bold text-lg backdrop-blur-sm hover:shadow-2xl transform hover:scale-105"
                  >
                    {t('view_tuning_stages')}
                  </a>
                </div>
              </div>
              
              {/* Right Side - Stats */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-blue-400">+25%</div>
                    <div className="text-sm text-gray-300">{t('power_gain')}</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-purple-400">+35%</div>
                    <div className="text-sm text-gray-300">{t('torque_boost')}</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-red-400">-1.2s</div>
                    <div className="text-sm text-gray-300">{t('zero_to_hundred_time')}</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-yellow-400">100+</div>
                    <div className="text-sm text-gray-300">{t('tuned_bmws')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Carbon Fiber Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/black-carbon-fiber-material-texture-vector.jpg')`
          }}
        ></div>
        
        {/* Black Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              {t('tuning_stages')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('performance_tuning')}
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl px-4 max-w-3xl mx-auto">
              {t('tuning_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2">
                {/* Service Icon */}
                <div className={`${service.color} w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10">
                    {service.icon}
                  </div>
                </div>
                
                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{service.title}</h3>
                
                {/* Service Description */}
                <p className="text-gray-300 mb-6 text-base sm:text-lg leading-relaxed">{service.description}</p>
                
                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300"
                >
                  {t('get_started')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* BMW Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bmw-performance-bg.jpg')`
          }}
        ></div>
        
        {/* Black Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t('bye_auto_performance')}
              </span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              {t('real_results')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center bg-black/20 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm sm:text-base font-medium">{stat.label}</div>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">{t('about_bye_auto')}</h2>
              <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">
                {t('about_description_1')}
              </p>
              <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8">
                {t('about_description_2')}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 text-gray-300 text-sm sm:text-base">{t('rating_text')}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{t('why_choose_bye_auto')}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.raw('why_choose_features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-300 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">{t('contact_us')}</h2>
            <p className="text-gray-400 text-base sm:text-lg px-4">{t('contact_description')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{t('call_us')}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t('phone_number')}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{t('visit_us')}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t('address')}</p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{t('business_hours')}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t('hours')}</p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <a 
              href="#contact"
              className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm sm:text-base"
            >
              {t('book_appointment')}
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
              <p className="text-gray-400 text-sm sm:text-base">{t('footer_description')}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer_services')}</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                {t.raw('footer_services_list').map((service: string, index: number) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer_contact')}</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>{t('phone_number')}</li>
                <li>{t('address')}</li>
                <li>{t('hours')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer_admin')}</h4>
              <Link 
                href={`/${locale}/login`}
                className="text-purple-400 hover:text-purple-300 text-sm sm:text-base"
              >
                {t('footer_admin_login')}
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">{t('copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 