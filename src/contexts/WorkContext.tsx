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
    status: "completed",
    priority: "high",
    estimatedTime: "3h",
    startTime: "08:00",
    endTime: "11:00",
    assignedTo: "Marius",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    vehicle: "BMW 320i",
    client: "Alexandru Popescu",
    workType: "Brake System Repair",
    status: "in-progress",
    priority: "medium",
    estimatedTime: "2h",
    startTime: "09:30",
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
    status: "in-progress",
    priority: "high",
    estimatedTime: "4h",
    startTime: "08:00",
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
            updatedAt: new Date(item.updatedAt)
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
        
        // Add start/end times based on status
        if (status === 'in-progress' && !item.startTime) {
          updatedItem.startTime = new Date().toLocaleTimeString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit'
          });
        } else if (status === 'completed' && !item.endTime) {
          updatedItem.endTime = new Date().toLocaleTimeString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit'
          });
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

  const value: WorkContextType = {
    workItems,
    addWorkItem,
    updateWorkItemStatus,
    updateWorkItem,
    deleteWorkItem,
    getWorkItemsByStatus,
    getWorkItemsByAssignee,
    triggerUpdate
  };

  return (
    <WorkContext.Provider value={value}>
      {children}
    </WorkContext.Provider>
  );
}; 