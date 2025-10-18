# Portfolio Website - Complete User Guide

A modern, auto-updating portfolio website built with React and Vite.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## 📦 Build for Production

```bash
npm run build
```

Output: `dist/` folder

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables (see below)
5. Deploy!

## 🔑 Environment Variables

Create a `.env` file:

```env
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_TOKEN=your-github-token
VITE_GOOGLE_SHEETS_URL=your-google-sheets-url
VITE_FALLBACK_EMAIL=mailto:your@email.com
```

### Get GitHub Token
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scope: `public_repo` only
4. Copy token and add to `.env`

### Get Google Sheets URL
1. Create Google Sheet with columns: Timestamp, Name, Email, Message
2. Go to Extensions → Apps Script
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([new Date(), data.name, data.email, data.message]);
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false})).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Deploy as Web App (Anyone can access)
5. Copy deployment URL
6. Add to `.env`

## ✨ Features

- Auto-updates from GitHub every 30 seconds
- Google Sheets contact form integration
- Dark/Light mode toggle
- Fully responsive (mobile & desktop)
- Code splitting & lazy loading
- Beautiful animations
- SEO optimized

## 📱 Mobile Responsive

Optimized for:
- iPhone (all models)
- Android phones
- Tablets
- Desktop

## 🎨 Customization

### Update Personal Info
- `src/components/About/About.jsx` - Bio and skills
- `src/components/Education/Education.jsx` - Education
- `src/components/Experience/Experience.jsx` - Work history
- `src/components/Services/Services.jsx` - Services

### Update Links
- `src/components/Hero/Hero.jsx` - Social links
- `src/App.jsx` - Footer links

### Change Colors
- `tailwind.config.js` - Color scheme
- `src/index.css` - Custom styles

## 🐛 Troubleshooting

### Build Errors
```bash
rm -rf node_modules dist .vite
npm install
npm run build
```

### GitHub Not Loading
- Check `.env` has correct username
- Verify GitHub token is valid
- Check browser console for errors

### Contact Form Issues
- Verify Google Sheets URL in `.env`
- Check Apps Script deployment permissions
- Test with fallback email

## 📊 Performance

- Initial Load: ~0.5s
- Bundle Size: 610 KB (gzipped: 182 KB)
- Lighthouse Score: 95+
- Mobile Optimized: Yes

## 🔒 Security

- Never commit `.env` to Git
- Keep API tokens private
- Use minimal GitHub permissions
- Google Sheet only accessible by you

## 📞 Support

For issues or questions:
1. Check browser console (F12)
2. Verify `.env` configuration
3. Restart dev server after changes

---

**Built with ❤️ using React + Vite**
