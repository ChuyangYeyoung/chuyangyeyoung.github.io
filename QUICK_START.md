# Quick Start Guide

Get your academic website up and running in 5 minutes!

## Step 1: Update Your Information (2 minutes)

Open `data/content.json` in any text editor and update:

```json
{
  "profile": {
    "name": "YOUR NAME HERE",          // Change this
    "title": "YOUR TITLE HERE",         // Change this
    "affiliation": "YOUR UNIVERSITY",   // Change this
    "email": "your.email@university.edu",  // Change this
    ...
  }
}
```

**Important**: Keep the JSON format intact. Only change the values in quotes.

## Step 2: Add Your Photo (1 minute)

1. Find a square professional photo of yourself
2. Save it as `images/profile.jpg`
3. Done!

## Step 3: Preview Your Website (1 minute)

### Option A: Using Python (easiest)
```bash
cd personal_web
python -m http.server 8000
```
Then open: http://localhost:8000

### Option B: Using Node.js
```bash
cd personal_web
npx http-server -p 8000
```
Then open: http://localhost:8000

### Option C: Double-click
Just double-click `index.html` (may not work perfectly due to browser security)

## Step 4: Deploy (1 minute)

### Quick Deploy with Netlify:
1. Go to https://app.netlify.com/drop
2. Drag and drop your entire `personal_web` folder
3. Your site is live!

### Or use GitHub Pages:
```bash
# In your personal_web directory
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourname.github.io.git
git push -u origin main
```

Enable GitHub Pages in repository settings.

## Common Issues

**Problem**: "Error Loading Content" message
- **Fix**: Make sure `data/content.json` is valid. Check for missing commas or quotes.
- Use https://jsonlint.com to validate your JSON.

**Problem**: Photo not showing
- **Fix**: Verify `images/profile.jpg` exists and the path in `content.json` is correct.

**Problem**: Website looks plain
- **Fix**: You need to use a local server (Option A or B above), not just double-click the file.

## Next Steps

Once everything works:

1. **Add Publications**: Edit the `publications` array in `content.json`
2. **Update News**: Keep your `news` section current
3. **Customize Colors**: Edit `css/style.css` if you want different colors
4. **Add Your CV**: Create a `files` folder and add `cv.pdf`

## Need More Help?

- See full documentation in `README.md`
- Check the example file: `data/content.example.json`
- Validate your JSON: https://jsonlint.com

---

**That's it!** You now have a professional academic website.
