// GitHub API Service
const GITHUB_USERNAME = 'xenon0906';
const CACHE_KEY = 'github_data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Featured repos whitelist
export const FEATURED_REPOS = [
  'Bus-Station',
  'ThunderBird',
  'Fashion-MNIST-Classification-with-TensorFlow',
  'ClimaScope',
  'Encrypter-Decrypter',
  'Theme-Change-Static-',
  'portfolio'
];

class GitHubService {
  constructor() {
    this.cache = null;
    this.lastFetch = null;
  }

  getCachedData() {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      console.error('Cache read error:', e);
    }
    return null;
  }

  setCachedData(data) {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('Cache write error:', e);
    }
  }

  async fetchProfile() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      return await response.json();
    } catch (error) {
      console.error('Profile fetch error:', error);
      return null;
    }
  }

  async fetchRepos() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      );
      if (!response.ok) throw new Error('Failed to fetch repos');
      return await response.json();
    } catch (error) {
      console.error('Repos fetch error:', error);
      return [];
    }
  }

  async fetchAllData() {
    // Check cache first
    const cached = this.getCachedData();
    if (cached) {
      return cached;
    }

    try {
      const [profile, repos] = await Promise.all([
        this.fetchProfile(),
        this.fetchRepos()
      ]);

      // Calculate stats
      const stats = {
        totalRepos: profile?.public_repos || repos.length,
        totalStars: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
        totalForks: repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0),
        followers: profile?.followers || 0,
        following: profile?.following || 0
      };

      // Calculate language distribution
      const languageCounts = {};
      repos.forEach(repo => {
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
      });

      const totalWithLang = Object.values(languageCounts).reduce((a, b) => a + b, 0);
      const languages = Object.entries(languageCounts)
        .map(([name, count]) => ({
          name,
          count,
          percentage: Math.round((count / totalWithLang) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      const data = {
        profile,
        repos,
        stats,
        languages,
        lastSync: new Date().toISOString()
      };

      this.setCachedData(data);
      return data;
    } catch (error) {
      console.error('GitHub fetch error:', error);
      return null;
    }
  }

  getFeaturedRepos(repos) {
    return repos
      .filter(repo => FEATURED_REPOS.includes(repo.name))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
}

export const githubService = new GitHubService();
export default githubService;
