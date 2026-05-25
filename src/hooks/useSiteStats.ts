import { useCallback, useEffect, useState } from 'react';
import {
  fetchSiteStats,
  recordVisit,
  type SiteStats,
} from '../lib/statsApi';

const VISIT_SESSION_KEY = 'flowly-visit-recorded';

function canUseSessionStorage(): boolean {
  try {
    return typeof sessionStorage !== 'undefined';
  } catch {
    return false;
  }
}

export function useSiteStats() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await fetchSiteStats();
    if (data) {
      setStats(data);
      setLive(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();

    const visitAlreadyRecorded =
      canUseSessionStorage() && sessionStorage.getItem(VISIT_SESSION_KEY);

    if (!visitAlreadyRecorded) {
      recordVisit().then((data) => {
        if (data) {
          setStats(data);
          setLive(true);
          try {
            sessionStorage.setItem(VISIT_SESSION_KEY, '1');
          } catch {
            /* private mode */
          }
        }
      });
    }

    const poll = window.setInterval(refresh, 4000);

    return () => {
      window.clearInterval(poll);
    };
  }, [refresh]);

  return { stats, live, loading, refresh };
}
