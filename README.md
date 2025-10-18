# Auto-Updating Portfolio

A modern, responsive portfolio website built with React and Vite that automatically syncs with your GitHub profile and saves contact form submissions to Google Sheets.

## Features

### 🚀 Auto-Updating GitHub Integration
- **Real-time sync** - Updates every 30 seconds with your latest GitHub data
- **Profile information** - Avatar, bio, location
- **Repository stats** - Total repos, stars, forks, followers
- **Language statistics** - Automatically calculated from your repositories
- **Smart caching** - Reduces API calls and improves performance
- **Cross-tab sync** - Data syncs across multiple browser tabs

### 📝 Google Sheets Contact Form
- **Direct integration** - Form submissions saved directly to Google Sheets
- **Email validation** - Validates email format before submission
- **Fallback support** - Opens email client if Google Sheets is not configured
- **LocalStorage backup** - Saves submissions locally as backup
- **Toast notifications** - Beautiful success/error messages

### 📄 Complete Portfolio Sections
- **Hero** - Eye-catching introduction with GitHub stats
- **About** - Personal bio and top skills showcase
- **Experience** - Timeline-based work history
- **Services** - Professional services offered
- **Projects** - Auto-populated from GitHub repositories
- **Skills** - Technical skills visualization
- **Contact** - Integrated contact form with Google Sheets

### 🎨 Modern Design
- **Dark/Light mode** - Toggle between themes
- **Smooth animations** - Framer Motion powered
- **Glass-morphism effects** - Modern UI design
- **Responsive layout** - Works on all devices
- **Gradient accents** - Beautiful color schemes

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- GitHub account
- Google account (for contact form integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** with your information:
   ```env
   VITE_GITHUB_USERNAME=your-github-username
   VITE_GITHUB_TOKEN=your-github-token (optional)
   VITE_GOOGLE_SHEETS_URL=your-google-apps-script-url
   VITE_FALLBACK_EMAIL=mailto:your-email@example.com
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser** at `http://localhost:5173`

## Configuration

### GitHub Integration

1. **Set your GitHub username** in `.env`:
   ```env
   VITE_GITHUB_USERNAME=your-github-username
   ```

2. **Optional: Generate a GitHub token** for higher API rate limits:
   - Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select scope: `public_repo` (read-only)
   - Copy the token and add to `.env`:
     ```env
     VITE_GITHUB_TOKEN=ghp_your_token_here
     ```

### Google Sheets Integration

Follow the detailed setup guide in [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)

**Quick summary:**
1. Create a Google Sheet with columns: Timestamp, Name, Email, Message
2. Create a Google Apps Script web app
3. Deploy the script and copy the URL
4. Add the URL to your `.env` file

## Customization

### Personal Information

1. **Update your details** in the components:
   - `src/components/About/About.jsx` - Bio and skills
   - `src/components/Experience/Experience.jsx` - Work experience
   - `src/components/Services/Services.jsx` - Services offered

2. **Update social links** in:
   - `src/components/Hero/Hero.jsx`
   - `src/components/Contact/Contact.jsx`

### Styling

- **Colors and themes**: `tailwind.config.js`
- **Custom CSS**: `src/index.css`
- **Component styles**: Individual component files

### GitHub Sync Interval

To change the sync frequency, edit `src/services/GitHubAutoSync.js`:

```javascript
// Change from 30 seconds to your preferred interval
const CACHE_DURATION = 30 * 1000; // milliseconds
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy!

### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## Project Structure

```
portfolio-react/
├── src/
│   ├── components/
│   │   ├── About/          # About section
│   │   ├── Contact/        # Contact form
│   │   ├── Experience/     # Work experience timeline
│   │   ├── Hero/           # Hero section with GitHub stats
│   │   ├── Layout/         # Navbar and layout components
│   │   ├── Projects/       # Projects showcase
│   │   ├── Services/       # Services section
│   │   ├── Skills/         # Skills visualization
│   │   └── UI/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API services
│   │   ├── GitHubAutoSync.js
│   │   └── GoogleSheetsService.js
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env                    # Environment variables (create from .env.example)
├── .env.example            # Environment variables template
├── GOOGLE_SHEETS_SETUP.md  # Google Sheets setup guide
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Octokit** - GitHub API client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: ~600KB (gzipped: ~176KB)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### GitHub data not loading
- Check your `.env` file has correct username
- Verify GitHub token is valid (if using)
- Check browser console for errors
- GitHub API rate limit: 60 requests/hour without token, 5000 with token

### Contact form not working
- Verify Google Sheets URL is correct in `.env`
- Check Google Apps Script deployment permissions
- Test with fallback email if Google Sheets fails
- Check browser console for errors

### Build errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check Node.js version: `node --version` (should be 18+)

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Built with ❤️ by Siddhanth Kunwar

- GitHub: [@xenon0906](https://github.com/xenon0906)
- LinkedIn: [syd090605](https://linkedin.com/in/syd090605)

## Contributing

Issues and pull requests are welcome! Feel free to contribute.

---

**Made with dedication and lots of coffee ☕**
