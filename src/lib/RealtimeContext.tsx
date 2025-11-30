/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { createContext, useContext, useCallback, useRef, useEffect } from "react";
import useWebSocket from "react-use-websocket";

type RealtimeUpdate = {
  type: "task_updated" | "project_updated";
  projectId: number;
  taskId?: number;
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

  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:8080", {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage) {
      const update: RealtimeUpdate = JSON.parse(lastMessage.data);
      listenersRef.current.forEach((listener) => listener(update));
    }
  }, [lastMessage]);

  const broadcastUpdate = useCallback(
    (update: Omit<RealtimeUpdate, "timestamp">) => {
      const newUpdate: RealtimeUpdate = { ...update, timestamp: Date.now() };
      sendMessage(JSON.stringify(newUpdate));
      listenersRef.current.forEach((listener) => listener(newUpdate)); 
    },
    [sendMessage]
  );

  const subscribeToUpdates = useCallback(
    (callback: (update: RealtimeUpdate) => void) => {
      listenersRef.current.add(callback);
      return () => listenersRef.current.delete(callback);
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
  if (!context) throw new Error("useRealtime must be used within RealtimeProvider");
  return context;
}

