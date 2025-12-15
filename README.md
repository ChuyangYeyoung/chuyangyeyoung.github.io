# Personal Academic Website

A clean, Bootstrap-based academic homepage inspired by classic academic website designs. Perfect for researchers, professors, and PhD students.

## Design Features

- **Classic Bootstrap Design**: Based on the Bootswatch Flatly theme
- **Fixed Top Navigation**: Easy navigation with smooth scrolling
- **Two-Column Layout**: Content on left, photo on right (responsive)
- **Data-Driven**: All content stored in JSON for easy updates
- **Professional Style**: Clean typography and academic-friendly layout
- **Mobile Responsive**: Works on all devices

## File Structure

```
personal_web/
├── index.html              # Main HTML structure (Bootstrap-based)
├── bootstrap.css           # Bootstrap CSS theme
├── assets/
│   └── css/
│       └── bootswatch.min.css  # Additional Bootstrap styles
├── css/
│   └── style.css          # (Legacy, not used in current design)
├── js/
│   └── main.js            # Dynamic content loading with jQuery
├── data/
│   ├── content.json       # YOUR CONTENT GOES HERE
│   └── content.example.json   # Example reference
├── images/
│   └── profile.jpg        # Your profile photo
└── README.md              # This file
```

## Quick Start

### 1. Update Your Information

Edit `data/content.json` with your details:

```json
{
  "profile": {
    "name": "Your Name",
    "bio": "Your biography...",
    "email": "your.email@university.edu",
    "twitter": "yourusername",
    "github": "https://github.com/yourusername",
    ...
  },
  "publications": [...],
  "education": [...],
  ...
}
```

### 2. Add Your Photo

Replace `images/profile.jpg` with your photo. For best results:
- Any size (will be automatically resized)
- Format: JPG or PNG
- Professional headshot recommended

### 3. Preview Locally

```bash
# Using Python 3
python3 -m http.server 8000

# Or using npm
npm start

# Then open: http://localhost:8000
```

## Content Sections

The website includes these sections (all controlled by `data/content.json`):

### Profile Section
- Name, title, affiliation
- Biography (supports multiple paragraphs)
- Profile photo
- Social media links (GitHub, Twitter, LinkedIn, Google Scholar, Email)

### Research Section
- Research interests (bullet points)
- Research description
- Publications list with:
  - Authors, title, venue, year
  - Optional: Award badges
  - Links: paper, code, project, slides, poster
- Selected talks (keynotes, invited talks)

### Teaching Section
- Courses taught with semester and institution

### Education Section
- Degrees with institution, year, and optional thesis title

### Experience Section
- Professional positions with institution and time period

### Misc Section
- Academic service activities
- Reviewer roles
- Committee memberships

### News Section (Optional)
- Recent announcements
- Automatically hides if no news items

## Customization

### Update Publications

Add to the `publications` array in `data/content.json`:

```json
{
  "title": "Your Paper Title",
  "authors": "Author 1, Author 2, Author 3",
  "venue": "Conference Name (ACRONYM)",
  "year": "2024",
  "links": {
    "paper": "https://arxiv.org/...",
    "code": "https://github.com/...",
    "project": "https://yourproject.com"
  },
  "award": "Best Paper Award"  // Optional
}
```

### Add Talks

Add to the `talks` array:

```json
{
  "type": "Keynote",  // Optional: "Keynote", "Invited Talk", etc.
  "title": "Talk Title",
  "venue": "Conference/Institution",
  "location": "City, State",
  "date": "Month Year"
}
```

### Multiple Paragraphs in Bio

Use `\n\n` to separate paragraphs:

```json
"bio": "First paragraph here.\n\nSecond paragraph here.\n\nThird paragraph."
```

### Change Colors

The design uses the Bootswatch Flatly theme. To change colors, edit `bootstrap.css` or:

1. Download a different Bootswatch theme: https://bootswatch.com/
2. Replace `bootstrap.css` with your chosen theme
3. Adjust `assets/css/bootswatch.min.css` if needed

### Modify Navigation

Edit the navigation menu in `index.html` (around line 83-88):

```html
<ul class="nav navbar-nav">
    <li><a href="#research">Research</a></li>
    <li><a href="#teaching">Teaching</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#misc">Misc</a></li>
</ul>
```

## Deployment

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourname.github.io.git
git push -u origin main
```

Enable GitHub Pages in repository Settings > Pages > Select "main" branch.

Your site will be at: `https://yourusername.github.io/yourname.github.io/`

### Netlify

1. Visit https://app.netlify.com/drop
2. Drag and drop the entire `personal_web` folder
3. Done! Your site is live.

### Traditional Hosting

Upload all files via FTP/SFTP to your web server, preserving the directory structure.

## Maintenance Tips

### Regular Updates

1. **Publications**: Add new papers to the `publications` array
2. **News**: Keep recent items (3-6 months) in the `news` array
3. **Teaching**: Update courses each semester
4. **Bio**: Update as your position/interests change

### Best Practices

- Validate JSON after edits: https://jsonlint.com/
- Keep backup copies of `content.json`
- Test locally before deploying
- Update profile photo every 2-3 years
- Use consistent formatting for publications

### Troubleshooting

**Problem**: Page shows "Error Loading Content"
- **Fix**: Check `data/content.json` is valid JSON (use JSONLint)

**Problem**: Profile photo not showing
- **Fix**: Verify `images/profile.jpg` exists and path is correct in `content.json`

**Problem**: Social icons not showing
- **Fix**: Check Font Awesome CDN is accessible (requires internet connection)

**Problem**: jQuery errors in console
- **Fix**: Ensure jQuery CDN is accessible (check browser console)

## Technical Details

### Dependencies

- **Bootstrap 3.4.1**: Layout and components
- **Bootswatch Flatly**: Color theme
- **jQuery 3.6.0**: DOM manipulation
- **Font Awesome 4.7**: Social media icons

All dependencies are loaded from CDNs (no npm install required).

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- Lightweight: ~150KB total (including Bootstrap)
- Fast loading: CDN-based resources
- No build process required
- Works offline (except CDN resources)

## Comparison with Reference Site

This design is inspired by academic websites like http://yusanlin.com/ and features:

- Similar Bootstrap-based layout
- Fixed top navigation bar
- Two-column profile section (text + photo)
- Simple, clean typography
- Academic publication formatting
- Social media icons in navbar

## Credits

- Template inspired by Thomas Park's PubCSS
- Built with Bootstrap (MIT License)
- Icons by Font Awesome
- Bootswatch themes by Thomas Park

## License

This template is free to use for academic purposes. Modify as needed.

## Support

For issues:
1. Check this README
2. Validate JSON: https://jsonlint.com/
3. Check browser console (F12) for errors
4. Ensure local server is running (not just opening file://)

---

**Version**: 2.0.0 (Bootstrap-based redesign)
**Last Updated**: December 2024
