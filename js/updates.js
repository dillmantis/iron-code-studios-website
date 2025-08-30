// Updates Page JavaScript

let allUpdates = [];
let filteredUpdates = [];
let currentPage = 1;
const itemsPerPage = 6;

document.addEventListener('DOMContentLoaded', function() {
    initUpdatesPage();
});

async function initUpdatesPage() {
    await loadUpdatesData();
    initSearchAndFilters();
    initPagination();
    initArticleModal();
    renderUpdatesGrid();
}

async function loadUpdatesData() {
    // Use static data instead of API
    allUpdates = getFallbackUpdatesData();
    filteredUpdates = [...allUpdates];
}

function getFallbackUpdatesData() {
    return [
        {
            id: 1,
            title: 'EduConnect 3.0: Revolutionizing Digital Education',
            excerpt: 'Our flagship education platform receives its most significant update yet, featuring AI-powered personalized learning paths, enhanced accessibility, and improved performance.',
            content: `
                <p>We're thrilled to announce the launch of EduConnect 3.0, the most significant update to our education platform since its inception. This release represents months of development work focused on creating a more personalized, accessible, and powerful learning experience.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>AI-Powered Learning Paths:</strong> Personalized curriculum recommendations based on learning style and progress</li>
                    <li><strong>Enhanced Accessibility:</strong> Full WCAG 2.1 AA compliance with screen reader support</li>
                    <li><strong>Performance Improvements:</strong> 50% faster load times and offline capability</li>
                    <li><strong>Mobile-First Design:</strong> Optimized for smartphones and tablets</li>
                </ul>
                
                <p>This update directly impacts over 50,000 students across 15 countries, making quality education more accessible than ever before.</p>
                
                <h3>What's Next</h3>
                <p>We're already working on EduConnect 4.0, which will include virtual reality learning environments and advanced AI tutoring capabilities. Stay tuned for more updates!</p>
            `,
            category: 'release',
            date: '2024-12-15',
            author: 'Sarah Chen',
            featured: true,
            readTime: '5 min read',
            tags: ['EduConnect', 'Education', 'AI', 'Accessibility'],
            icon: 'fa-graduation-cap'
        },
        {
            id: 2,
            title: 'Global Education Initiative Partnership',
            excerpt: 'Expanding our reach to 50,000 students across Africa through strategic partnership with GEI.',
            content: `
                <p>We're excited to announce our partnership with the Global Education Initiative (GEI) to expand technology education access across Africa. This collaboration will bring our EduConnect platform to 50,000 students in underserved communities.</p>
                
                <h3>Partnership Highlights</h3>
                <ul>
                    <li>Platform localization for multiple African languages</li>
                    <li>Offline-first architecture for areas with limited connectivity</li>
                    <li>Local content development and teacher training programs</li>
                    <li>Sustainable technology infrastructure setup</li>
                </ul>
                
                <p>This partnership represents a significant milestone in our mission to make quality education accessible to all. We're committed to working closely with local communities to ensure our technology truly serves their needs.</p>
            `,
            category: 'partnership',
            date: '2024-12-10',
            author: 'Marcus Rodriguez',
            featured: false,
            readTime: '3 min read',
            tags: ['Partnership', 'Africa', 'Education', 'Expansion'],
            icon: 'fa-globe-africa'
        },
        {
            id: 3,
            title: 'MedAccess Security Enhancement',
            excerpt: 'Latest security patch implements advanced threat detection and improves data encryption.',
            content: `
                <p>Security and privacy are paramount in healthcare technology. Our latest MedAccess update includes significant security enhancements to protect patient data and ensure HIPAA compliance.</p>
                
                <h3>Security Improvements</h3>
                <ul>
                    <li>End-to-end encryption for all patient communications</li>
                    <li>Advanced threat detection and monitoring</li>
                    <li>Multi-factor authentication for all users</li>
                    <li>Regular security audits and penetration testing</li>
                </ul>
                
                <p>These enhancements ensure that patient data remains secure while maintaining the user-friendly experience that healthcare providers rely on.</p>
            `,
            category: 'update',
            date: '2024-12-05',
            author: 'David Kim',
            featured: false,
            readTime: '2 min read',
            tags: ['MedAccess', 'Security', 'Healthcare', 'Privacy'],
            icon: 'fa-shield-alt'
        },
        {
            id: 4,
            title: 'TechForGood Innovation Award',
            excerpt: 'Iron Code Studios receives recognition for outstanding contribution to technology for social good.',
            content: `
                <p>We're honored to receive the TechForGood Innovation Award for our commitment to using technology for social impact. This recognition validates our approach to building enterprise-grade solutions that serve underserved communities.</p>
                
                <p>The award specifically recognizes our work on:</p>
                <ul>
                    <li>EduConnect's impact on global education access</li>
                    <li>MedAccess's role in expanding healthcare reach</li>
                    <li>Our open-source commitment and community building</li>
                </ul>
                
                <p>This award belongs to our entire team and the communities we serve. Thank you for your continued support and trust in our mission.</p>
            `,
            category: 'news',
            date: '2024-11-28',
            author: 'Sarah Chen',
            featured: false,
            readTime: '4 min read',
            tags: ['Awards', 'Recognition', 'Social Impact'],
            icon: 'fa-award'
        },
        {
            id: 5,
            title: 'EcoTracker 2.0 Beta Launch',
            excerpt: 'Enhanced environmental monitoring with real-time analytics and AI-powered insights.',
            content: `
                <p>EcoTracker 2.0 beta is now available, featuring significant improvements to environmental monitoring and sustainability tracking capabilities.</p>
                
                <h3>New Features</h3>
                <ul>
                    <li>Real-time environmental data processing</li>
                    <li>AI-powered sustainability recommendations</li>
                    <li>Enhanced data visualization and reporting</li>
                    <li>Mobile app for field data collection</li>
                </ul>
                
                <p>Organizations can now track their environmental impact with unprecedented accuracy and receive actionable insights to improve their sustainability practices.</p>
            `,
            category: 'release',
            date: '2024-11-20',
            author: 'Aisha Patel',
            featured: false,
            readTime: '5 min read',
            tags: ['EcoTracker', 'Environment', 'Sustainability', 'AI'],
            icon: 'fa-leaf'
        },
        {
            id: 6,
            title: 'Developer Conference 2024',
            excerpt: 'Join us for our annual developer conference featuring workshops, talks, and networking opportunities.',
            content: `
                <p>Our annual Developer Conference is scheduled for March 15-16, 2025. This year's theme is "Code for Change: Building Technology That Matters."</p>
                
                <h3>Conference Highlights</h3>
                <ul>
                    <li>Keynote speakers from leading tech companies</li>
                    <li>Hands-on workshops on our open-source projects</li>
                    <li>Panel discussions on technology for social impact</li>
                    <li>Networking opportunities with like-minded developers</li>
                </ul>
                
                <p>Registration is now open. Early bird tickets are available until January 31, 2025.</p>
            `,
            category: 'event',
            date: '2024-11-15',
            author: 'Marcus Rodriguez',
            featured: false,
            readTime: '2 min read',
            tags: ['Conference', 'Developer', 'Event', 'Community'],
            icon: 'fa-users'
        }
    ];
}

