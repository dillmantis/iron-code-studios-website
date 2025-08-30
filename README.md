# Iron Code Studios - Static Website

A comprehensive, enterprise-grade static website for Iron Code Studios - a software NGO focused on creating technology solutions for social impact. This site has been converted from a Node.js/Express application to work as a pure static site while maintaining all functionality.

## 🌟 Features

### Frontend
- **Modern, Responsive Design**: Mobile-first approach with seamless desktop experience
- **Enterprise-Grade UI/UX**: Professional design with smooth animations and micro-interactions
- **Advanced Animations**: CSS and JavaScript animations for enhanced user experience
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Performance Optimized**: Fast loading times with optimized assets and lazy loading
- **Static Site**: No server required - works with any static hosting provider

### Sections & Pages
- **Homepage**: Hero section, about, software showcase, updates, team, testimonials
- **Software Portfolio**: Detailed software showcase with filtering and search
- **Updates & News**: Blog-style layout with categorization and pagination
- **Contact Form**: Professional contact form with email notifications
- **Team Section**: Team member profiles with social links
- **Testimonials**: Customer testimonials with slideshow functionality

## 🚀 Quick Start

### Simple File Serving
Open `index.html` directly in your browser, or use any static file server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if available)
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Live Server (VS Code)
If using VS Code, install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

## 📧 Contact Form Handling

The contact forms currently use `mailto:` links which open the user's email client. For better user experience, consider these alternatives:

### Option 1: Formspree (Recommended)
[Formspree](https://formspree.io/) is a popular form handling service:

1. Sign up at https://formspree.io/
2. Create a new form and get your endpoint URL
3. Update the form handler in `js/main.js`:

```javascript
// Replace the mailto functionality with:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        organization: data.organization
    })
});
```

### Option 2: Netlify Forms
If hosting on Netlify, you can use their built-in form handling:

1. Add `netlify` attribute to your HTML forms:
```html
<form id="contact-form" netlify>
```

2. Update the JavaScript to submit normally (remove preventDefault() in some cases)

### Option 3: EmailJS
[EmailJS](https://www.emailjs.com/) sends emails directly from JavaScript:

1. Sign up at https://www.emailjs.com/
2. Create email service and template
3. Include EmailJS SDK:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

4. Update the form handler:

```javascript
emailjs.send('your_service_id', 'your_template_id', {
    name: data.name,
    email: data.email,
    message: data.message
});
```

### Option 4: Custom Serverless Function
Deploy a simple serverless function using:
- Vercel Functions
- Netlify Functions  
- AWS Lambda
- Cloudflare Workers

## 📊 Static Data

The site now uses static data instead of API endpoints:
- Software projects are defined in `js/software.js`
- News updates are defined in `js/updates.js`
- Team information and other dynamic content is embedded in the JavaScript

To update content:
1. Edit the respective JavaScript files
2. Modify the data arrays/objects
3. Refresh the page to see changes

## 🏗️ Project Structure

```
iron-code-studios/
├── index.html              # Main homepage
├── software.html           # Software showcase page
├── updates.html            # Updates and news page
├── css/
│   ├── main.css           # Main stylesheet
│   └── animations.css     # Animation effects
├── js/
│   ├── main.js           # Core functionality
│   ├── animations.js     # Animation scripts
│   ├── software.js       # Software page scripts
│   └── updates.js        # Updates page scripts
├── images/               # Image assets
├── assets/              # Other assets
└── README.md           # This file
```

## 🎨 Customization

### Colors and Branding
Edit the CSS custom properties in `css/main.css`:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --secondary-color: #64748b;  /* Secondary color */
    --accent-color: #f59e0b;     /* Accent color */
    /* ... more variables */
}
```

### Content Updates
- **Homepage content**: Edit `index.html`
- **Software projects**: Edit the data array in `js/software.js`
- **News/updates**: Edit the data array in `js/updates.js`
- **Styling**: Edit CSS files in the `css/` directory
- **Replace placeholder images** with actual assets

### Adding New Pages
1. Create new HTML file in root directory
2. Copy the header/footer structure from existing pages
3. Include necessary CSS and JavaScript files
4. Update navigation links in all pages

## 🚀 Deployment

### GitHub Pages
1. Push code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command to empty (it's a static site)
3. Set publish directory to root (`.`)
4. Deploy automatically on git push
5. For form handling, add `netlify` attribute to HTML forms

### Vercel
1. Import your GitHub repository to Vercel
2. No build configuration needed
3. Automatic deployments on git push
4. Can add serverless functions for form handling

### Traditional Web Hosting
Upload all files to your web hosting provider's public folder:
- Usually `public_html`, `www`, or `htdocs`
- Use FTP or hosting provider's file manager
- No server configuration needed

## 🔒 Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Server-side validation and sanitization
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet.js for security headers
- **Email Validation**: Robust email validation
- **XSS Protection**: Input escaping and sanitization

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Features

- **Lazy Loading**: Images and content loaded on demand
- **Optimized Animations**: GPU-accelerated animations with fallbacks
- **Efficient JavaScript**: Debounced input handlers and optimized DOM operations
- **CSS Optimization**: Minimal CSS with efficient selectors
- **Compression**: Gzip compression for production

## 📚 Documentation

### JavaScript Functions
- `initNavigation()`: Mobile menu and scroll effects
- `initContactForm()`: Form validation and submission
- `initSoftwareFilters()`: Portfolio filtering functionality
- `initTestimonialSlider()`: Testimonial carousel
- `initScrollAnimations()`: Scroll-triggered animations

### CSS Classes
- `.btn-primary`, `.btn-secondary`: Button styles
- `.fade-in-up`, `.slide-in-left`: Animation classes
- `.container`: Content container with responsive padding
- `.section-header`: Standard section header styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: hello@ironcodestudios.org
- GitHub Issues: [Create an issue](https://github.com/ironcodestudios/website/issues)
- Documentation: [View docs](https://docs.ironcodestudios.org)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inter and JetBrains Mono font families
- Node.js and Express.js community
- All our contributors and supporters

---

Built with ❤️ by Iron Code Studios - Forging Code for Social Impact
