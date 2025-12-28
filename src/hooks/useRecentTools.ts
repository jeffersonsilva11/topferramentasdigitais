'use client';

import { useState, useEffect } from 'react';
import { Tool } from '@/types';

const RECENT_TOOLS_KEY = 'recentTools';
const MAX_RECENT_TOOLS = 5;

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load recent tools from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_TOOLS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentTools(parsed);
      } catch (error) {
        console.error('Failed to parse recent tools:', error);
        localStorage.removeItem(RECENT_TOOLS_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  // Add a tool to recent tools
  const addRecentTool = (tool: Tool) => {
    setRecentTools((prev) => {
      // Remove if already exists
      const filtered = prev.filter((t) => t.id !== tool.id);

      // Add to beginning
      const updated = [tool, ...filtered].slice(0, MAX_RECENT_TOOLS);

      // Save to localStorage
      localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  // Clear all recent tools
  const clearRecentTools = () => {
    setRecentTools([]);
    localStorage.removeItem(RECENT_TOOLS_KEY);
  };

  return {
    recentTools,
    addRecentTool,
    clearRecentTools,
    isLoaded,
  };
}