function initSearchAndFilters() {
    const searchInput = document.getElementById('updates-search');
    const categoryFilter = document.getElementById('category-filter');
    const dateFilter = document.getElementById('date-filter');
    
    let searchTimeout;
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterUpdates();
            }, 300);
        });
    }
    
    // Filter functionality
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterUpdates);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterUpdates);
    }
}

function filterUpdates() {
    const searchTerm = document.getElementById('updates-search')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter')?.value || 'all';
    const dateFilter = document.getElementById('date-filter')?.value || 'all';
    
    filteredUpdates = allUpdates.filter(update => {
        const matchesSearch = !searchTerm || 
            update.title.toLowerCase().includes(searchTerm) ||
            update.excerpt.toLowerCase().includes(searchTerm) ||
            update.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
        const matchesCategory = categoryFilter === 'all' || update.category === categoryFilter;
        const matchesDate = dateFilter === 'all' || isWithinDateRange(update.date, dateFilter);
        
        return matchesSearch && matchesCategory && matchesDate;
    });
    
    currentPage = 1;
    renderUpdatesGrid();
    updatePagination();
}

function isWithinDateRange(dateString, range) {
    const updateDate = new Date(dateString);
    const now = new Date();
    
    switch (range) {
        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return updateDate >= weekAgo;
        case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return updateDate >= monthAgo;
        case 'quarter':
            const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
            return updateDate >= quarterAgo;
        case 'year':
            const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            return updateDate >= yearAgo;
        default:
            return true;
    }
}

