"use client";

import React, { createContext, useContext, useCallback, useRef } from "react";

type RealtimeUpdate = {
  type: "task_updated" | "project_updated";
  projectId: number;
  taskId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  timestamp: number;
  user: string;
};

type RealtimeContextType = {
  broadcastUpdate: (update: Omit<RealtimeUpdate, "timestamp">) => void;
  subscribeToUpdates: (callback: (update: RealtimeUpdate) => void) => () => void;
};

const RealtimeContext = createContext<RealtimeContextType | null>(null);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const listenersRef = useRef<Set<(update: RealtimeUpdate) => void>>(new Set());

  const broadcastUpdate = useCallback((update: Omit<RealtimeUpdate, "timestamp">) => {
    const newUpdate: RealtimeUpdate = {
      ...update,
      timestamp: Date.now(),
    };

    // Notify all listeners
    listenersRef.current.forEach((listener) => {
      listener(newUpdate);
    });
  }, []);

  const subscribeToUpdates = useCallback(
    (callback: (update: RealtimeUpdate) => void) => {
      listenersRef.current.add(callback);
      
      // Return cleanup function
      return () => {
        listenersRef.current.delete(callback);
      };
    },
    []
  );

  return (
    <RealtimeContext.Provider value={{ broadcastUpdate, subscribeToUpdates }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error("useRealtime must be used within RealtimeProvider");
  }
  return context;
}