'use client';

import { useAnnouncer } from '@/hooks/useAnnouncer';

export default function LiveRegion() {
  const { announcements } = useAnnouncer();

  return (
    <>
      {/* Polite announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcements
          .filter((a) => a.priority === 'polite')
          .map((announcement) => (
            <p key={announcement.id}>{announcement.message}</p>
          ))}
      </div>

      {/* Assertive announcements */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {announcements
          .filter((a) => a.priority === 'assertive')
          .map((announcement) => (
            <p key={announcement.id}>{announcement.message}</p>
          ))}
      </div>
    </>
  );
}
