# Iron Code Studios - Enterprise Dockerfile
FROM node:24-alpine AS base

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S ironcode -u 1001

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./
COPY backend/.npmrc ./

# Install dependencies with security audit
RUN npm ci --only=production && npm audit --audit-level high

# Copy application code
COPY backend/ ./
COPY *.html ./public/
COPY css/ ./public/css/
COPY js/ ./public/js/
COPY images/ ./public/images/
COPY assets/ ./public/assets/

# Set ownership and permissions
RUN chown -R ironcode:nodejs /app
USER ironcode

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Expose port
EXPOSE 3000

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]

# Multi-stage build for development
FROM base AS development
USER root
RUN npm ci
USER ironcode
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production
CMD ["node", "server.js"]
