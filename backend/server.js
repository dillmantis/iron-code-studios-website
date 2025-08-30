const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const validator = require('validator');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression and logging
app.use(compression());
app.use(morgan('combined'));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per windowMs
  message: 'Too many contact form submissions, please try again later.'
});

const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 newsletter signups per windowMs
  message: 'Too many newsletter signups, please try again later.'
});

app.use(generalLimiter);

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Email configuration
let transporter;

const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else if (process.env.SMTP_HOST) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

// Initialize transporter
transporter = createTransporter();

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, company, phone } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long.'
      });
    }

    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured properly.'
      });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${validator.escape(name)}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${validator.escape(company)}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${validator.escape(phone)}</p>` : ''}
            <p><strong>Subject:</strong> ${validator.escape(subject || 'No Subject')}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 3px; white-space: pre-wrap;">${validator.escape(message)}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from the Iron Code Studios contact form.
          </p>
        </div>
      `
    };

    // Auto-reply to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Iron Code Studios',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Thank You for Reaching Out!</h2>
          <p>Dear ${validator.escape(name)},</p>
          <p>Thank you for contacting Iron Code Studios. We have received your message and will get back to you within 24 hours.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 3px; white-space: pre-wrap;">${validator.escape(message)}</p>
          </div>
          <p>Best regards,<br>The Iron Code Studios Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Iron Code Studios - Building technology for social impact<br>
            If you did not send this message, please ignore this email.
          </p>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later.'
    });
  }
});

// Newsletter signup endpoint
app.post('/api/newsletter', newsletterLimiter, async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured properly.'
      });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Newsletter Signup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Newsletter Subscription</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <p><strong>Email:</strong> ${email}</p>
            ${name ? `<p><strong>Name:</strong> ${validator.escape(name)}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This subscription was made through the Iron Code Studios website.
          </p>
        </div>
      `
    };

    // Welcome email to subscriber
    const welcomeMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Iron Code Studios Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Welcome to Our Newsletter!</h2>
          ${name ? `<p>Dear ${validator.escape(name)},</p>` : '<p>Hello,</p>'}
          <p>Thank you for subscribing to the Iron Code Studios newsletter! You'll now receive updates about our latest projects, technology insights, and social impact initiatives.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">What to Expect:</h3>
            <ul style="margin: 0;">
              <li>Project updates and releases</li>
              <li>Technology articles and insights</li>
              <li>Social impact stories</li>
              <li>Community highlights</li>
            </ul>
          </div>
          <p>Best regards,<br>The Iron Code Studios Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Iron Code Studios - Building technology for social impact<br>
            You can unsubscribe from this newsletter at any time by contacting us.
          </p>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(welcomeMailOptions);

    res.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error processing your subscription. Please try again later.'
    });
  }
});

// API endpoints for dynamic content
app.get('/api/software', (req, res) => {
  const software = [
    {
      id: 1,
      title: "Community Resource Hub",
      description: "A comprehensive platform connecting community members with essential resources and services.",
      category: "Web Application",
      status: "Active",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      impact: "Serves 10,000+ community members",
      github: "https://github.com/iron-code-studios/community-hub",
      demo: "https://demo.ironcode.org/community-hub",
      image: "/images/projects/community-hub.jpg"
    },
    {
      id: 2,
      title: "Educational Analytics Platform",
      description: "Data-driven insights platform helping educational institutions improve student outcomes.",
      category: "Analytics",
      status: "In Development",
      technologies: ["Python", "Django", "TensorFlow", "PostgreSQL"],
      impact: "Analyzing data for 50+ schools",
      github: "https://github.com/iron-code-studios/edu-analytics",
      demo: null,
      image: "/images/projects/edu-analytics.jpg"
    },
    {
      id: 3,
      title: "Open Source API Gateway",
      description: "Lightweight, scalable API gateway solution for microservices architecture.",
      category: "Infrastructure",
      status: "Active",
      technologies: ["Go", "Redis", "Docker", "Kubernetes"],
      impact: "Used by 100+ developers",
      github: "https://github.com/iron-code-studios/api-gateway",
      demo: "https://gateway.ironcode.org",
      image: "/images/projects/api-gateway.jpg"
    }
  ];
  res.json(software);
});

app.get('/api/updates', (req, res) => {
  const updates = [
    {
      id: 1,
      title: "New Community Hub Features Released",
      excerpt: "We've added real-time notifications and improved the user dashboard based on community feedback.",
      content: "Our Community Resource Hub now includes several highly requested features...",
      author: "Development Team",
      date: "2024-03-15",
      category: "Product Update",
      featured: true,
      image: "/images/updates/hub-update.jpg"
    },
    {
      id: 2,
      title: "Partnering with Local Educational Institutions",
      excerpt: "Iron Code Studios announces partnerships with five local schools to improve educational technology.",
      content: "We're excited to announce new partnerships that will help us better understand...",
      author: "Sarah Johnson",
      date: "2024-03-10",
      category: "Partnership",
      featured: false,
      image: "/images/updates/partnership.jpg"
    },
    {
      id: 3,
      title: "Open Source Initiative Expansion",
      excerpt: "We're expanding our commitment to open source with three new projects launching this quarter.",
      content: "Open source software has been at the heart of our mission from day one...",
      author: "Tech Team",
      date: "2024-03-05",
      category: "Open Source",
      featured: false,
      image: "/images/updates/open-source.jpg"
    }
  ];
  res.json(updates);
});

app.get('/api/team', (req, res) => {
  const team = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Executive Director",
      bio: "Passionate about leveraging technology for social good with 10+ years in nonprofit leadership.",
      image: "/images/team/sarah.jpg",
      linkedin: "https://linkedin.com/in/sarah-johnson",
      twitter: "https://twitter.com/sarahjohnson"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in scalable web applications and open source contributions.",
      image: "/images/team/michael.jpg",
      linkedin: "https://linkedin.com/in/michael-chen",
      github: "https://github.com/michaelchen"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      bio: "User experience designer focused on creating accessible and inclusive digital experiences.",
      image: "/images/team/emily.jpg",
      linkedin: "https://linkedin.com/in/emily-rodriguez",
      dribbble: "https://dribbble.com/emilyrodriguez"
    }
  ];
  res.json(team);
});

app.get('/api/analytics/sample', (req, res) => {
  // Sample analytics data for dashboard
  const analytics = {
    totalUsers: 12500,
    activeProjects: 8,
    communityImpact: 25000,
    githubStars: 1200,
    monthlyGrowth: 15.5,
    projectStats: [
      { name: 'Community Hub', users: 8500, growth: 12 },
      { name: 'Edu Analytics', users: 2800, growth: 25 },
      { name: 'API Gateway', users: 1200, growth: 8 }
    ]
  };
  res.json(analytics);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve main HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/software', (req, res) => {
  res.sendFile(path.join(__dirname, '../software.html'));
});

app.get('/updates', (req, res) => {
  res.sendFile(path.join(__dirname, '../updates.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Iron Code Studios server running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${transporter ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Verify email configuration
  if (transporter) {
    transporter.verify((error, success) => {
      if (error) {
        console.log('📧 Email verification failed:', error.message);
      } else {
        console.log('📧 Email server is ready to send messages');
      }
    });
  }
});
