// Software Page JavaScript

let allSoftware = [];
let currentPage = 1;
const itemsPerPage = 6;

document.addEventListener('DOMContentLoaded', function() {
    initSoftwarePage();
});

async function initSoftwarePage() {
    await loadSoftwareData();
    initSearchAndFilters();
    initModalHandlers();
    renderSoftwareGrid();
}

async function loadSoftwareData() {
    // Use static data instead of API
    allSoftware = getFallbackSoftwareData();
}

function getFallbackSoftwareData() {
    return [
        {
            id: 1,
            title: 'EduConnect Platform',
            description: 'Comprehensive learning management system connecting students and educators globally',
            category: 'education',
            status: 'Active',
            features: [
                'AI-powered personalized learning paths',
                'Real-time collaboration tools',
                'Multi-language support',
                'Offline capability',
                'Progress tracking and analytics'
            ],
            technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'Docker'],
            impact: {
                users: '50,000+',
                countries: '15',
                hours: '1M+'
            },
            links: {
                demo: 'https://demo.educonnect.org',
                github: 'https://github.com/ironcodestudios/educonnect',
                docs: 'https://docs.educonnect.org'
            }
        },
        {
            id: 2,
            title: 'MedAccess Portal',
            description: 'Telemedicine platform providing healthcare access to underserved communities',
            category: 'healthcare',
            status: 'Beta',
            features: [
                'Video consultations',
                'Patient record management',
                'Prescription management',
                'Multi-provider support',
                'Mobile-first design'
            ],
            technologies: ['Vue.js', 'Python', 'MongoDB', 'WebRTC', 'Kubernetes'],
            impact: {
                users: '25,000+',
                countries: '8',
                consultations: '100K+'
            },
            links: {
                demo: 'https://demo.medaccess.org',
                github: 'https://github.com/ironcodestudios/medaccess',
                docs: 'https://docs.medaccess.org'
            }
        },
        {
            id: 3,
            title: 'EcoTracker System',
            description: 'Environmental monitoring and sustainability tracking for organizations',
            category: 'environment',
            status: 'Active',
            features: [
                'Carbon footprint tracking',
                'Resource usage monitoring',
                'Sustainability reporting',
                'Goal setting and tracking',
                'Data visualization'
            ],
            technologies: ['Angular', 'Spring Boot', 'MySQL', 'Apache Kafka', 'AWS'],
            impact: {
                organizations: '200+',
                carbonReduced: '10K tons',
                reports: '5K+'
            },
            links: {
                demo: 'https://demo.ecotracker.org',
                github: 'https://github.com/ironcodestudios/ecotracker',
                docs: 'https://docs.ecotracker.org'
            }
        },
        {
            id: 4,
            title: 'CommunityHub',
            description: 'Digital platform for community organizing and resource sharing',
            category: 'community',
            status: 'Development',
            features: [
                'Event organization tools',
                'Resource sharing marketplace',
                'Communication channels',
                'Volunteer management',
                'Impact measurement'
            ],
            technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker'],
            impact: {
                communities: '50+',
                events: '1K+',
                volunteers: '10K+'
            },
            links: {
                demo: 'https://demo.communityhub.org',
                github: 'https://github.com/ironcodestudios/communityhub',
                docs: 'https://docs.communityhub.org'
            }
        }
    ];
}

function initSearchAndFilters() {
    const searchInput = document.getElementById('software-search');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    
    let searchTimeout;
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterAndRenderSoftware();
            }, 300);
        });
    }
    
    // Filter functionality
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndRenderSoftware);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterAndRenderSoftware);
    }
}

