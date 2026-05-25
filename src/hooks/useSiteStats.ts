import { useCallback, useEffect, useState } from 'react';
import {
  fetchSiteStats,
  recordVisit,
  subscribeSiteStats,
  type SiteStats,
} from '../lib/statsApi';

const VISIT_SESSION_KEY = 'flowly-visit-recorded';

export function useSiteStats() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [live, setLive] = useState(false);

  const refresh = useCallback(async () => {
    const data = await fetchSiteStats();
    if (data) setStats(data);
  }, []);

  useEffect(() => {
    refresh();

    if (!sessionStorage.getItem(VISIT_SESSION_KEY)) {
      recordVisit().then((data) => {
        if (data) {
          setStats(data);
          sessionStorage.setItem(VISIT_SESSION_KEY, '1');
        }
      });
    }

    const unsubscribe = subscribeSiteStats((data) => {
      setStats(data);
      setLive(true);
    });

    const poll = window.setInterval(refresh, 8000);

    return () => {
      unsubscribe();
      window.clearInterval(poll);
    };
  }, [refresh]);

  return { stats, live, refresh };
}
