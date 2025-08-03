"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WorkItem {
  id: string;
  vehicle: string;
  client: string;
  workType: string;
  status: "completed" | "in-progress" | "pending";
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  startTime?: string;
  endTime?: string;
  actualStartTime?: Date;
  actualEndTime?: Date;
  actualWorkHours?: number;
  isOverTime?: boolean;
  overtimeHours?: number;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WorkContextType {
  workItems: WorkItem[];
  addWorkItem: (item: Omit<WorkItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWorkItemStatus: (id: string, status: WorkItem['status']) => void;
  updateWorkItem: (id: string, updates: Partial<WorkItem>) => void;
  deleteWorkItem: (id: string) => void;
  getWorkItemsByStatus: (status: WorkItem['status']) => WorkItem[];
  getWorkItemsByAssignee: (assignee: string) => WorkItem[];
  getTotalWorkHours: () => number;
  getTotalActualHours: () => number;
  getOverTimeHours: () => number;
  getWorkItemsByCustomer: (customer: string) => WorkItem[];
  triggerUpdate: () => void;
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export const useWork = () => {
  const context = useContext(WorkContext);
  if (context === undefined) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
};

// Custom hook for real-time updates
export const useWorkUpdates = () => {
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'workItems' || e.key === 'workUpdateTrigger') {
        setLastUpdate(Date.now());
      }
    };

    const handleCustomEvent = () => {
      setLastUpdate(Date.now());
    };

    // Listen for localStorage changes (cross-tab)
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom events (same tab)
    window.addEventListener('workUpdate', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('workUpdate', handleCustomEvent);
    };
  }, []);

  return lastUpdate;
};

const initialWorkItems: WorkItem[] = [
  {
    id: "1",
    vehicle: "BMW X5",
    client: "Maria Ionescu",
    workType: "Engine Diagnostic",
    status: "pending",
    priority: "high",
    estimatedTime: "3h",
    assignedTo: "Marius",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    vehicle: "BMW 320i",
    client: "Alexandru Popescu",
    workType: "Brake System Repair",
    status: "pending",
    priority: "medium",
    estimatedTime: "2h",
    assignedTo: "Alexandru",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    vehicle: "BMW X3",
    client: "Vasile Dumitrescu",
    workType: "Transmission Inspection",
    status: "pending",
    priority: "low",
    estimatedTime: "1.5h",
    assignedTo: "Vasile",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    vehicle: "BMW 420d",
    client: "Elena Marin",
    workType: "Oil Change & Filter",
    status: "pending",
    priority: "medium",
    estimatedTime: "1h",
    assignedTo: "Marius",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    vehicle: "BMW M4",
    client: "Cristian Stoica",
    workType: "Performance Tuning",
    status: "pending",
    priority: "high",
    estimatedTime: "4h",
    assignedTo: "Alexandru",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const WorkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('workItems');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((item: WorkItem) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            actualStartTime: item.actualStartTime ? new Date(item.actualStartTime) : undefined,
            actualEndTime: item.actualEndTime ? new Date(item.actualEndTime) : undefined
          }));
        } catch (error) {
          console.error('Error parsing saved work items:', error);
        }
      }
    }
    return initialWorkItems;
  });

  // Save to localStorage whenever workItems changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('workItems', JSON.stringify(workItems));
    }
  }, [workItems]);

  // Function to trigger updates across tabs/windows
  const triggerUpdate = () => {
    if (typeof window !== 'undefined') {
      // Update localStorage to trigger storage event
      localStorage.setItem('workUpdateTrigger', Date.now().toString());
      
      // Dispatch custom event for same tab
      window.dispatchEvent(new CustomEvent('workUpdate'));
    }
  };

  // Calculate actual work hours between start and end time
  const calculateActualHours = (startTime: Date, endTime: Date): number => {
    const diffMs = endTime.getTime() - startTime.getTime();
    return diffMs / (1000 * 60 * 60); // Convert to hours
  };

  // Calculate overtime hours
  const calculateOvertimeHours = (actualHours: number, estimatedHours: number): number => {
    return Math.max(0, actualHours - estimatedHours);
  };

  const addWorkItem = (item: Omit<WorkItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: WorkItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setWorkItems(prev => [...prev, newItem]);
    triggerUpdate();
  };

  const updateWorkItemStatus = (id: string, status: WorkItem['status']) => {
    setWorkItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          status,
          updatedAt: new Date()
        };
        
        // Handle start time when moving to in-progress
        if (status === 'in-progress' && !item.actualStartTime) {
          const now = new Date();
          updatedItem.actualStartTime = now;
          updatedItem.startTime = now.toLocaleTimeString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
        
        // Handle end time when moving to completed
        if (status === 'completed' && item.actualStartTime && !item.actualEndTime) {
          const now = new Date();
          updatedItem.actualEndTime = now;
          updatedItem.endTime = now.toLocaleTimeString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit'
          });
          
          // Calculate actual work hours and overtime
          const actualHours = calculateActualHours(item.actualStartTime, now);
          const estimatedHours = parseFloat(item.estimatedTime.replace('h', ''));
          
          updatedItem.actualWorkHours = actualHours;
          updatedItem.overtimeHours = calculateOvertimeHours(actualHours, estimatedHours);
          updatedItem.isOverTime = actualHours > estimatedHours;
        }
        
        return updatedItem;
      }
      return item;
    }));
    triggerUpdate();
  };

  const updateWorkItem = (id: string, updates: Partial<WorkItem>) => {
    setWorkItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    ));
    triggerUpdate();
  };

  const deleteWorkItem = (id: string) => {
    setWorkItems(prev => prev.filter(item => item.id !== id));
    triggerUpdate();
  };

  const getWorkItemsByStatus = (status: WorkItem['status']) => {
    return workItems.filter(item => item.status === status);
  };

  const getWorkItemsByAssignee = (assignee: string) => {
    return workItems.filter(item => item.assignedTo === assignee);
  };

  const getWorkItemsByCustomer = (customer: string) => {
    return workItems.filter(item => item.client === customer);
  };

  // Calculate total estimated work hours
  const getTotalWorkHours = () => {
    return workItems.reduce((total, item) => {
      const hours = parseFloat(item.estimatedTime.replace('h', ''));
      return total + hours;
    }, 0);
  };

  // Calculate total actual work hours
  const getTotalActualHours = () => {
    return workItems.reduce((total, item) => {
      return total + (item.actualWorkHours || 0);
    }, 0);
  };

  // Calculate total overtime hours
  const getOverTimeHours = () => {
    return workItems.reduce((total, item) => {
      return total + (item.overtimeHours || 0);
    }, 0);
  };

  const value: WorkContextType = {
    workItems,
    addWorkItem,
    updateWorkItemStatus,
    updateWorkItem,
    deleteWorkItem,
    getWorkItemsByStatus,
    getWorkItemsByAssignee,
    getWorkItemsByCustomer,
    getTotalWorkHours,
    getTotalActualHours,
    getOverTimeHours,
    triggerUpdate
  };

  return (
    <WorkContext.Provider value={value}>
      {children}
    </WorkContext.Provider>
  );
}; 