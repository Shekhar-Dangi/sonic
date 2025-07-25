import { create } from "zustand";
import type { UserStore } from "./types";
import { createApiUrl } from "../lib/api";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  logs: [],
  metrics: [],
  isLoading: false,

  setUser: (user) => {
    set({ user, isLoggedIn: user !== null });
  },

  setLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn });
  },

  fetchMetrics: async (token?: string) => {
    set({ isLoading: true });
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(createApiUrl("/api/metrics"), {
        headers,
      });
      const data = await response.json();
      set({ isLoading: false, metrics: data.data.metrics });
    } catch (error) {
      console.error("Error fetching logs:", error);
      set({ isLoading: false });
    }
  },
  fetchLogs: async (token?: string) => {
    set({ isLoading: true });
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(createApiUrl("/api/logs"), {
        headers,
      });
      const data = await response.json();
      set({ logs: data.data.sessions, isLoading: false });
    } catch (error) {
      console.error("Error fetching logs:", error);
      set({ isLoading: false });
    }
  },

  addLog: (log) => {
    set((state) => ({ logs: [log, ...state.logs] }));
  },

  addMetric: (metric) => {
    set((state) => ({ metrics: [metric, ...state.metrics] }));
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  clearStore: () => {
    set({
      user: null,
      isLoggedIn: false,
      logs: [],
      metrics: [],
      isLoading: false,
    });
  },
}));
