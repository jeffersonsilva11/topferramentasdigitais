'use client';

import { useState, useCallback } from 'react';

export type AnnouncementPriority = 'polite' | 'assertive';

interface Announcement {
  id: string;
  message: string;
  priority: AnnouncementPriority;
}

let globalSetAnnouncement: ((message: string, priority?: AnnouncementPriority) => void) | null = null;

export function useAnnouncer() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const announce = useCallback((message: string, priority: AnnouncementPriority = 'polite') => {
    const id = `announcement-${Date.now()}-${Math.random()}`;
    const announcement: Announcement = { id, message, priority };

    setAnnouncements((prev) => [...prev, announcement]);

    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, 5000);
  }, []);

  // Set global announcer
  if (!globalSetAnnouncement) {
    globalSetAnnouncement = announce;
  }

  return {
    announcements,
    announce,
  };
}

// Global function to announce messages from anywhere
export function announce(message: string, priority: AnnouncementPriority = 'polite') {
  if (globalSetAnnouncement) {
    globalSetAnnouncement(message, priority);
  } else {
    console.warn('Announcer not initialized. Call useAnnouncer() in a component first.');
  }
}
