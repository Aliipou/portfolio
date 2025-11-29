# Ali Pourrahim - Portfolio Website

A modern, interactive portfolio website showcasing backend development and cloud engineering expertise.

## Features

- **Modern React + Tailwind-inspired Design**: Clean, professional aesthetics with utility-first styling
- **Interactive Particle System**: Dynamic background with mouse-following particles
- **Glassmorphism Effects**: Modern frosted-glass UI elements with backdrop blur
- **Smooth Animations**: Staggered fade-in effects, hover animations, and parallax scrolling
- **3D Card Interactions**: Project cards with perspective transforms on mouse movement
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Lightweight vanilla JavaScript, no heavy frameworks
- **Accessibility**: Semantic HTML and keyboard navigation support

## Technologies Used

- HTML5
- CSS3 (Modern features: backdrop-filter, CSS Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Canvas API (for particle system)

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive features and scroll animations
├── particles.js        # Particle background system
├── README.md           # This file
└── portfolio.pdf       # LinkedIn profile export
```

## Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. No build process or dependencies required!



## Customization

### Colors

Edit the CSS custom properties in `styles.css`:

```css
:root {
    --bg-primary: #0f172a;
    --accent: #6366f1;
    --accent-secondary: #8b5cf6;
    /* ... more variables */
}
```

### Content

Update content directly in `index.html`:
- Projects: Section with id="projects"
- About: Section with id="about"
- Contact: Section with id="contact"

### Particles

Modify particle settings in `particles.js`:

```javascript
this.maxParticles = 80;  // Number of particles
this.mouse.radius = 150; // Mouse interaction radius
```

## Performance

- **Page Load**: < 1 second on fast connections
- **First Contentful Paint**: < 0.5s
- **Lighthouse Score**: 95+ on Performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features Breakdown

### 1. Navigation
- Fixed glassmorphism navbar
- Active section highlighting
- Smooth scroll to sections
- Keyboard shortcuts (1-4 for sections, ESC for top)

### 2. Hero Section
- Animated title with gradient text
- Staggered fade-in animations
- Interactive tech stack tags
- Philosophy statement with accent border
- Call-to-action buttons with shimmer effect

### 3. Projects Section
- 6 featured projects from GitHub
- 3D card hover effects with perspective transform
- Problem → Solution → Result format
- Tech stack badges
- Direct links to GitHub repositories

### 4. About Section
- Personal bio with multilingual emphasis
- Approach and principles
- 3 focus areas (Backend, Cloud, Data/NLP)
- Interactive language cards with flags
- Education and certifications

### 5. Contact Section
- Clean contact cards
- Animated hover states
- GitHub, LinkedIn, Email links

### 6. Particle Background
- 80 interactive particles
- Connecting lines between nearby particles
- Mouse interaction (particles repel from cursor)
- Smooth canvas animations at 60fps

## Keyboard Shortcuts

- `1` - Navigate to Home
- `2` - Navigate to Projects
- `3` - Navigate to About
- `4` - Navigate to Contact
- `ESC` - Scroll to top


## License

This project is open source and available under the MIT License.

## Contact

**Ali Pourrahim**
- GitHub: [@Aliipou](https://github.com/Aliipou)
- LinkedIn: [ali-pourrahim](https://linkedin.com/in/ali-pourrahim/)

## Acknowledgments

- Design inspiration: Modern React + Tailwind websites
- Color palette: Indigo/Purple gradient theme
- Icons: Native emoji flags for languages

---

**Built with intention, not templates** ✨
