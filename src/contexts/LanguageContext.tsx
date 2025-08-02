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
    'cars_service': 'CARS & SERVICE',
    'username_placeholder': 'Enter your username',
    'password_placeholder': 'Enter your password',
    'invalid_credentials': 'Invalid credentials. Use admin/BYE9438x_# for demo.',
    'demo_username': 'Username',
    'demo_password': 'Password',

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
    'in_service': 'In Service',
    'waiting': 'Waiting',
    'completed': 'Completed',
    'diagnostic': 'Diagnostic',
    'high_priority': 'High',
    'medium_priority': 'Medium',
    'low_priority': 'Low',
    'active_repairs': 'Active Repairs',
    'scheduled': 'Scheduled',
    'ready_for_delivery': 'Ready for Delivery',
    'urgent': 'Urgent',

    // Navigation
    'vehicles': 'Vehicles',
    'repairs': 'Repairs',
    'clients': 'Clients',
    'analytics': 'Analytics',
    'settings': 'Settings',
    'messages': 'Messages',
    'tuning_services': 'Tuning Services',

    // Vehicles Page
    'manage_bmw_fleet': 'Manage your BMW fleet',
    'add_vehicle': 'Add Vehicle',
    'search_vehicles_placeholder': 'Search vehicles by license plate, client, or model...',
    'all_status': 'All Status',
    'active': 'Active',
    'maintenance': 'Maintenance',
    'license_plate': 'License Plate',
    'client': 'Client',
    'mileage': 'Mileage',
    'last_service': 'Last Service',
    'next_service': 'Next Service',
    'view': 'View',
    'edit': 'Edit',
    'delete': 'Delete',
    'save': 'Save',
    'cancel': 'Cancel',
    'vehicle_details': 'Vehicle Details',
    'edit_vehicle': 'Edit Vehicle',
    'make': 'Make',
    'model': 'Model',
    'year': 'Year',
    'status': 'Status',
    'no_vehicles_found': 'No vehicles found',
    'try_adjusting_search': 'Try adjusting your search or filter criteria.',

    // Tune Page
    'bmw_tuning_services': 'BMW Tuning Services',
    'tuning_description': 'Professional ECU tuning and performance upgrades',
    'find_your_vehicle': 'Find Your Vehicle',
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
    'bmw_tuning_wizard': 'BMW Tuning Wizard',
    'bmw_wizard_description': 'Don\'t have a license plate? Use our step-by-step BMW tuning wizard to find the perfect upgrade for your BMW.',
    'start_bmw_wizard': 'Start BMW Tuning Wizard',

    // Notifications
    'system_online': 'System Online',
    'system_online_message': 'BMW Service Management System is running smoothly',
    'new_messages': 'New Messages',
    'new_messages_text': 'You have 2 unread messages in your inbox',
    'maintenance_due': 'Maintenance Due',
    'maintenance_due_message': 'Vehicle B-123-ABC needs service in 3 days',
    'test_notification': 'Test Notification',
    'test_notification_message': 'This is a test notification from the dashboard',
    'test_notifications': 'Test Notifications',
    'welcome_back_bye_auto': 'Welcome back, BYE AUTO',

    // Recent Activity
    'bmw_x5_repair_completed': 'BMW X5 Repair Completed',
    'engine_diagnostic_finished': 'Engine diagnostic and electrical system repair finished',
    'new_bmw_320i_arrived': 'New BMW 320i Arrived',
    'client_maria_brake_inspection': 'Client Maria Ionescu - brake system inspection needed',
    'urgent_repair_alert': 'Urgent Repair Alert',
    'bmw_x3_transmission_inspection': 'BMW X3 requires immediate transmission inspection',
    '1_hour_ago': '1 hour ago',
    '3_hours_ago': '3 hours ago',
    '5_hours_ago': '5 hours ago',

    // Quote Page
    'view_special_proposal': 'View Special Proposal',
    'complete_solution_proposal': 'BYE Auto - Complete Solution Proposal',
    'system_development_bmw_project': 'System Development + BMW F32 420d N47 Stage 2+ Project',
    'system_development': 'System Development',
    'bmw_project': 'BMW Project',
    'bmw_service_management_system': 'BMW Service Management System',
    'bmw_f32_stage2_title': 'BMW F32 420d N47 – STAGE 2+ / MAX PERFORMANCE BUILD',
    'goal': 'Goal',
    'required_upgrades': 'Required Upgrades',
    'expected_results': 'Expected Results',
    'estimated_budget': 'Estimated Budget',
    'client_notes': 'Client Notes',
    'core_features': 'Core Features',
    'advanced_features': 'Advanced Features',
    'enhancements': 'Enhancements',
    'performance_upgrades': 'Performance Upgrades',
    'preventive_work': 'Preventive Work',
    'm4_look_quad': 'M4-Look & Quad Exhaust',
    'annual_maintenance': 'Annual Maintenance',
    'total_investment': 'Total Investment',
    'includes_maintenance': 'Includes annual maintenance and support',
    'technology_stack': 'Technology Stack',
    'deployment': 'Deployment',
    'support_maintenance': 'Support & Maintenance',

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
    'cars_service': 'MAȘINI & SERVICE',
    'username_placeholder': 'Introduceți numele de utilizator',
    'password_placeholder': 'Introduceți parola',
    'invalid_credentials': 'Credențiale invalide. Folosiți admin/BYE9438x_# pentru demo.',
    'demo_username': 'Nume utilizator',
    'demo_password': 'Parolă',

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
    'messages': 'Mesaje',
    'tuning_services': 'Servicii Tuning',

    // Vehicles Page
    'manage_bmw_fleet': 'Gestionează flota ta BMW',
    'add_vehicle': 'Adaugă Vehicul',
    'search_vehicles_placeholder': 'Caută vehicule după număr înmatriculare, client sau model...',
    'all_status': 'Toate Statusurile',
    'active': 'Activ',
    'maintenance': 'Întreținere',
    'license_plate': 'Număr Înmatriculare',
    'client': 'Client',
    'mileage': 'Kilometraj',
    'last_service': 'Ultimul Service',
    'next_service': 'Următorul Service',
    'view': 'Vezi',
    'edit': 'Editează',
    'delete': 'Șterge',
    'save': 'Salvează',
    'cancel': 'Anulează',
    'vehicle_details': 'Detalii Vehicul',
    'edit_vehicle': 'Editează Vehicul',
    'make': 'Marcă',
    'model': 'Model',
    'year': 'An',
    'status': 'Status',
    'no_vehicles_found': 'Nu s-au găsit vehicule',
    'try_adjusting_search': 'Încercați să ajustați criteriile de căutare sau filtrare.',

    // Tune Page
    'bmw_tuning_services': 'Servicii Tuning BMW',
    'tuning_description': 'Tuning ECU profesional și upgrade-uri performanță',
    'find_your_vehicle': 'Găsește Vehiculul Tău',
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
    'bmw_tuning_wizard': 'Asistent Tuning BMW',
    'bmw_wizard_description': 'Nu aveți număr de înmatriculare? Folosiți asistentul nostru pas cu pas pentru tuning BMW pentru a găsi upgrade-ul perfect pentru BMW-ul dvs.',
    'start_bmw_wizard': 'Pornește Asistentul BMW',

    // Notifications
    'system_online': 'Sistem Online',
    'system_online_message': 'Sistemul de Management Service BMW funcționează perfect',
    'new_messages': 'Mesaje Noi',
    'new_messages_text': 'Aveți 2 mesaje necitite în inbox',
    'maintenance_due': 'Întreținere Scadentă',
    'maintenance_due_message': 'Vehiculul B-123-ABC necesită service în 3 zile',
    'test_notification': 'Notificare Test',
    'test_notification_message': 'Aceasta este o notificare de test de pe dashboard',
    'test_notifications': 'Test Notificări',
    'welcome_back_bye_auto': 'Bun venit înapoi, BYE AUTO',

    // Recent Activity
    'bmw_x5_repair_completed': 'Reparație BMW X5 Finalizată',
    'engine_diagnostic_finished': 'Diagnostic motor și reparație sistem electric finalizate',
    'new_bmw_320i_arrived': 'BMW 320i Nou Sosit',
    'client_maria_brake_inspection': 'Client Maria Ionescu - inspecție sistem frână necesară',
    'urgent_repair_alert': 'Alertă Reparație Urgentă',
    'bmw_x3_transmission_inspection': 'BMW X3 necesită inspecție transmisie imediată',
    '1_hour_ago': 'acum 1 oră',
    '3_hours_ago': 'acum 3 ore',
    '5_hours_ago': 'acum 5 ore',

    // Quote Page
    'view_special_proposal': 'Vezi Propunerea Specială',
    'complete_solution_proposal': 'BYE Auto - Propunere Soluție Completă',
    'system_development_bmw_project': 'Dezvoltare Sistem + Proiect BMW F32 420d N47 Stage 2+',
    'system_development': 'Dezvoltare Sistem',
    'bmw_project': 'Proiect BMW',
    'bmw_service_management_system': 'Sistem Management Service BMW',
    'bmw_f32_stage2_title': 'BMW F32 420d N47 – STAGE 2+ / CONSTRUCȚIE PERFORMANȚĂ MAXIMĂ',
    'goal': 'Obiectiv',
    'required_upgrades': 'Upgrade-uri Necesare',
    'expected_results': 'Rezultate Așteptate',
    'estimated_budget': 'Buget Estimativ',
    'client_notes': 'Note Client',
    'core_features': 'Funcții de Bază',
    'advanced_features': 'Funcții Avansate',
    'enhancements': 'Îmbunătățiri',
    'performance_upgrades': 'Upgrade-uri Performanță',
    'preventive_work': 'Lucrări Preventive',
    'm4_look_quad': 'M4-Look & Eșapament Quad',
    'annual_maintenance': 'Întreținere Anuală',
    'total_investment': 'Investiție Totală',
    'includes_maintenance': 'Include întreținere anuală și suport',
    'technology_stack': 'Stack Tehnologie',
    'deployment': 'Implementare',
    'support_maintenance': 'Suport & Întreținere',

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