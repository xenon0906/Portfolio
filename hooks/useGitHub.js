"use client";

import { useState, useEffect, useCallback } from 'react';
import githubService from '@/services/github';

export function useGitHub() {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    stats: null,
    languages: [],
    lastSync: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const result = await githubService.fetchAllData();
      if (result) {
        setData(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Try to get cached data first for instant display
    const cached = githubService.getCachedData();
    if (cached) {
      setData(cached);
      setIsLoading(false);
    }

    // Then fetch fresh data
    fetchData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchData(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const refresh = useCallback(() => {
    // Clear cache to force fresh fetch
    if (typeof window !== 'undefined') {
      localStorage.removeItem('github_data');
    }
    fetchData(true);
  }, [fetchData]);

  return {
    ...data,
    isLoading,
    isRefreshing,
    error,
    refresh
  };
}

export default useGitHub;
