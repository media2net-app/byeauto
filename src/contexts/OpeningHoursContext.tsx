"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DayHours {
  open: string;
  close: string;
  enabled: boolean;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

interface OpeningHoursContextType {
  openingHours: OpeningHours;
  setOpeningHours: (hours: OpeningHours) => void;
  getCurrentDayHours: () => DayHours | null;
  isCurrentlyOpen: () => boolean;
  getRemainingHoursToday: () => number;
  getWorkEndTime: (additionalHours: number) => Date | null;
  getDayName: (day: keyof OpeningHours) => string;
}

const OpeningHoursContext = createContext<OpeningHoursContextType | undefined>(undefined);

export const useOpeningHours = () => {
  const context = useContext(OpeningHoursContext);
  if (context === undefined) {
    throw new Error('useOpeningHours must be used within an OpeningHoursProvider');
  }
  return context;
};

const defaultOpeningHours: OpeningHours = {
  monday: { open: "08:00", close: "18:00", enabled: true },
  tuesday: { open: "08:00", close: "18:00", enabled: true },
  wednesday: { open: "08:00", close: "18:00", enabled: true },
  thursday: { open: "08:00", close: "18:00", enabled: true },
  friday: { open: "08:00", close: "18:00", enabled: true },
  saturday: { open: "08:00", close: "18:00", enabled: true },
  sunday: { open: "08:00", close: "18:00", enabled: true }
};

export const OpeningHoursProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openingHours, setOpeningHoursState] = useState<OpeningHours>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('openingHours');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing saved opening hours:', error);
        }
      }
    }
    return defaultOpeningHours;
  });

  // Save to localStorage whenever openingHours changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('openingHours', JSON.stringify(openingHours));
    }
  }, [openingHours]);

  const setOpeningHours = (hours: OpeningHours) => {
    setOpeningHoursState(hours);
  };

  const getCurrentDayHours = (): DayHours | null => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return openingHours[today as keyof OpeningHours] || null;
  };

  const isCurrentlyOpen = (): boolean => {
    const todayHours = getCurrentDayHours();
    if (!todayHours || !todayHours.enabled) return false;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [openHour, openMinute] = todayHours.open.split(':').map(Number);
    const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);
    
    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;
    
    return currentTime >= openTime && currentTime < closeTime;
  };

  const getRemainingHoursToday = (): number => {
    const todayHours = getCurrentDayHours();
    if (!todayHours || !todayHours.enabled) return 0;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);
    const closeTime = closeHour * 60 + closeMinute;
    
    const remainingMinutes = Math.max(0, closeTime - currentTime);
    return remainingMinutes / 60;
  };

  const getWorkEndTime = (additionalHours: number): Date | null => {
    const todayHours = getCurrentDayHours();
    if (!todayHours || !todayHours.enabled) return null;

    const now = new Date();
    const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);
    const closeTime = new Date(now);
    closeTime.setHours(closeHour, closeMinute, 0, 0);
    
    // Add additional hours to closing time
    const endTime = new Date(closeTime.getTime() + (additionalHours * 60 * 60 * 1000));
    return endTime;
  };

  const getDayName = (day: keyof OpeningHours): string => {
    const dayNames = {
      monday: 'Monday',
      tuesday: 'Tuesday', 
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    };
    return dayNames[day];
  };

  const value: OpeningHoursContextType = {
    openingHours,
    setOpeningHours,
    getCurrentDayHours,
    isCurrentlyOpen,
    getRemainingHoursToday,
    getWorkEndTime,
    getDayName
  };

  return (
    <OpeningHoursContext.Provider value={value}>
      {children}
    </OpeningHoursContext.Provider>
  );
}; 