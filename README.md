# Iron Code Studios Website

A comprehensive, enterprise-grade website for Iron Code Studios - a software NGO focused on creating technology solutions for social impact.

## 🌟 Features

### Frontend
- **Modern, Responsive Design**: Mobile-first approach with seamless desktop experience
- **Enterprise-Grade UI/UX**: Professional design with smooth animations and micro-interactions
- **Advanced Animations**: CSS and JavaScript animations for enhanced user experience
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Performance Optimized**: Fast loading times with optimized assets and lazy loading

### Backend
- **Email Integration**: Automated email sending for contact forms and newsletters
- **Rate Limiting**: Protection against spam and abuse
- **Security Features**: Helmet.js security headers, input validation, and sanitization
- **API Endpoints**: RESTful API for software data, updates, and team information
- **Environment Configuration**: Flexible configuration for different deployment environments

### Sections & Pages
- **Homepage**: Hero section, about, software showcase, updates, team, testimonials
- **Software Portfolio**: Detailed software showcase with filtering and search
- **Updates & News**: Blog-style layout with categorization and pagination
- **Contact Form**: Professional contact form with email notifications
- **Team Section**: Team member profiles with social links
- **Testimonials**: Customer testimonials with slideshow functionality

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- A Gmail account or SMTP server for email functionality

### Installation

1. **Clone the repository** (if using version control):
   ```bash
   git clone https://github.com/ironcodestudios/website.git
   cd iron-code-studios
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   # Email Configuration (Required for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@ironcodestudios.org
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 📧 Email Configuration

### Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
3. Use your Gmail address as `EMAIL_USER` and the app password as `EMAIL_PASS`

### Alternative SMTP Setup
If you prefer to use a different email service, uncomment and configure the SMTP settings in the `.env` file:

```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-smtp-password
```

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
├── backend/
│   ├── server.js         # Express server
│   ├── package.json      # Dependencies
│   └── .env.example      # Environment template
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

### Content
- Update company information in HTML files
- Modify team member data in `backend/server.js`
- Add your software projects to the API endpoints
- Replace placeholder images with actual assets

### Email Templates
Customize email templates in `backend/server.js`:
- Contact form auto-reply
- Newsletter welcome email
- Admin notifications

## 🔧 API Endpoints

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Example Corp",
  "subject": "partnership",
  "message": "Hello..."
}
```

### Newsletter Subscription
```
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Software Data
```
GET /api/software?category=education&status=active
```

### Updates/News
```
GET /api/updates?category=release&limit=10&featured=true
```

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**:
   ```env
   NODE_ENV=production
   PORT=80
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Build and Start**:
   ```bash
   cd backend
   npm install --production
   npm start
   ```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/ {
        proxy_pass http://localhost:3000/api/;
    }
}
```

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