function renderUpdatesGrid() {
    const grid = document.getElementById('updates-masonry');
    if (!grid) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageUpdates = filteredUpdates.slice(startIndex, endIndex);
    
    if (pageUpdates.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No updates found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    if (currentPage === 1) {
        grid.innerHTML = '';
    }
    
    const newContent = pageUpdates.map(update => `
        <article class="update-article" data-update-id="${update.id}">
            <div class="article-image">
                <div class="image-placeholder">
                    <i class="fas ${update.icon}"></i>
                </div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-category ${update.category}">${formatCategory(update.category)}</span>
                    <span class="article-date">${formatDate(update.date)}</span>
                </div>
                <h3>${update.title}</h3>
                <p>${update.excerpt}</p>
                <div class="article-footer">
                    <span class="read-time">${update.readTime}</span>
                    <button class="read-more" onclick="openArticleModal(${update.id})">
                        Read More <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
    
    if (currentPage === 1) {
        grid.innerHTML = newContent;
    } else {
        grid.insertAdjacentHTML('beforeend', newContent);
    }
    
    // Add animations to new articles
    setTimeout(() => {
        const newArticles = grid.querySelectorAll('.update-article:not(.animated)');
        newArticles.forEach((article, index) => {
            article.style.animationDelay = `${index * 0.1}s`;
            article.classList.add('fade-in-up', 'animated');
        });
    }, 100);
}

function formatCategory(category) {
    const categories = {
        release: 'Release',
        partnership: 'Partnership',
        update: 'Update',
        news: 'News',
        event: 'Event'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function openArticleModal(updateId) {
    const update = allUpdates.find(u => u.id === updateId);
    if (!update) return;
    
    const modal = document.getElementById('article-modal');
    const modalCategory = document.getElementById('modal-category');
    const modalDate = document.getElementById('modal-date');
    const modalTitle = document.getElementById('modal-article-title');
    const modalImage = document.getElementById('modal-article-image');
    const modalContent = document.getElementById('modal-article-content');
    const modalTags = document.getElementById('modal-article-tags');
    
    modalCategory.textContent = formatCategory(update.category);
    modalCategory.className = `modal-category ${update.category}`;
    modalDate.textContent = formatDate(update.date);
    modalTitle.textContent = update.title;
    
    modalImage.innerHTML = `
        <i class="fas ${update.icon}"></i>
        <span>${update.title}</span>
    `;
    
    modalContent.innerHTML = `
        <div class="article-author-info">
            <div class="author-avatar">
                <div class="avatar-placeholder">
                    <i class="fas fa-user"></i>
                </div>
            </div>
            <div class="author-details">
                <span class="author-name">By ${update.author}</span>
                <span class="article-meta-info">${formatDate(update.date)} • ${update.readTime}</span>
            </div>
        </div>
        
        <div class="article-body">
            ${update.content}
        </div>
    `;
    
    modalTags.innerHTML = update.tags.map(tag => `
        <span class="article-tag">${tag}</span>
    `).join('');
    
    // Setup share buttons
    setupShareButtons(update);
    
    // Show modal
    window.IronCode.openModal('article-modal');
}

function setupShareButtons(update) {
    const shareTitle = encodeURIComponent(update.title);
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(update.excerpt);
    
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
    document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    
    document.getElementById('share-copy').addEventListener('click', function(e) {
        e.preventDefault();
        copyToClipboard(window.location.href);
        showTooltip(this, 'Link copied!');
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip show';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}

function initPagination() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderUpdatesGrid();
                updatePagination();
                scrollToTop();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const maxPages = Math.ceil(filteredUpdates.length / itemsPerPage);
            if (currentPage < maxPages) {
                currentPage++;
                renderUpdatesGrid();
                updatePagination();
                scrollToTop();
            }
        });
    }
    
    // Number buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('pagination-number')) {
            const page = parseInt(e.target.textContent);
            if (page !== currentPage) {
                currentPage = page;
                renderUpdatesGrid();
                updatePagination();
                scrollToTop();
            }
        }
    });
}

function updatePagination() {
    const maxPages = Math.ceil(filteredUpdates.length / itemsPerPage);
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const numberContainer = document.querySelector('.pagination-numbers');
    
    // Update prev/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === maxPages;
    }
    
    // Update number buttons
    if (numberContainer) {
        let numbersHTML = '';
        
        // Always show first page
        numbersHTML += `<button class="pagination-number ${currentPage === 1 ? 'active' : ''}" data-page="1">1</button>`;
        
        if (maxPages > 1) {
            // Show ellipsis if needed
            if (currentPage > 3) {
                numbersHTML += '<span class="pagination-dots">...</span>';
            }
            
            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(maxPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                numbersHTML += `<button class="pagination-number ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</button>`;
            }
            
            // Show ellipsis if needed
            if (currentPage < maxPages - 2) {
                numbersHTML += '<span class="pagination-dots">...</span>';
            }
            
            // Always show last page if there are multiple pages
            if (maxPages > 1) {
                numbersHTML += `<button class="pagination-number ${currentPage === maxPages ? 'active' : ''}" data-page="${maxPages}">${maxPages}</button>`;
            }
        }
        
        numberContainer.innerHTML = numbersHTML;
    }
}

