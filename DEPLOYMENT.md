# Website Deployment Guide

## Overview
This repository contains a professional website for **OSHA Safety & Roofing Co.**, a company serving Washington and Oregon with safety compliance and roofing services.

## Files
- `index.html` - Main website page with all content
- `styles.css` - Stylesheet with responsive design
- `README.md` - Repository description

## Features
✅ Fully responsive design (mobile, tablet, desktop)
✅ Professional color scheme and modern UI
✅ Complete business information sections
✅ Contact form for quote requests
✅ Smooth animations and hover effects

## How to Deploy

### Option 1: GitHub Pages (Recommended)
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Under "Source", select the branch `copilot/build-website-with-information`
4. Click "Save"
5. Your website will be available at: `https://tyleralofall.github.io/OSHA_WA_OR/`

### Option 2: Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Select this branch
4. Deploy!

### Option 3: Local Testing
```bash
# Navigate to the repository directory
cd /path/to/OSHA_WA_OR

# Start a simple HTTP server
python3 -m http.server 8080

# Open browser to http://localhost:8080
```

## Customization

### Update Contact Information
Edit `index.html` and find the contact section to update:
- Phone number
- Email address
- Business hours
- Service areas

### Change Colors
Edit `styles.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #1a5490;     /* Main blue color */
    --secondary-color: #e67e22;   /* Orange accent */
    --dark-color: #2c3e50;        /* Dark gray */
}
```

### Add Your Logo
Replace the text logo in `index.html` with an image:
```html
<div class="logo">
    <img src="your-logo.png" alt="Company Logo">
</div>
```

## Browser Compatibility
✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS, Android)

## Need Help?
For questions or support with this website, please contact the repository owner.
