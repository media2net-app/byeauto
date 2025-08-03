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
    'welcome_back_bye_auto': 'Welcome back, BYE AUTO',

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

    // Repair Modal
    'repair_details': 'Repair Details',
    'repair_type': 'Repair Type',
    'estimated_cost': 'Estimated Cost',
    'estimated_time': 'Estimated Time',
    'priority': 'Priority',
    'assigned_technician': 'Assigned Technician',
    'notes': 'Notes',
    'start_repair': 'Start Repair',
    'update_repair': 'Update Repair',
    'close_repair': 'Close Repair',
    'repair_notes_placeholder': 'Enter repair notes...',
    'select_technician': 'Select Technician',
    'select_priority': 'Select Priority',
    'select_repair_type': 'Select Repair Type',

    // Tuning Services
    'stage_1': 'Stage 1',
    'stage_2': 'Stage 2',
    'stage_3': 'Stage 3',
    'stage_1_desc': 'Software optimization for improved performance',
    'stage_2_desc': 'Hardware upgrades with software tuning',
    'stage_3_desc': 'Complete performance build with custom hardware',
    'power_increase': 'Power Increase',

    // Work Management
    'work_management': 'Work Management',
    'workshop_dashboard': 'Workshop Dashboard',
    'remaining_work_hours': 'Remaining Work Hours',
    'expected_completion': 'Expected Completion',
    'overtime_alert': 'Overtime Alert',
    'today': 'Today',
    'normal_time': 'Normal Time',
    'working_status': 'Working Status',
    'working': 'Working',
    'outside_work_hours': 'Outside Work Hours',
    'remaining_work': 'Remaining Work',
    'expected_finish': 'Expected Finish',
    'waiting_items': 'Waiting Items',
    'overtime_needed': 'Overtime Needed',
    'overtime_until': 'Overtime Until',
    'plan_extra_time': 'Plan Extra Time!',
    'on_schedule': 'On Schedule',
    'no_overtime_needed': 'No Overtime Needed',
    'total_work': 'Total Work',
    'ready': 'Ready',
    'in_progress': 'In Progress',
    'team': 'Team',
    'tasks': 'tasks',
    'efficiency': 'Efficiency',
    'average_time': 'Average Time',
    'time_saved': 'Time Saved',
    'customer_satisfaction': 'Customer Satisfaction',
    'pending': 'Pending',
    'assigned_to': 'Assigned To',
    'work_type': 'Work Type',
    'new_task': 'New Task',
    'edit_task': 'Edit Task',
    'delete_task': 'Delete Task',
    'start': 'Start',
    'finish': 'Finish',
    'restart': 'Restart',
    'back': 'Back',
    'add': 'Add',
    'select_team_member': 'Select Team Member',
    'estimated_time_placeholder': 'e.g. 2h',
    'confirm_delete': 'Are you sure you want to delete this task?',

    // Opening Hours
    'opening_hours': 'Opening Hours',
    'business_hours': 'Business Hours',
    'set_all_days': 'Set All Days 08:00-18:00',
    'weekdays_only': 'Weekdays Only',
    'close_all_days': 'Close All Days',
    'save_opening_hours': 'Save Opening Hours',
    'closed': 'Closed',
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday',
    'saturday': 'Saturday',
    'sunday': 'Sunday',

    // Work Hours & Overtime
    'work_end_time': 'Work End Time',
    'overtime_required': 'Overtime Required',
    'work_until': 'Work Until',
    'hours_overtime': 'hours overtime',
    'today_schedule': 'Today\'s Schedule',
    
    // Additional TV Dashboard
    'actual_time': 'Actual Time',
    'estimated': 'Estimated',
    'time_registration': 'Time Registration',
    'total_estimated': 'Total Estimated',
    'worked_actual': 'Worked Actual',
    'overtime_hours': 'Overtime Hours',
    'efficiency_percentage': 'Efficiency',
    'program': 'Program',
    'remaining': 'Remaining',
    
    // Priority Levels
    'high': 'High',
    'medium': 'Medium', 
    'low': 'Low',

    // Work Timer
    'work_timer': 'Work Timer',
    'selected_vehicle': 'Selected Vehicle',
    'no_work_items_available': 'No work items available',
    'ready_to_start': 'Ready to Start',
    'work_in_progress': 'Work in Progress',
    'work_paused': 'Work Paused',
    'pause': 'Pause',
    'resume': 'Resume',

    // Common
    'close': 'Close',
    'logout': 'Logout',
    'language': 'Language',
    'english': 'English',
    'romanian': 'Romanian'
  },
  ro: {
    // Login
    'welcome_back': 'Bine ai revenit! Te rugăm să te conectezi la contul tău.',
    'username': 'Nume utilizator',
    'password': 'Parolă',
    'sign_in': 'Conectare',
    'remember_me': 'Ține-mă minte',
    'forgot_password': 'Ai uitat parola?',
    'demo_credentials': 'Credențiale Demo:',
    'signing_in': 'Se conectează...',
    'cars_service': 'MAȘINI & SERVICII',
    'username_placeholder': 'Introdu numele de utilizator',
    'password_placeholder': 'Introdu parola',
    'invalid_credentials': 'Credențiale invalide. Folosește admin/BYE9438x_# pentru demo.',
    'demo_username': 'Nume utilizator',
    'demo_password': 'Parolă',

    // Dashboard
    'dashboard': 'Panou de Control',
    'overview': 'Prezentare Generală',
    'welcome_message': 'Bine ai revenit! Iată ce se întâmplă cu flota ta.',
    'vehicles_in_service': 'Vehicule în Serviciu',
    'avg_repair_time': 'Timp Mediu Reparații',
    'repairs_in_progress': 'Reparații în Curs',
    'monthly_revenue': 'Venit Lunar',
    'this_week': 'această săptămână',
    'vs_last_week': 'vs săptămâna trecută',
    'vs_last_month': 'vs luna trecută',
    'bmw_service_management': 'Gestionare Servicii BMW',
    'bmw_service_description': 'Service auto dedicat BMW cu experiență - reparații, întreținere - electrică și mecanică!',
    'recent_activity': 'Activitate Recentă',
    'quick_actions': 'Acțiuni Rapide',
    'add_new_vehicle': 'Adaugă Vehicul Nou',
    'create_repair_order': 'Creează Comandă Reparație',
    'client_portal': 'Portal Client',
    'system_quote': 'Ofertă Sistem',
    'welcome_back_bye_auto': 'Bine ai revenit, BYE AUTO',

    // Vehicle Status
    'in_service': 'În Serviciu',
    'waiting': 'În Așteptare',
    'completed': 'Finalizat',
    'diagnostic': 'Diagnostic',
    'high_priority': 'Ridicată',
    'medium_priority': 'Medie',
    'low_priority': 'Scăzută',
    'active_repairs': 'Reparații Active',
    'scheduled': 'Programat',
    'ready_for_delivery': 'Gata pentru Livrare',
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
    'search_vehicles_placeholder': 'Caută vehicule după număr, client sau model...',
    'all_status': 'Toate Statusurile',
    'active': 'Activ',
    'maintenance': 'Întreținere',
    'license_plate': 'Număr Înmatriculare',
    'client': 'Client',
    'mileage': 'Kilometraj',
    'last_service': 'Ultimul Serviciu',
    'next_service': 'Următorul Serviciu',
    'view': 'Vizualizare',
    'edit': 'Editare',
    'delete': 'Ștergere',
    'save': 'Salvare',
    'cancel': 'Anulare',
    'vehicle_details': 'Detalii Vehicul',
    'edit_vehicle': 'Editare Vehicul',
    'make': 'Marcă',
    'model': 'Model',
    'year': 'An',
    'status': 'Status',
    'no_vehicles_found': 'Nu s-au găsit vehicule',
    'try_adjusting_search': 'Încearcă să ajustezi căutarea sau criteriile de filtrare.',

    // Repair Modal
    'repair_details': 'Detalii Reparație',
    'repair_type': 'Tip Reparație',
    'estimated_cost': 'Cost Estimativ',
    'estimated_time': 'Timp Estimativ',
    'priority': 'Prioritate',
    'assigned_technician': 'Tehnician Atribuit',
    'notes': 'Note',
    'start_repair': 'Începe Reparația',
    'update_repair': 'Actualizează Reparația',
    'close_repair': 'Închide Reparația',
    'repair_notes_placeholder': 'Introdu notele de reparație...',
    'select_technician': 'Selectează Tehnician',
    'select_priority': 'Selectează Prioritate',
    'select_repair_type': 'Selectează Tip Reparație',

    // Tuning Services
    'stage_1': 'Etapa 1',
    'stage_2': 'Etapa 2',
    'stage_3': 'Etapa 3',
    'stage_1_desc': 'Optimizare software pentru performanță îmbunătățită',
    'stage_2_desc': 'Upgrade-uri hardware cu tuning software',
    'stage_3_desc': 'Construcție completă de performanță cu hardware personalizat',
    'power_increase': 'Creștere Putere',

    // Work Management
    'work_management': 'Gestionare Lucru',
    'workshop_dashboard': 'Panou de Control Atelier',
    'remaining_work_hours': 'Ore Lucru Rămase',
    'expected_completion': 'Finalizare Așteptată',
    'overtime_alert': 'Alertă Ore Suplimentare',
    'today': 'Astăzi',
    'normal_time': 'Timp Normal',
    'working_status': 'Status Lucru',
    'working': 'Lucru',
    'outside_work_hours': 'În Afara Programului',
    'remaining_work': 'Lucru Rămas',
    'expected_finish': 'Finalizare Așteptată',
    'waiting_items': 'Elemente În Așteptare',
    'overtime_needed': 'Ore Suplimentare Necesare',
    'overtime_until': 'Ore Suplimentare Până La',
    'plan_extra_time': 'Planifică Timp Suplimentar!',
    'on_schedule': 'Pe Program',
    'no_overtime_needed': 'Nu Sunt Necesare Ore Suplimentare',
    'total_work': 'Lucru Total',
    'ready': 'Gata',
    'in_progress': 'În Curs',
    'team': 'Echipa',
    'tasks': 'sarcini',
    'efficiency': 'Eficiență',
    'average_time': 'Timp Mediu',
    'time_saved': 'Timp Economisit',
    'customer_satisfaction': 'Satisfacția Clienților',
    'pending': 'În Așteptare',
    'assigned_to': 'Atribuit La',
    'work_type': 'Tip Lucru',
    'new_task': 'Sarcină Nouă',
    'edit_task': 'Editează Sarcină',
    'delete_task': 'Șterge Sarcină',
    'start': 'Începe',
    'finish': 'Finalizează',
    'restart': 'Repornește',
    'back': 'Înapoi',
    'add': 'Adaugă',
    'select_team_member': 'Selectează Membru Echipă',
    'estimated_time_placeholder': 'ex. 2h',
    'confirm_delete': 'Ești sigur că vrei să ștergi această sarcină?',

    // Opening Hours
    'opening_hours': 'Program de Funcționare',
    'business_hours': 'Program de Lucru',
    'set_all_days': 'Setează Toate Zilele 08:00-18:00',
    'weekdays_only': 'Doar Zile Lucrătoare',
    'close_all_days': 'Închide Toate Zilele',
    'save_opening_hours': 'Salvează Programul',
    'closed': 'Închis',
    'monday': 'Luni',
    'tuesday': 'Marți',
    'wednesday': 'Miercuri',
    'thursday': 'Joi',
    'friday': 'Vineri',
    'saturday': 'Sâmbătă',
    'sunday': 'Duminică',

    // Work Hours & Overtime
    'work_end_time': 'Timp Finalizare',
    'overtime_required': 'Ore Suplimentare Necesare',
    'work_until': 'Lucru Până La',
    'hours_overtime': 'ore suplimentare',
    'today_schedule': 'Programul de Astăzi',
    
    // Additional TV Dashboard
    'actual_time': 'Timp Efectiv',
    'estimated': 'Estimativ',
    'time_registration': 'Registrare Timp',
    'total_estimated': 'Total Estimativ',
    'worked_actual': 'Lucrat Efectiv',
    'overtime_hours': 'Ore Suplimentare',
    'efficiency_percentage': 'Eficiență',
    'program': 'Program',
    'remaining': 'Rămas',
    
    // Priority Levels
    'high': 'Ridicată',
    'medium': 'Medie', 
    'low': 'Scăzută',

    // Work Timer
    'work_timer': 'Timer Lucru',
    'selected_vehicle': 'Vehicul Selectat',
    'no_work_items_available': 'Nu sunt sarcini disponibile',
    'ready_to_start': 'Gata de Început',
    'work_in_progress': 'Lucru în Curs',
    'work_paused': 'Lucru Întrerupt',
    'pause': 'Pauză',
    'resume': 'Continuă',

    // Common
    'close': 'Închide',
    'logout': 'Deconectare',
    'language': 'Limbă',
    'english': 'Engleză',
    'romanian': 'Română'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ro')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
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