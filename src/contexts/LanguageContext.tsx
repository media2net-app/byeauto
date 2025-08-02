"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Login
    'welcome_back': 'Welcome back! Please sign in to your account.',
    'username': 'Username',
    'password': 'Password',
    'sign_in': 'Sign in',
    'remember_me': 'Remember me',
    'forgot_password': 'Forgot password?',
    'demo_credentials': 'Demo Credentials:',
    'signing_in': 'Signing in...',

    // Dashboard
    'dashboard': 'Dashboard',
    'overview': 'Overview',
    'welcome_message': 'Welcome back! Here\'s what\'s happening with your fleet.',
    'vehicles_in_service': 'Vehicles in Service',
    'avg_repair_time': 'Avg Repair Time',
    'repairs_in_progress': 'Repairs in Progress',
    'monthly_revenue': 'Monthly Revenue',
    'this_week': 'this week',
    'vs_last_week': 'vs last week',
    'vs_last_month': 'vs last month',
    'bmw_service_management': 'BMW Service Management',
    'bmw_service_description': 'Service auto dedicat BMW cu experiența - reparatii, întreținere - electrica și mecanică!',
    'recent_activity': 'Recent Activity',
    'quick_actions': 'Quick Actions',
    'add_new_vehicle': 'Add New Vehicle',
    'create_repair_order': 'Create Repair Order',
    'client_portal': 'Client Portal',
    'system_quote': 'System Quote',

    // Vehicle Status
    'in_service': 'În Service',
    'waiting': 'În Așteptare',
    'completed': 'Finalizat',
    'diagnostic': 'Diagnostic',
    'high_priority': 'Înaltă',
    'medium_priority': 'Medie',
    'low_priority': 'Scăzută',
    'active_repairs': 'Reparații Active',
    'scheduled': 'Programat',
    'ready_for_delivery': 'Gata de Livrare',
    'urgent': 'Urgent',

    // Navigation
    'vehicles': 'Vehicles',
    'repairs': 'Repairs',
    'clients': 'Clients',
    'analytics': 'Analytics',
    'settings': 'Settings',
    'tuning_services': 'Tuning Services',

    // Tune Page
    'bmw_tuning_services': 'BMW Tuning Services',
    'tuning_description': 'Professional ECU tuning and performance upgrades',
    'find_your_vehicle': 'Find Your Vehicle',
    'license_plate': 'License Plate',
    'license_placeholder': 'e.g., DB 99BYE',
    'license_help': 'Enter your license plate to find tuning options',
    'find_tuning_options': 'Find Tuning Options',
    'searching': 'Searching...',
    'example': 'Example:',
    'vehicle_information': 'Vehicle Information',
    'vehicle': 'Vehicle',
    'engine': 'Engine',
    'current_power': 'Current Power',
    'current_torque': 'Current Torque',
    'year': 'Year',
    'mileage': 'Mileage',
    'transmission': 'Transmission',
    'tuning_packages': 'Tuning Packages',
    'power_gain': 'Power Gain',
    'torque_gain': 'Torque Gain',
    'duration': 'Duration',
    'warranty': 'Warranty',
    'select_package': 'Select Package',
    'features': 'Features',
    'performance_summary': 'Performance Summary',
    'after_tuning': 'After Tuning',
    'additional_parts': 'Additional Performance Parts',
    'add_to_quote': 'Add to Quote',

    // Common
    'close': 'Close',
    'logout': 'Logout',
    'language': 'Language',
    'english': 'English',
    'romanian': 'Romanian'
  },
  ro: {
    // Login
    'welcome_back': 'Bun venit! Vă rugăm să vă conectați la contul dvs.',
    'username': 'Nume utilizator',
    'password': 'Parolă',
    'sign_in': 'Conectare',
    'remember_me': 'Ține-mă minte',
    'forgot_password': 'Ai uitat parola?',
    'demo_credentials': 'Credențiale Demo:',
    'signing_in': 'Se conectează...',

    // Dashboard
    'dashboard': 'Dashboard',
    'overview': 'Prezentare generală',
    'welcome_message': 'Bun venit înapoi! Iată ce se întâmplă cu flota ta.',
    'vehicles_in_service': 'Vehicule în Service',
    'avg_repair_time': 'Timp Mediu Reparație',
    'repairs_in_progress': 'Reparații în Curs',
    'monthly_revenue': 'Venit Lunar',
    'this_week': 'această săptămână',
    'vs_last_week': 'vs săptămâna trecută',
    'vs_last_month': 'vs luna trecută',
    'bmw_service_management': 'Management Service BMW',
    'bmw_service_description': 'Service auto dedicat BMW cu experiența - reparatii, întreținere - electrica și mecanică!',
    'recent_activity': 'Activitate Recentă',
    'quick_actions': 'Acțiuni Rapide',
    'add_new_vehicle': 'Adaugă Vehicul Nou',
    'create_repair_order': 'Creează Comandă Reparație',
    'client_portal': 'Portal Client',
    'system_quote': 'Ofertă Sistem',

    // Vehicle Status
    'in_service': 'În Service',
    'waiting': 'În Așteptare',
    'completed': 'Finalizat',
    'diagnostic': 'Diagnostic',
    'high_priority': 'Înaltă',
    'medium_priority': 'Medie',
    'low_priority': 'Scăzută',
    'active_repairs': 'Reparații Active',
    'scheduled': 'Programat',
    'ready_for_delivery': 'Gata de Livrare',
    'urgent': 'Urgent',

    // Navigation
    'vehicles': 'Vehicule',
    'repairs': 'Reparații',
    'clients': 'Clienți',
    'analytics': 'Analiză',
    'settings': 'Setări',
    'tuning_services': 'Servicii Tuning',

    // Tune Page
    'bmw_tuning_services': 'Servicii Tuning BMW',
    'tuning_description': 'Tuning ECU profesional și upgrade-uri performanță',
    'find_your_vehicle': 'Găsește Vehiculul Tău',
    'license_plate': 'Număr Înmatriculare',
    'license_placeholder': 'ex., DB 99BYE',
    'license_help': 'Introduceți numărul de înmatriculare pentru a găsi opțiunile de tuning',
    'find_tuning_options': 'Găsește Opțiuni Tuning',
    'searching': 'Se caută...',
    'example': 'Exemplu:',
    'vehicle_information': 'Informații Vehicul',
    'vehicle': 'Vehicul',
    'engine': 'Motor',
    'current_power': 'Putere Actuală',
    'current_torque': 'Cuplu Actual',
    'year': 'An',
    'mileage': 'Kilometraj',
    'transmission': 'Transmisie',
    'tuning_packages': 'Pachete Tuning',
    'power_gain': 'Creștere Putere',
    'torque_gain': 'Creștere Cuplu',
    'duration': 'Durată',
    'warranty': 'Garanție',
    'select_package': 'Selectează Pachet',
    'features': 'Caracteristici',
    'performance_summary': 'Rezumat Performanță',
    'after_tuning': 'După Tuning',
    'additional_parts': 'Piese Performanță Suplimentare',
    'add_to_quote': 'Adaugă la Ofertă',

    // Common
    'close': 'Închide',
    'logout': 'Deconectare',
    'language': 'Limbă',
    'english': 'Engleză',
    'romanian': 'Română'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ro')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 