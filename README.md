# Numble - Daily Number Guessing Game

A Wordle-inspired number guessing game where players try to guess a 4-digit number in 4 attempts.

## Features

✨ **Game Features:**
- 4 attempts to guess a 4-digit number
- Color-coded feedback (🟩 correct position, 🟨 wrong position, ⬛ not in number)
- Daily challenge - same number for everyone each day
- Statistics tracking (played, win%, current streak, max streak)
- Share results with emoji grid
- Keyboard and on-screen input support
- Progress saved automatically

🎨 **Design:**
- Authentic Wordle-style UI
- Smooth tile flip animations (slower, more satisfying)
- Dark theme
- Fully responsive
- No scrolling required

## Files Included

1. **numble-complete.html** - Standalone game (no backend needed)
2. **server.js** - Optional backend API for daily number generation
3. **package.json** - Node.js dependencies for backend

## Quick Start (Standalone)

Just open `numble-complete.html` in a web browser. The game generates the daily number locally using the date as a seed, so everyone gets the same number each day without needing a backend!

## Deployment Options

### Option 1: Static Hosting (Easiest)

Deploy the HTML file to any static hosting service:

#### **Netlify** (Recommended - Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop `numble-complete.html`
3. Rename it to `index.html`
4. Done! You'll get a URL like `your-numble.netlify.app`

#### **Vercel** (Free)
1. Go to [vercel.com](https://vercel.com)
2. Create new project
3. Upload `numble-complete.html` as `index.html`
4. Deploy

#### **GitHub Pages** (Free)
1. Create a GitHub repository
2. Upload `numble-complete.html` as `index.html`
3. Enable GitHub Pages in Settings
4. Access at `username.github.io/repo-name`

#### **Cloudflare Pages** (Free)
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Upload `numble-complete.html` as `index.html`
3. Deploy

### Option 2: With Backend API

If you want centralized control over the daily number:

#### **Deploy Backend to Railway** (Free tier available)

1. Install Node.js on your computer
2. Create a new folder with `server.js` and `package.json`
3. Go to [railway.app](https://railway.app)
4. Create new project → Deploy from GitHub or upload files
5. Railway will detect Node.js and deploy automatically
6. Get your API URL (e.g., `https://your-app.railway.app`)

#### **Deploy Backend to Render** (Free)

1. Go to [render.com](https://render.com)
2. New Web Service → Deploy from GitHub or upload
3. Build command: `npm install`
4. Start command: `npm start`
5. Get your API URL

#### **Deploy Backend to Fly.io** (Free)

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run: `fly launch` in your project folder
3. Follow prompts
4. Deploy with: `fly deploy`

#### **Connect Frontend to Backend**

In `numble-complete.html`, update line 351:
```javascript
const API_URL = 'https://your-backend-url.com'; // Add your API URL here
```

### Option 3: All-in-One Backend Deployment

Some platforms can host both frontend and backend:

#### **Heroku**
```bash
# Install Heroku CLI
heroku login
heroku create your-numble-app
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

Add `index.html` route to `server.js`:
```javascript
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/numble-complete.html');
});
```

## Backend Setup (If Using)

1. Install dependencies:
```bash
npm install
```

2. Run locally:
```bash
npm start
```

3. Test API:
```bash
curl http://localhost:3000/api/daily-number
```

## API Endpoints

- `GET /api/daily-number?digits=4` - Get today's number
- `POST /api/verify` - Verify a guess (optional)
- `GET /api/health` - Health check

## Customization

### Change Number of Digits
In the game code, change:
```javascript
this.DIGITS = 4; // Change to 3, 5, or 6
```

### Change Number of Attempts
```javascript
this.MAX_ATTEMPTS = 4; // Change to any number
```

### Change Colors
Edit the CSS variables for `.tile.correct`, `.tile.present`, `.tile.absent`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## How It Works

### Daily Number Generation
The game uses a seeded random number generator based on the current date. This ensures:
- Everyone gets the same number each day
- The number changes at midnight local time
- No backend needed (but optional backend available)
- Numbers are reproducible (same date = same number)

### Storage
- Game progress: `localStorage` (persists daily progress)
- Statistics: `localStorage` (lifetime stats)
- Resets at midnight for new daily challenge

## Testing

To see the daily number (for debugging):
- Open browser console (F12)
- Look for "Daily number: XXXX"

## Tips for Players

1. Start with a number that has varied digits (e.g., 1234)
2. Pay attention to yellow (🟨) tiles - the digit exists but wrong position
3. Green (🟩) tiles are locked in the right position
4. Gray (⬛) tiles should be avoided in future guesses
5. You have only 4 attempts - make them count!

## Sharing

Players can share their results as an emoji grid:
```
Numble 11/4/2025
3/4

🟩⬛🟨⬛
🟩🟨🟩⬛
🟩🟩🟩🟩
```

## License

MIT License - Feel free to modify and use for your own projects!

## Support

For issues or questions:
1. Check browser console for errors
2. Ensure JavaScript is enabled
3. Try clearing browser cache/localStorage
4. Test in incognito mode

## Future Enhancements

Potential features to add:
- Hard mode (use revealed hints in subsequent guesses)
- Custom digit lengths
- Leaderboards (requires backend)
- Dark/light theme toggle
- Sound effects
- Animations toggle
- Multiple languages

---

Made with ❤️ for number puzzle enthusiasts!