function scrollToTop() {
    const updatesSection = document.querySelector('.updates-grid-section');
    if (updatesSection) {
        updatesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function initArticleModal() {
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('article-modal');
            if (modal.style.display === 'flex') {
                window.IronCode.closeModal('article-modal');
            }
        }
    });
}

// Newsletter form for updates page
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form-large');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button[type="submit"]');
            
            if (!isValidEmail(email)) {
                showFormError(this, 'Please enter a valid email address');
                return;
            }
            
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            button.disabled = true;
            
            try {
                // Create mailto link for newsletter subscription
                const subject = encodeURIComponent('Newsletter Subscription Request');
                const body = encodeURIComponent(
                    `Please subscribe the following email to your newsletter:\n\n` +
                    `Email: ${email}\n\n` +
                    `Thank you!`
                );
                
                const mailtoLink = `mailto:hello@ironcodestudios.org?subject=${subject}&body=${body}`;
                
                // Simulate subscription delay
                setTimeout(() => {
                    window.location.href = mailtoLink;
                    showFormSuccess(this, 'Your email client should open to send subscription request');
                    this.reset();
                    
                    // Reset button
                    button.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
                    button.disabled = false;
                }, 1000);
                
            } catch (error) {
                console.error('Error:', error);
                showFormError(this, 'Please ensure you have an email client configured');
                
                // Reset button
                button.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
                button.disabled = false;
            }
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(form, message) {
    removeFormMessages(form);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message error-message';
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showFormSuccess(form, message) {
    removeFormMessages(form);
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message success-message';
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function removeFormMessages(form) {
    const messages = form.querySelectorAll('.form-message');
    messages.forEach(msg => msg.remove());
}

// Additional styling for updates page
const updatesStyles = `
.page-header {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: var(--white);
    padding: var(--space-24) 0 var(--space-16);
    margin-top: 80px;
    text-align: center;
}

.page-header h1 {
    color: var(--white);
    margin-bottom: var(--space-4);
}

.page-header p {
    font-size: var(--text-lg);
    opacity: 0.9;
    margin-bottom: var(--space-6);
}

.breadcrumb {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    opacity: 0.8;
}

.breadcrumb a {
    color: var(--white);
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.featured-update {
    background: var(--white);
    padding: var(--space-20) 0;
}

.featured-article {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.featured-article .article-meta {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    flex-wrap: wrap;
}

.article-category {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.article-category.featured {
    background: var(--accent-color);
    color: var(--white);
}

.article-category.release {
    background: var(--success);
    color: var(--white);
}

.article-category.partnership {
    background: var(--info);
    color: var(--white);
}

.article-category.update {
    background: var(--warning);
    color: var(--white);
}

.article-category.news {
    background: var(--primary-color);
    color: var(--white);
}

.article-category.event {
    background: var(--secondary-color);
    color: var(--white);
}

.article-date,
.article-author {
    font-size: var(--text-sm);
    color: var(--gray-500);
}

.featured-article h2 {
    margin-bottom: var(--space-6);
}

.article-excerpt {
    font-size: var(--text-lg);
    color: var(--gray-600);
    margin-bottom: var(--space-8);
    line-height: 1.6;
}

.featured-article .article-image {
    margin: var(--space-8) 0;
}

.article-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-6);
    margin-top: var(--space-8);
}

.article-share {
    display: flex;
    align-items: center;
    gap: var(--space-3);
}

.article-share span {
    font-size: var(--text-sm);
    color: var(--gray-600);
}

.article-share a {
    width: 40px;
    height: 40px;
    background: var(--gray-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-600);
    text-decoration: none;
    transition: all var(--transition);
}

.article-share a:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
}

.updates-filters {
    background: var(--gray-50);
    padding: var(--space-12) 0;
}

.filter-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    align-items: center;
}

@media (min-width: 768px) {
    .filter-header {
        flex-direction: row;
        justify-content: space-between;
    }
}

.filter-controls {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    align-items: center;
}

@media (min-width: 640px) {
    .filter-controls {
        flex-direction: row;
    }
}

.search-box {
    position: relative;
}

.search-box i {
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
}

.search-box input {
    width: 300px;
    padding: var(--space-3) var(--space-3) var(--space-3) var(--space-10);
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    transition: border-color var(--transition);
}

.search-box input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.filter-controls select {
    padding: var(--space-3) var(--space-4);
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    background: var(--white);
    font-size: var(--text-sm);
    cursor: pointer;
    min-width: 150px;
}

.updates-grid-section {
    background: var(--white);
    padding: var(--space-20) 0;
}

.updates-masonry {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-8);
    margin-bottom: var(--space-12);
}

.update-article {
    background: var(--gray-50);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all var(--transition);
    opacity: 0;
    transform: translateY(30px);
}

.update-article.fade-in-up {
    opacity: 1;
    transform: translateY(0);
}

.update-article:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.update-article .article-image {
    height: 200px;
    position: relative;
}

.article-content {
    padding: var(--space-6);
}

.update-article .article-meta {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
}

.update-article h3 {
    margin-bottom: var(--space-3);
    color: var(--gray-900);
    font-size: var(--text-xl);
}

.update-article p {
    color: var(--gray-600);
    margin-bottom: var(--space-4);
    line-height: 1.6;
}

.article-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.read-time {
    font-size: var(--text-sm);
    color: var(--gray-500);
}

.read-more {
    background: none;
    border: none;
    color: var(--primary-color);
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition: gap var(--transition);
}

.read-more:hover {
    gap: var(--space-3);
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-4);
    margin-top: var(--space-12);
}

.pagination-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: var(--white);
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    color: var(--gray-700);
    cursor: pointer;
    transition: all var(--transition);
}

.pagination-btn:hover:not(:disabled) {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-numbers {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.pagination-number {
    width: 40px;
    height: 40px;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    background: var(--white);
    color: var(--gray-700);
    cursor: pointer;
    transition: all var(--transition);
}

.pagination-number:hover,
.pagination-number.active {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
}

.pagination-dots {
    color: var(--gray-400);
    padding: 0 var(--space-2);
}

.newsletter-signup {
    background: linear-gradient(135deg, var(--gray-800), var(--gray-900));
    color: var(--white);
    padding: var(--space-20) 0;
}

.newsletter-content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

.newsletter-text h2 {
    color: var(--white);
    margin-bottom: var(--space-4);
}

.newsletter-text p {
    opacity: 0.9;
    margin-bottom: var(--space-8);
}

.newsletter-form-large .form-group {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
}

@media (max-width: 640px) {
    .newsletter-form-large .form-group {
        flex-direction: column;
    }
}

.newsletter-form-large input {
    flex: 1;
    padding: var(--space-4);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.1);
    color: var(--white);
    font-size: var(--text-base);
}

.newsletter-form-large input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.newsletter-form-large button {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    white-space: nowrap;
}

.form-disclaimer {
    font-size: var(--text-sm);
    opacity: 0.8;
    line-height: 1.5;
}

.form-disclaimer a {
    color: var(--accent-color);
    text-decoration: none;
}

.form-disclaimer a:hover {
    text-decoration: underline;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: var(--z-modal);
    align-items: center;
    justify-content: center;
    padding: var(--space-4);
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-content {
    background: var(--white);
    border-radius: var(--radius-xl);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    z-index: 1;
}

.modal-large .modal-content {
    max-width: 900px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--space-6);
    border-bottom: 1px solid var(--gray-200);
}

.modal-meta {
    display: flex;
    gap: var(--space-3);
    align-items: center;
}

.modal-close {
    width: 40px;
    height: 40px;
    background: var(--gray-100);
    border: none;
    border-radius: 50%;
    color: var(--gray-600);
    cursor: pointer;
    transition: all var(--transition);
}

.modal-close:hover {
    background: var(--error);
    color: var(--white);
}

.modal-body {
    padding: var(--space-6);
}

.modal-article-image {
    margin: var(--space-6) 0;
}

.article-author-info {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--gray-200);
}

.author-avatar .avatar-placeholder {
    width: 50px;
    height: 50px;
    font-size: var(--text-lg);
}

.author-details {
    display: flex;
    flex-direction: column;
}

.author-name {
    font-weight: 600;
    color: var(--gray-900);
}

.article-meta-info {
    font-size: var(--text-sm);
    color: var(--gray-500);
}

.article-body {
    line-height: 1.7;
    color: var(--gray-700);
}

.article-body h3 {
    margin: var(--space-8) 0 var(--space-4);
    color: var(--gray-900);
}

.article-body ul {
    margin: var(--space-4) 0;
    padding-left: var(--space-6);
}

.article-body li {
    margin-bottom: var(--space-2);
}

.modal-article-footer {
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--gray-200);
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
}

.article-tag {
    background: var(--gray-100);
    color: var(--gray-700);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius);
    font-size: var(--text-xs);
    font-weight: 500;
}

.share-btn {
    width: 40px;
    height: 40px;
    background: var(--gray-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-600);
    text-decoration: none;
    transition: all var(--transition);
}

.share-btn:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
}

.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: var(--space-16);
    color: var(--gray-500);
}

.no-results i {
    font-size: var(--text-5xl);
    margin-bottom: var(--space-4);
}

.no-results h3 {
    margin-bottom: var(--space-2);
    color: var(--gray-700);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = updatesStyles;
document.head.appendChild(styleSheet);
