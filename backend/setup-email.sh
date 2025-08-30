#!/bin/bash

# Iron Code Studios - Email Setup Script
echo "🔧 Setting up email configuration for Iron Code Studios..."
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    exit 1
fi

# Prompt for Gmail app password (hidden input)
echo "📧 Please enter your Gmail App Password:"
echo "   (This will be hidden as you type for security)"
echo ""
read -s -p "Gmail App Password: " APP_PASS
echo ""

# Validate input
if [ -z "$APP_PASS" ]; then
    echo "❌ Error: Password cannot be empty!"
    exit 1
fi

# Update the .env file
if sed -i '' "s/YOUR_APP_PASSWORD_HERE/$APP_PASS/g" .env; then
    echo ""
    echo "✅ Email configuration updated successfully!"
    echo ""
    echo "🚀 You can now start the server with:"
    echo "   npm run dev"
    echo ""
else
    echo "❌ Error: Failed to update .env file"
    exit 1
fi

# Clear the password variable for security
unset APP_PASS
