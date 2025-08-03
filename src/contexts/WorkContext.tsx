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
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export const useWork = () => {
  const context = useContext(WorkContext);
  if (context === undefined) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
};

const initialWorkItems: WorkItem[] = [
  {
    id: "1",
    vehicle: "BMW X5 2020",
    client: "Ion Popescu",
    workType: "Oil Change & Filters",
    status: "completed",
    priority: "high",
    estimatedTime: "1.5h",
    startTime: "08:00",
    endTime: "09:30",
    assignedTo: "Marius",
    createdAt: new Date('2024-01-01T08:00:00'),
    updatedAt: new Date('2024-01-01T09:30:00')
  },
  {
    id: "2",
    vehicle: "BMW 320i 2019",
    client: "Maria Ionescu",
    workType: "Brake Pad Replacement",
    status: "in-progress",
    priority: "high",
    estimatedTime: "2h",
    startTime: "09:30",
    assignedTo: "Alexandru",
    createdAt: new Date('2024-01-01T09:30:00'),
    updatedAt: new Date('2024-01-01T09:30:00')
  },
  {
    id: "3",
    vehicle: "BMW 520d 2021",
    client: "Alexandru Dumitrescu",
    workType: "Electrical Diagnostic",
    status: "pending",
    priority: "medium",
    estimatedTime: "1h",
    assignedTo: "Vasile",
    createdAt: new Date('2024-01-01T10:00:00'),
    updatedAt: new Date('2024-01-01T10:00:00')
  },
  {
    id: "4",
    vehicle: "BMW X3 2018",
    client: "Elena Vasilescu",
    workType: "Transmission Inspection",
    status: "pending",
    priority: "high",
    estimatedTime: "2.5h",
    assignedTo: "Marius",
    createdAt: new Date('2024-01-01T11:00:00'),
    updatedAt: new Date('2024-01-01T11:00:00')
  },
  {
    id: "5",
    vehicle: "BMW M4 2022",
    client: "Stefan Popa",
    workType: "Tuning & Performance",
    status: "in-progress",
    priority: "medium",
    estimatedTime: "4h",
    startTime: "10:00",
    assignedTo: "Alexandru",
    createdAt: new Date('2024-01-01T10:00:00'),
    updatedAt: new Date('2024-01-01T10:00:00')
  },
  {
    id: "6",
    vehicle: "BMW 118i 2020",
    client: "Ana Ionescu",
    workType: "AC System Check",
    status: "completed",
    priority: "low",
    estimatedTime: "1h",
    startTime: "07:00",
    endTime: "08:00",
    assignedTo: "Vasile",
    createdAt: new Date('2024-01-01T07:00:00'),
    updatedAt: new Date('2024-01-01T08:00:00')
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
          return parsed.map((item: any) => ({
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

  const addWorkItem = (item: Omit<WorkItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: WorkItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setWorkItems(prev => [...prev, newItem]);
  };

  const updateWorkItemStatus = (id: string, status: WorkItem['status']) => {
    setWorkItems(prev => prev.map(item => {
      if (item.id === id) {
        const updates: Partial<WorkItem> = {
          status,
          updatedAt: new Date()
        };
        
        // Add start time when moving to in-progress
        if (status === 'in-progress' && !item.startTime) {
          updates.startTime = new Date().toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
        
        // Add end time when moving to completed
        if (status === 'completed' && !item.endTime) {
          updates.endTime = new Date().toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
        
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  const updateWorkItem = (id: string, updates: Partial<WorkItem>) => {
    setWorkItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    ));
  };

  const deleteWorkItem = (id: string) => {
    setWorkItems(prev => prev.filter(item => item.id !== id));
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
    getWorkItemsByAssignee
  };

  return (
    <WorkContext.Provider value={value}>
      {children}
    </WorkContext.Provider>
  );
}; 