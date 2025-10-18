import { Octokit } from 'octokit';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'xenon0906';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const CACHE_DURATION = 30 * 1000; // 30 seconds in milliseconds
const STORAGE_KEYS = {
  PROFILE: 'github_profile',
  REPOS: 'github_repos',
  LANGUAGES: 'github_languages',
  STATS: 'github_stats',
  CONTRIBUTIONS: 'github_contributions',
  LAST_SYNC: 'github_last_sync',
  SYNC_STATUS: 'github_sync_status'
};

class GitHubAutoSync {
  constructor() {
    this.octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });
    this.syncInterval = null;
    this.broadcastChannel = null;
    this.listeners = new Set();
    this.isSyncing = false;

    // Initialize BroadcastChannel for cross-tab sync
    if (typeof BroadcastChannel !== 'undefined') {
      this.broadcastChannel = new BroadcastChannel('github-sync');
      this.broadcastChannel.onmessage = (event) => {
        if (event.data.type === 'sync-complete') {
          this.notifyListeners(event.data.data);
        }
      };
    }
  }

  // Initialize auto-sync with 30-second interval
  startAutoSync() {
    // Try to use cached data first for instant load
    const cachedData = this.getCachedData();
    if (cachedData && cachedData.profile) {
      this.notifyListeners(cachedData);
    }

    // Then sync in background
    this.syncAll();

    // Set up interval for auto-sync
    this.syncInterval = setInterval(() => {
      this.syncAll();
    }, CACHE_DURATION);

    console.log('GitHub auto-sync started (30-second intervals)');
  }

  // Stop auto-sync
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('GitHub auto-sync stopped');
    }
  }

  // Add listener for data updates
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all listeners of data updates
  notifyListeners(data) {
    this.listeners.forEach(callback => callback(data));
  }

  // Main sync function - fetches all GitHub data
  async syncAll() {
    if (this.isSyncing) {
      console.log('Sync already in progress, skipping...');
      return;
    }

    this.isSyncing = true;
    this.updateSyncStatus('syncing');

    try {
      console.log('Starting GitHub data sync...');

      const [profile, repos, contributions] = await Promise.all([
        this.fetchProfile(),
        this.fetchRepositories(),
        this.fetchContributions()
      ]);

      const languages = this.calculateLanguageStats(repos);
      const stats = this.calculateStats(profile, repos);

      const syncData = {
        profile,
        repos: this.sortRepositoriesByFeaturedScore(repos),
        languages,
        stats,
        contributions,
        lastSync: Date.now()
      };

      // Cache data
      this.cacheData(syncData);

      // Notify other tabs
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({
          type: 'sync-complete',
          data: syncData
        });
      }

      // Notify listeners
      this.notifyListeners(syncData);

      this.updateSyncStatus('success');
      console.log('GitHub data sync completed successfully');

      return syncData;
    } catch (error) {
      console.error('Error syncing GitHub data:', error);
      this.updateSyncStatus('error');

      // Return cached data on error
      return this.getCachedData();
    } finally {
      this.isSyncing = false;
    }
  }

  // Fetch user profile
  async fetchProfile() {
    try {
      const { data } = await this.octokit.rest.users.getByUsername({
        username: GITHUB_USERNAME
      });
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return this.getFromCache(STORAGE_KEYS.PROFILE);
    }
  }

  // Fetch all repositories
  async fetchRepositories() {
    try {
      const { data } = await this.octokit.rest.repos.listForUser({
        username: GITHUB_USERNAME,
        per_page: 100,
        sort: 'updated'
      });

      // Filter out forks if needed and add additional data
      const enrichedRepos = await Promise.all(
        data.map(async (repo) => {
          try {
            // Get additional language data
            const { data: languages } = await this.octokit.rest.repos.listLanguages({
              owner: GITHUB_USERNAME,
              repo: repo.name
            });

            return {
              ...repo,
              languages,
              featuredScore: this.calculateFeaturedScore(repo),
              isRecentlyUpdated: this.isRecentlyUpdated(repo.updated_at)
            };
          } catch (error) {
            return {
              ...repo,
              languages: {},
              featuredScore: this.calculateFeaturedScore(repo),
              isRecentlyUpdated: this.isRecentlyUpdated(repo.updated_at)
            };
          }
        })
      );

      return enrichedRepos;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      return this.getFromCache(STORAGE_KEYS.REPOS) || [];
    }
  }

  // Fetch contribution data (simplified version)
  async fetchContributions() {
    try {
      // GitHub doesn't have a direct API for contribution graph
      // We'll calculate based on recent commits
      const repos = await this.fetchRepositories();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      let totalContributions = 0;

      for (const repo of repos.slice(0, 10)) { // Check top 10 repos
        try {
          const { data: commits } = await this.octokit.rest.repos.listCommits({
            owner: GITHUB_USERNAME,
            repo: repo.name,
            since: thirtyDaysAgo.toISOString(),
            author: GITHUB_USERNAME
          });
          totalContributions += commits.length;
        } catch (error) {
          // Skip if repo has no commits or is inaccessible
          continue;
        }
      }

      return {
        last30Days: totalContributions,
        lastUpdate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching contributions:', error);
      return this.getFromCache(STORAGE_KEYS.CONTRIBUTIONS) || { last30Days: 0 };
    }
  }

  // Calculate language statistics across all repos
  calculateLanguageStats(repos) {
    const languageTotals = {};

    repos.forEach(repo => {
      if (repo.languages) {
        Object.entries(repo.languages).forEach(([lang, bytes]) => {
          languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
        });
      }
    });

    const totalBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);

    const languagePercentages = Object.entries(languageTotals)
      .map(([language, bytes]) => ({
        language,
        bytes,
        percentage: ((bytes / totalBytes) * 100).toFixed(2)
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8); // Top 8 languages

    return languagePercentages;
  }

  // Calculate overall statistics
  calculateStats(profile, repos) {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    return {
      totalRepos: profile.public_repos,
      totalStars,
      totalForks,
      followers: profile.followers,
      following: profile.following
    };
  }

  // Calculate featured score for repositories
  calculateFeaturedScore(repo) {
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const watchers = repo.watchers_count || 0;
    const hasDescription = repo.description ? 1 : 0;
    const hasTopics = repo.topics?.length || 0;
    const recentActivity = this.isRecentlyUpdated(repo.updated_at) ? 10 : 0;

    // Weighted scoring
    return (stars * 3) + (forks * 2) + watchers + (hasDescription * 5) + (hasTopics * 2) + recentActivity;
  }

  // Check if repo was updated in last 30 days
  isRecentlyUpdated(updatedAt) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(updatedAt) > thirtyDaysAgo;
  }

  // Sort repositories by featured score
  sortRepositoriesByFeaturedScore(repos) {
    return [...repos].sort((a, b) => b.featuredScore - a.featuredScore);
  }

  // Cache data to localStorage
  cacheData(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
      localStorage.setItem(STORAGE_KEYS.REPOS, JSON.stringify(data.repos));
      localStorage.setItem(STORAGE_KEYS.LANGUAGES, JSON.stringify(data.languages));
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(data.stats));
      localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(data.contributions));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, data.lastSync.toString());
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }

  // Get all cached data
  getCachedData() {
    try {
      return {
        profile: this.getFromCache(STORAGE_KEYS.PROFILE),
        repos: this.getFromCache(STORAGE_KEYS.REPOS) || [],
        languages: this.getFromCache(STORAGE_KEYS.LANGUAGES) || [],
        stats: this.getFromCache(STORAGE_KEYS.STATS) || {},
        contributions: this.getFromCache(STORAGE_KEYS.CONTRIBUTIONS) || {},
        lastSync: parseInt(localStorage.getItem(STORAGE_KEYS.LAST_SYNC)) || null
      };
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  // Get item from cache
  getFromCache(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from cache:`, error);
      return null;
    }
  }

  // Update sync status
  updateSyncStatus(status) {
    localStorage.setItem(STORAGE_KEYS.SYNC_STATUS, status);
  }

  // Get sync status
  getSyncStatus() {
    return localStorage.getItem(STORAGE_KEYS.SYNC_STATUS) || 'idle';
  }

  // Check if cache is valid
  isCacheValid() {
    const lastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    if (!lastSync) return false;

    const timeSinceSync = Date.now() - parseInt(lastSync);
    return timeSinceSync < CACHE_DURATION;
  }

  // Get data (from cache if valid, otherwise fetch)
  async getData() {
    if (this.isCacheValid()) {
      console.log('Using cached GitHub data');
      return this.getCachedData();
    }

    console.log('Cache expired, fetching fresh data');
    return await this.syncAll();
  }

  // Manual refresh
  async refresh() {
    console.log('Manual refresh triggered');
    return await this.syncAll();
  }
}

// Export singleton instance
export const gitHubSync = new GitHubAutoSync();
export default gitHubSync;