function filterAndRenderSoftware() {
    const searchTerm = document.getElementById('software-search')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter')?.value || 'all';
    const statusFilter = document.getElementById('status-filter')?.value || 'all';
    
    let filteredSoftware = allSoftware.filter(software => {
        const matchesSearch = !searchTerm || 
            software.title.toLowerCase().includes(searchTerm) ||
            software.description.toLowerCase().includes(searchTerm) ||
            software.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
            
        const matchesCategory = categoryFilter === 'all' || software.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || software.status.toLowerCase() === statusFilter;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    renderSoftwareGrid(filteredSoftware);
}

function renderSoftwareGrid(softwareList = allSoftware) {
    const grid = document.getElementById('software-grid-detailed');
    if (!grid) return;
    
    if (softwareList.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No software found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = softwareList.map(software => `
        <div class="software-card-detailed" data-software-id="${software.id}">
            <div class="card-header">
                <div class="card-icon">
                    <i class="fas ${getCategoryIcon(software.category)}"></i>
                </div>
                <div class="card-meta">
                    <span class="category ${software.category}">${software.category}</span>
                    <span class="status ${software.status.toLowerCase()}">${software.status}</span>
                </div>
            </div>
            
            <div class="card-image">
                <div class="image-placeholder">
                    <i class="fas ${getCategoryIcon(software.category)}"></i>
                </div>
                <div class="card-overlay">
                    <button class="btn btn-primary" onclick="openSoftwareModal(${software.id})">
                        View Details
                    </button>
                </div>
            </div>
            
            <div class="card-content">
                <h3>${software.title}</h3>
                <p>${software.description}</p>
                
                <div class="tech-stack">
                    ${software.technologies.slice(0, 3).map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    ${software.technologies.length > 3 ? `<span class="tech-more">+${software.technologies.length - 3}</span>` : ''}
                </div>
                
                <div class="impact-metrics">
                    ${Object.entries(software.impact).map(([key, value]) => `
                        <div class="impact-metric">
                            <span class="metric-value">${value}</span>
                            <span class="metric-label">${formatMetricLabel(key)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="openSoftwareModal(${software.id})">
                        Learn More
                    </button>
                    <div class="action-links">
                        <a href="${software.links.demo}" target="_blank" title="View Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${software.links.github}" target="_blank" title="View Source">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="${software.links.docs}" target="_blank" title="Documentation">
                            <i class="fas fa-book"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add animations
    setTimeout(() => {
        grid.querySelectorAll('.software-card-detailed').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
        });
    }, 100);
}

function getCategoryIcon(category) {
    const icons = {
        education: 'fa-graduation-cap',
        healthcare: 'fa-heartbeat',
        environment: 'fa-leaf',
        community: 'fa-hands-helping'
    };
    return icons[category] || 'fa-code';
}

function formatMetricLabel(key) {
    const labels = {
        users: 'Users',
        countries: 'Countries',
        hours: 'Hours Used',
        consultations: 'Consultations',
        organizations: 'Organizations',
        carbonReduced: 'CO2 Reduced',
        reports: 'Reports',
        communities: 'Communities',
        events: 'Events',
        volunteers: 'Volunteers'
    };
    return labels[key] || key;
}

function openSoftwareModal(softwareId) {
    const software = allSoftware.find(s => s.id === softwareId);
    if (!software) return;
    
    const modal = document.getElementById('software-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = software.title;
    
    modalBody.innerHTML = `
        <div class="modal-software-content">
            <div class="software-overview">
                <div class="software-image">
                    <div class="image-placeholder">
                        <i class="fas ${getCategoryIcon(software.category)}"></i>
                        <span>${software.title}</span>
                    </div>
                </div>
                
                <div class="software-info">
                    <div class="software-meta">
                        <span class="category ${software.category}">${software.category}</span>
                        <span class="status ${software.status.toLowerCase()}">${software.status}</span>
                    </div>
                    
                    <p class="software-description">${software.description}</p>
                    
                    <div class="software-links">
                        <a href="${software.links.demo}" target="_blank" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i>
                            Live Demo
                        </a>
                        <a href="${software.links.github}" target="_blank" class="btn btn-secondary">
                            <i class="fab fa-github"></i>
                            Source Code
                        </a>
                        <a href="${software.links.docs}" target="_blank" class="btn btn-secondary">
                            <i class="fas fa-book"></i>
                            Documentation
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="software-details">
                <div class="details-section">
                    <h4>Key Features</h4>
                    <ul class="features-list">
                        ${software.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="details-section">
                    <h4>Technology Stack</h4>
                    <div class="tech-stack-detailed">
                        ${software.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="details-section">
                    <h4>Impact & Reach</h4>
                    <div class="impact-grid">
                        ${Object.entries(software.impact).map(([key, value]) => `
                            <div class="impact-card">
                                <span class="impact-number">${value}</span>
                                <span class="impact-label">${formatMetricLabel(key)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="details-section">
                    <h4>Getting Started</h4>
                    <div class="getting-started">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h5>Explore the Demo</h5>
                                <p>Try our live demo to see the software in action</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h5>Read Documentation</h5>
                                <p>Review our comprehensive guides and API documentation</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h5>Contact Us</h5>
                                <p>Reach out for implementation support and custom solutions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    window.IronCode.openModal('software-modal');
}

function initModalHandlers() {
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('software-modal');
            if (modal.style.display === 'flex') {
                window.IronCode.closeModal('software-modal');
            }
        }
    });
}

// Load more functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            loadMoreSoftware();
        });
    }
});

