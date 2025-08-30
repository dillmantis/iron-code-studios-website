# Contributing to Iron Code Studios

Thank you for your interest in contributing to Iron Code Studios! This document provides guidelines and instructions for contributing to our open-source projects.

## 🌟 Our Mission

Iron Code Studios is dedicated to creating technology solutions for social impact. Every contribution helps us build better tools that serve communities and create positive change.

## 📋 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat all contributors with respect and maintain a welcoming environment.

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0 or higher
- npm 8.0.0 or higher  
- Git
- Code editor (VS Code recommended)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/iron-code-studios.git`
3. Install dependencies: `cd iron-code-studios/backend && npm install`
4. Copy environment template: `cp .env.example .env`
5. Configure your `.env` file
6. Start development server: `npm run dev`

## 🔄 Development Workflow

### Branch Strategy
We use **GitFlow** branching strategy:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `hotfix/*` - Critical production fixes
- `release/*` - Release preparation branches

### Creating a Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Commit Message Format
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or modifying tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `security` - Security improvements

**Examples:**
```
feat(frontend): add responsive navigation menu
fix(backend): resolve email validation issue
docs(readme): update installation instructions
security(auth): implement rate limiting for login
```

## 🧪 Testing Requirements

### Before Submitting
- [ ] All tests pass: `npm test`
- [ ] Code follows style guidelines: `npm run lint`
- [ ] Code is properly formatted: `npm run format`
- [ ] No security vulnerabilities: `npm audit`

### Test Coverage
- Maintain minimum 80% code coverage
- Write unit tests for new functions
- Add integration tests for API endpoints
- Include E2E tests for critical user flows

### Types of Tests
```bash
# Unit tests
npm test

# Integration tests  
npm run test:integration

# E2E tests
npm run test:e2e

# Performance tests
npm run test:performance
```

## 🎨 Code Style Guidelines

### JavaScript/Node.js
- Use ES6+ features
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use meaningful variable and function names
- Write self-documenting code with clear comments
- Prefer `const` over `let`, avoid `var`
- Use async/await over promises when possible

### HTML/CSS
- Use semantic HTML5 elements
- Follow BEM methodology for CSS class naming
- Ensure WCAG 2.1 AA accessibility compliance
- Use CSS custom properties for theming
- Optimize for mobile-first responsive design

### File Organization
```
iron-code-studios/
├── backend/           # Node.js backend
├── css/              # Stylesheets
├── js/               # Frontend JavaScript
├── images/           # Image assets
├── assets/           # Other assets
├── docs/             # Documentation
└── tests/            # Test files
```

## 🔒 Security Guidelines

### Security Best Practices
- Never commit sensitive data (API keys, passwords, etc.)
- Validate and sanitize all user inputs
- Use parameterized queries for database operations
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Regular dependency updates for security patches

### Reporting Security Issues
For security vulnerabilities, please email security@ironcodestudios.org instead of creating a public issue.

## 📝 Documentation Standards

### Code Documentation
- Document all public functions and classes
- Include JSDoc comments for JavaScript functions
- Provide usage examples in documentation
- Keep README files up to date

### API Documentation
- Document all API endpoints
- Include request/response examples
- Specify error codes and messages
- Provide authentication requirements

## 🔍 Code Review Process

### Pull Request Requirements
- [ ] Descriptive title and description
- [ ] Link to related issue(s)
- [ ] All tests passing
- [ ] Code review by at least 2 team members
- [ ] Security review for sensitive changes
- [ ] Documentation updated if needed

### Review Checklist
**Functionality**
- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] Performance is acceptable

**Code Quality**
- [ ] Code is readable and maintainable
- [ ] No code duplication
- [ ] Follows project conventions
- [ ] Adequate test coverage

**Security**
- [ ] No security vulnerabilities introduced
- [ ] Input validation is proper
- [ ] Authentication/authorization is correct
- [ ] No sensitive data exposed

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Breaking changes increment MAJOR
- New features increment MINOR  
- Bug fixes increment PATCH

### Release Workflow
1. Create release branch from `develop`
2. Update version numbers and changelogs
3. Merge release branch to `main`
4. Tag the release
5. Deploy to production
6. Merge back to `develop`

## 🏷️ Issue Labels

**Type Labels**
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `security` - Security-related issues

**Priority Labels**
- `critical` - Critical issues requiring immediate attention
- `high` - High priority issues
- `medium` - Medium priority issues
- `low` - Low priority issues

**Status Labels**
- `needs-triage` - Requires initial review
- `in-progress` - Currently being worked on
- `blocked` - Blocked by external dependencies
- `ready-for-review` - Ready for code review

## 🤝 Getting Help

### Resources
- [Project Documentation](docs/)
- [API Documentation](docs/api.md)
- [Development Setup Guide](docs/development.md)
- [Deployment Guide](docs/deployment.md)

### Communication Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Email** - hello@ironcodestudios.org
- **Discord** - [Iron Code Studios Community](https://discord.gg/ironcode)

### Mentorship
New contributors are welcome! We provide mentorship for:
- First-time open source contributors
- Students and career changers
- Underrepresented groups in tech

## 🙏 Recognition

Contributors are recognized in:
- Project README
- Release notes
- Annual contributor report
- Special contributor badges

## 📄 License

By contributing to Iron Code Studios, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to technology for social impact! 🌍**
