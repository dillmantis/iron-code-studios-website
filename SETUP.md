# Iron Code Studios Website - Setup Guide

## 🚀 Quick Setup Instructions

### Step 1: Install Dependencies

Navigate to the backend directory and install the required Node.js packages:

```bash
cd iron-code-studios/backend
npm install
```

### Step 2: Configure Email Settings

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file with your email configuration:**

   **For Gmail (Recommended):**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@ironcodestudios.org
   ```

   **Gmail App Password Setup:**
   - Enable 2-factor authentication on your Gmail account
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Use this password as `EMAIL_PASS`

   **For Other Email Providers:**
   ```env
   SMTP_HOST=smtp.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=noreply@yourdomain.com
   SMTP_PASS=your-smtp-password
   ```

### Step 3: Start the Server

```bash
# For development (with auto-restart)
npm run dev

# For production
npm start
```

### Step 4: Access the Website

Open your browser and navigate to:
- **Local development:** http://localhost:3000
- **Production:** Your configured domain

## 📧 Email Configuration Details

### Gmail Setup (Most Common)

1. **Enable 2FA:** Go to your Google Account settings and enable 2-factor authentication
2. **Generate App Password:**
   - Navigate to Security → 2-Step Verification → App passwords
   - Select "Mail" as the app
   - Copy the 16-character password
3. **Update .env file:**
   ```env
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop  # 16-character app password
   ADMIN_EMAIL=admin@ironcodestudios.org
   ```

### Alternative Email Services

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-smtp-password
```

**Office 365:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

## 🌐 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=80
FRONTEND_URL=https://yourdomain.com
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your-production-email-password
ADMIN_EMAIL=admin@yourdomain.com
```

### Using PM2 (Process Manager)

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Start the application:**
   ```bash
   cd backend
   pm2 start server.js --name "iron-code-studios"
   ```

3. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

### Using Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY backend/package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run:**
   ```bash
   docker build -t iron-code-studios .
   docker run -p 3000:3000 --env-file backend/.env iron-code-studios
   ```

### Nginx Reverse Proxy

Create `/etc/nginx/sites-available/iron-code-studios`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri @proxy;
    }
    
    # API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Main application
    location @proxy {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location / {
        try_files $uri $uri/ @proxy;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/iron-code-studios /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## 📊 Monitoring and Logging

### PM2 Monitoring
```bash
# View logs
pm2 logs iron-code-studios

# Monitor performance
pm2 monit

# Restart application
pm2 restart iron-code-studios
```

### Log Management
```bash
# View application logs
tail -f /var/log/iron-code-studios/app.log

# View nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 🔧 Customization

### Update Company Information

1. **Edit HTML files** to update:
   - Company name and description
   - Contact information
   - Team member details
   - Software project information

2. **Update email templates** in `backend/server.js`:
   - Contact form auto-reply
   - Newsletter welcome email
   - Admin notification templates

3. **Modify styling** in `css/main.css`:
   - Color scheme (CSS custom properties)
   - Typography
   - Layout spacing

### Add New Software Projects

Edit the software data in `backend/server.js`:

```javascript
const softwareProjects = [
    {
        id: 5,
        title: 'Your New Project',
        description: 'Project description',
        category: 'education', // or healthcare, environment, community
        status: 'Active', // or Beta, Development
        features: ['Feature 1', 'Feature 2'],
        technologies: ['React', 'Node.js'],
        impact: {
            users: '1000+',
            countries: '5'
        },
        links: {
            demo: 'https://demo.yourproject.org',
            github: 'https://github.com/yourorg/project',
            docs: 'https://docs.yourproject.org'
        }
    }
];
```

## 🚨 Troubleshooting

### Common Issues

**Email not sending:**
- Check that EMAIL_USER and EMAIL_PASS are correctly set
- Verify that 2FA is enabled and app password is generated (for Gmail)
- Check server logs for specific error messages

**Contact form not working:**
- Ensure the backend server is running
- Check browser console for JavaScript errors
- Verify API endpoints are accessible

**Styling issues:**
- Clear browser cache
- Check that CSS files are loading correctly
- Verify file paths are correct

### Debug Commands

```bash
# Check if server is running
netstat -tlnp | grep :3000

# Test email configuration
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: { user: 'your-email@gmail.com', pass: 'your-app-password' }
});
transporter.verify(console.log);
"

# Check log files
tail -f backend/logs/app.log
```

## 📚 Additional Resources

- **Node.js Documentation:** https://nodejs.org/docs/
- **Express.js Guide:** https://expressjs.com/
- **Nodemailer Documentation:** https://nodemailer.com/
- **Font Awesome Icons:** https://fontawesome.com/icons
- **CSS Grid Guide:** https://css-tricks.com/snippets/css/complete-guide-grid/

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** for error messages
2. **Review the README.md** for detailed documentation
3. **Search existing issues** on GitHub
4. **Create a new issue** with detailed information about the problem

### Support Contacts

- **Technical Support:** tech@ironcodestudios.org
- **General Inquiries:** hello@ironcodestudios.org
- **GitHub Issues:** https://github.com/ironcodestudios/website/issues

---

**Happy coding! 🚀**
