# Siddhanth Kunwar - Portfolio

A modern, immersive portfolio website built with **Next.js 14**, **Three.js**, and **Framer Motion** featuring the "Deep Carbon" theme with 3D spatial interfaces.

## Features

- **3D Backgrounds** - Warp starfield, Cyber grid, Particle networks, Aurora effects
- **Deep Carbon Theme** - High-contrast dark theme for maximum readability
- **Mobile Responsive** - Optimized for all devices
- **Smooth Animations** - Framer Motion powered transitions
- **App Router** - Next.js 14 App Router architecture

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React Three Fiber** - 3D graphics with Three.js
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js             # Home page
│   ├── globals.css         # Global styles
│   ├── projects/page.js    # Projects page
│   ├── about/page.js       # About page
│   ├── skills/page.js      # Skills page
│   └── contact/page.js     # Contact page
├── components/
│   └── ui/
│       ├── Backgrounds.jsx     # Canvas backgrounds
│       ├── CyberBackground.jsx # Three.js 3D grid
│       └── Navbar.jsx          # Navigation
├── public/
│   └── projects/           # Project screenshots
├── jsconfig.json           # Path aliases
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind config
└── package.json
```

## Pages

| Route | Description | Background |
|-------|-------------|------------|
| `/` | Home - Hero section | Warp Starfield |
| `/projects` | Project showcase | 3D Cyber Grid |
| `/about` | About me | Particle Network |
| `/skills` | Tech stack | Grid with beams |
| `/contact` | Contact info | Aurora |

## Environment Variables

Create a `.env` file (optional):

```env
# GitHub integration (optional)
GITHUB_TOKEN=your_github_token

# Google Sheets for contact form (optional)
GOOGLE_SHEETS_URL=your_apps_script_url
```

## Adding Project Screenshots

Save screenshots in `public/projects/`:
- `fundchain.png` - FundChain project
- `blockvote.png` - BlockVote project
- `deepfind.png` - DeepFind AI project

Recommended size: 1920x1080 or 1280x720 (16:9 ratio)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Manual

```bash
npm run build
npm start
```

## Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  carbon: '#050505',    // Background
  surface: '#0f0f0f',   // Cards
  primary: '#ffffff',   // Text
  secondary: '#94a3b8', // Subtext
  accent: {
    cyan: '#06b6d4',
    purple: '#8b5cf6',
  },
}
```

### Content
- Projects: `app/projects/page.js`
- Skills: `app/skills/page.js`
- About: `app/about/page.js`
- Contact: `app/contact/page.js`

## Troubleshooting

**Build errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Three.js SSR issues:**
Use dynamic imports with `ssr: false` for Three.js components.

## License

MIT License

---

**Built by Siddhanth Kunwar**
- GitHub: [@xenon0906](https://github.com/xenon0906)
- LinkedIn: [syd090605](https://linkedin.com/in/syd090605)