function loadMoreSoftware() {
    // In a real application, this would load more data from the API
    const loadMoreBtn = document.getElementById('load-more');
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate loading more content
        loadMoreBtn.textContent = 'Load More Projects';
        loadMoreBtn.disabled = false;
        
        // Hide button if no more content
        if (currentPage >= 3) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1000);
}

// Additional styling for software page
const softwareStyles = `
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

.software-overview {
    padding: var(--space-20) 0;
    background: var(--white);
}

.overview-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: center;
}

@media (min-width: 768px) {
    .overview-grid {
        grid-template-columns: auto 1fr;
    }
}

.overview-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
}

@media (min-width: 768px) {
    .overview-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}

.stat-card {
    background: var(--gray-50);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    display: flex;
    align-items: center;
    gap: var(--space-4);
    transition: transform var(--transition);
}

.stat-card:hover {
    transform: translateY(-2px);
}

.stat-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: var(--text-lg);
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-number {
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--gray-900);
    line-height: 1;
}

.stat-label {
    font-size: var(--text-sm);
    color: var(--gray-600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.tech-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-6);
}

.tech-badge {
    background: var(--primary-color);
    color: var(--white);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius);
    font-size: var(--text-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.software-portfolio {
    background: var(--gray-50);
    padding: var(--space-20) 0;
}

.portfolio-header {
    margin-bottom: var(--space-12);
}

.portfolio-controls {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    align-items: center;
}

@media (min-width: 768px) {
    .portfolio-controls {
        flex-direction: row;
        justify-content: space-between;
    }
}

.search-box {
    position: relative;
    flex: 1;
    max-width: 400px;
}

.search-box i {
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
}

.search-box input {
    width: 100%;
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

.filter-controls {
    display: flex;
    gap: var(--space-3);
}

.filter-controls select {
    padding: var(--space-3) var(--space-4);
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    background: var(--white);
    font-size: var(--text-sm);
    cursor: pointer;
}

.software-card-detailed {
    background: var(--white);
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: all var(--transition);
    opacity: 0;
    transform: translateY(30px);
}

.software-card-detailed.fade-in-up {
    opacity: 1;
    transform: translateY(0);
}

.software-card-detailed:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--space-6) var(--space-6) 0;
}

.card-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: var(--text-xl);
}

.tech-stack-detailed {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: var(--space-4) 0;
}

.impact-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: var(--space-3);
    margin: var(--space-6) 0;
    padding: var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-md);
}

.impact-metric {
    text-align: center;
}

.metric-value {
    display: block;
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--primary-color);
}

.metric-label {
    font-size: var(--text-xs);
    color: var(--gray-600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-6);
    border-top: 1px solid var(--gray-100);
}

.action-links {
    display: flex;
    gap: var(--space-3);
}

.action-links a {
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

.action-links a:hover {
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

.modal-large .modal-content {
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-software-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
}

.software-overview {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
}

@media (min-width: 768px) {
    .software-overview {
        grid-template-columns: 300px 1fr;
    }
}

.software-image .image-placeholder {
    height: 200px;
}

.software-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-6);
}

.software-details {
    display: grid;
    gap: var(--space-8);
}

.details-section h4 {
    margin-bottom: var(--space-4);
    color: var(--gray-900);
}

.features-list {
    list-style: none;
    display: grid;
    gap: var(--space-3);
}

.features-list li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--gray-700);
}

.features-list i {
    color: var(--success);
    font-size: var(--text-sm);
}

.impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-4);
}

.impact-card {
    text-align: center;
    padding: var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-md);
}

.impact-number {
    display: block;
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: var(--space-1);
}

.impact-label {
    font-size: var(--text-sm);
    color: var(--gray-600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.getting-started {
    display: grid;
    gap: var(--space-4);
}

.step {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
}

.step-number {
    width: 32px;
    height: 32px;
    background: var(--primary-color);
    color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: var(--text-sm);
    flex-shrink: 0;
}

.step-content h5 {
    margin-bottom: var(--space-1);
    color: var(--gray-900);
}

.step-content p {
    color: var(--gray-600);
    font-size: var(--text-sm);
}

.load-more-container {
    text-align: center;
    margin-top: var(--space-12);
}

/* Tech Stack Section Styles */
.tech-stack {
    background: var(--white);
    padding: var(--space-20) 0;
}

.tech-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-8);
}

.tech-category {
    background: var(--gray-50);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    text-align: center;
}

.tech-category h3 {
    margin-bottom: var(--space-6);
    color: var(--gray-900);
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
}

.tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--white);
    border-radius: var(--radius-md);
    transition: transform var(--transition);
    cursor: pointer;
}

.tech-item:hover {
    transform: translateY(-2px);
}

.tech-item i {
    font-size: var(--text-2xl);
    color: var(--primary-color);
}

.tech-item span {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--gray-700);
}

/* Open Source Section */
.open-source {
    background: var(--gray-50);
    padding: var(--space-20) 0;
}

.open-source-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: start;
}

@media (min-width: 768px) {
    .open-source-grid {
        grid-template-columns: 1fr 1fr;
    }
}

.github-stats {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin: var(--space-6) 0;
}

.github-stat {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    background: var(--white);
    border-radius: var(--radius-md);
}

.github-stat i {
    font-size: var(--text-xl);
    color: var(--primary-color);
}

.contribution-steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

/* API Documentation */
.api-docs {
    background: var(--white);
    padding: var(--space-20) 0;
}

.api-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
}

.api-card {
    background: var(--gray-50);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    border-left: 4px solid var(--primary-color);
}

.api-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
}

.api-version {
    background: var(--primary-color);
    color: var(--white);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius);
    font-size: var(--text-xs);
    font-weight: 500;
}

.api-endpoints {
    margin: var(--space-4) 0;
}

.api-endpoints code {
    display: block;
    background: var(--gray-800);
    color: var(--white);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    margin-bottom: var(--space-2);
}

/* Support Section */
.support {
    background: var(--gray-50);
    padding: var(--space-20) 0;
}

.support-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
}

.support-plan {
    background: var(--white);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    text-align: center;
    position: relative;
    border: 2px solid var(--gray-200);
    transition: all var(--transition);
}

.support-plan:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
}

.support-plan.featured {
    border-color: var(--primary-color);
    transform: scale(1.05);
}

.plan-badge {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent-color);
    color: var(--white);
    padding: var(--space-1) var(--space-4);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
}

.plan-header {
    margin-bottom: var(--space-6);
}

.plan-header h3 {
    margin-bottom: var(--space-2);
}

.plan-price {
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--primary-color);
}

.plan-features {
    list-style: none;
    text-align: left;
    margin-bottom: var(--space-8);
}

.plan-features li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
    color: var(--gray-700);
}

.plan-features i {
    color: var(--success);
    font-size: var(--text-sm);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = softwareStyles;
document.head.appendChild(styleSheet);
