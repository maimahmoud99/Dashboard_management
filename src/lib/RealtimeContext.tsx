/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useCallback, useEffect, useRef } from "react";

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

const CHANNEL_NAME = "project_updates";

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const listenersRef = useRef<Set<(update: RealtimeUpdate) => void>>(new Set());
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Try to use BroadcastChannel
    if ("BroadcastChannel" in window) {
      try {
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channelRef.current = channel;

        channel.onmessage = (event: MessageEvent) => {
          const update: RealtimeUpdate = event.data;
          
          // Notify all local listeners
          listenersRef.current.forEach((listener) => {
            listener(update);
          });
        };

        return () => {
          channel.close();
          channelRef.current = null;
        };
      } catch (err) {
        console.error("BroadcastChannel error:", err);
      }
    }
    
    // Fallback to localStorage (separate condition to avoid TypeScript issues)
    console.warn("BroadcastChannel not supported - using localStorage fallback");
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "realtime_update" && e.newValue) {
        try {
          const update: RealtimeUpdate = JSON.parse(e.newValue);
          listenersRef.current.forEach((listener) => {
            listener(update);
          });
        } catch (err) {
          console.error("Failed to parse update:", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const broadcastUpdate = useCallback((update: Omit<RealtimeUpdate, "timestamp">) => {
    const newUpdate: RealtimeUpdate = {
      ...update,
      timestamp: Date.now(),
    };

    // Broadcast to other tabs using BroadcastChannel
    if (channelRef.current) {
      try {
        channelRef.current.postMessage(newUpdate);
      } catch (err) {
        console.error("Failed to broadcast update:", err);
      }
    } else if (typeof window !== "undefined") {
      // Fallback to localStorage
      try {
        localStorage.setItem("realtime_update", JSON.stringify(newUpdate));
      } catch (err) {
        console.error("Failed to save update:", err);
      }
    }

    // Also notify local listeners immediately
    listenersRef.current.forEach((listener) => {
      listener(newUpdate);
    });
  }, []);

  const subscribeToUpdates = useCallback(
    (callback: (update: RealtimeUpdate) => void) => {
      listenersRef.current.add(callback);
      
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