import { useState, useEffect, useCallback } from 'react';
import gitHubSync from '../services/GitHubAutoSync';

export const useAutoUpdateGitHub = () => {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    languages: [],
    stats: {},
    contributions: {},
    lastSync: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle');

  // Initialize and start auto-sync
  useEffect(() => {
    let unsubscribe;

    const initialize = async () => {
      try {
        // Check for cached data FIRST for instant display
        const cachedData = gitHubSync.getCachedData();
        if (cachedData && cachedData.profile) {
          console.log('✅ Loaded cached GitHub data immediately');
          setData(cachedData);
          setIsLoading(false); // Stop loading immediately if we have cache
          setSyncStatus('success');
        }

        // Start auto-sync (will use cache if valid or fetch if not)
        gitHubSync.startAutoSync();

        // Listen for updates
        unsubscribe = gitHubSync.addListener((updatedData) => {
          if (updatedData && updatedData.profile) {
            console.log('📡 Received fresh GitHub data');
            setData(updatedData);
            setSyncStatus('success');
            setIsLoading(false);
          }
        });

        // If no cached data, wait for first sync with timeout
        if (!cachedData || !cachedData.profile) {
          console.log('⏳ No cached data, waiting for first sync...');

          // Set a timeout to stop loading after 10 seconds even if no data
          setTimeout(() => {
            if (isLoading) {
              console.log('⚠️ GitHub sync timeout - stopping loader');
              setIsLoading(false);
              setSyncStatus('error');
              setError('GitHub data loading timeout. Please refresh the page.');
            }
          }, 10000);
        }
      } catch (err) {
        console.error('❌ Error initializing GitHub sync:', err);
        setError(err.message);
        setIsLoading(false);
        setSyncStatus('error');
      }
    };

    initialize();

    // Cleanup
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      gitHubSync.stopAutoSync();
    };
  }, []);

  // Manual refresh function
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setSyncStatus('syncing');

    try {
      const freshData = await gitHubSync.refresh();
      if (freshData) {
        setData(freshData);
        setSyncStatus('success');
      }
    } catch (err) {
      console.error('Error refreshing GitHub data:', err);
      setError(err.message);
      setSyncStatus('error');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Get time since last sync
  const getTimeSinceSync = useCallback(() => {
    if (!data.lastSync) return null;

    const minutes = Math.floor((Date.now() - data.lastSync) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  }, [data.lastSync]);

  return {
    // Data
    profile: data.profile,
    repos: data.repos,
    languages: data.languages,
    stats: data.stats,
    contributions: data.contributions,
    lastSync: data.lastSync,

    // Status
    isLoading,
    isRefreshing,
    error,
    syncStatus,

    // Actions
    refresh,
    getTimeSinceSync,
  };
};

export default useAutoUpdateGitHub;
