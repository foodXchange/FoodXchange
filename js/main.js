// ===== FOODXCHANGE MAIN JAVASCRIPT =====

// ROI Calculator functionality (for buyers page)
function calculateROI() {
    const projectsPerYear = parseInt(document.getElementById('projectsPerYear')?.value) || 12;
    const avgProjectValue = parseInt(document.getElementById('avgProjectValue')?.value) || 50000;
    const errorRate = parseInt(document.getElementById('errorRate')?.value) || 15;
    const timePerProject = parseInt(document.getElementById('timePerProject')?.value) || 20;
    
    // Calculations
    const currentErrorCost = (projectsPerYear * avgProjectValue * errorRate / 100);
    const newErrorCost = (projectsPerYear * avgProjectValue * 1 / 100); // 1% error rate with FoodXchange
    const costSavings = currentErrorCost - newErrorCost;
    
    const currentTimeTotal = projectsPerYear * timePerProject;
    const newTimeTotal = projectsPerYear * (timePerProject * 0.5); // 50% time reduction
    const timeSavings = currentTimeTotal - newTimeTotal;
    
    const annualCost = 799 * 12; // Professional plan
    const roi = ((costSavings - annualCost) / annualCost * 100);
    
    // Update display with existence checks
    const costSavingsEl = document.getElementById('costSavings');
    const timeSavingsEl = document.getElementById('timeSavings');
    const roiPercentageEl = document.getElementById('roiPercentage');
    
    if (costSavingsEl) costSavingsEl.textContent = '$' + costSavings.toLocaleString();
    if (timeSavingsEl) timeSavingsEl.textContent = timeSavings.toLocaleString();
    if (roiPercentageEl) roiPercentageEl.textContent = Math.round(roi).toLocaleString() + '%';
}

// Revenue Calculator functionality (for sellers page)
function calculateRevenue() {
    const currentClients = parseInt(document.getElementById('currentClients')?.value) || 5;
    const avgDealSize = parseInt(document.getElementById('avgDealSize')?.value) || 25000;
    const dealsPerClient = parseInt(document.getElementById('dealsPerClient')?.value) || 4;
    const targetGrowth = parseInt(document.getElementById('targetGrowth')?.value) || 200;
    
    // Calculations
    const currentRevenue = currentClients * avgDealSize * dealsPerClient;
    const projectedRevenue = currentRevenue * (1 + targetGrowth / 100);
    const additionalRevenue = projectedRevenue - currentRevenue;
    
    // Update display with existence checks
    const currentRevenueEl = document.getElementById('currentRevenue');
    const projectedRevenueEl = document.getElementById('projectedRevenue');
    const additionalRevenueEl = document.getElementById('additionalRevenue');
    
    if (currentRevenueEl) currentRevenueEl.textContent = '$' + currentRevenue.toLocaleString();
    if (projectedRevenueEl) projectedRevenueEl.textContent = '$' + projectedRevenue.toLocaleString();
    if (additionalRevenueEl) additionalRevenueEl.textContent = '$' + additionalRevenue.toLocaleString();
}

// Navbar scroll effect
function initializeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize animations on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .pain-point-card, .benefit-item');
    animateElements.forEach(el => observer.observe(el));
}

// Form validation and interaction
function initializeFormHandlers() {
    // Contact form handling
    const contactForms = document.querySelectorAll('form[action*="contact"]');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    });
    
    // Demo booking handlers
    const demoButtons = document.querySelectorAll('a[href="#demo"]');
    demoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add demo booking logic here
            console.log('Demo booking requested');
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize shared functionality
    initializeNavbar();
    initializeScrollToTop();
    initializeAnimations();
    initializeFormHandlers();
    
    // ROI Calculator (for buyers page)
    const roiInputs = ['projectsPerYear', 'avgProjectValue', 'errorRate', 'timePerProject'];
    let hasROICalculator = false;
    
    roiInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            hasROICalculator = true;
            element.addEventListener('input', calculateROI);
        }
    });
    
    if (hasROICalculator) {
        calculateROI(); // Initial calculation
    }
    
    // Revenue Calculator (for sellers page)
    const revenueInputs = ['currentClients', 'avgDealSize', 'dealsPerClient', 'targetGrowth'];
    let hasRevenueCalculator = false;
    
    revenueInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            hasRevenueCalculator = true;
            element.addEventListener('input', calculateRevenue);
        }
    });
    
    if (hasRevenueCalculator) {
        calculateRevenue(); // Initial calculation
    }
    
    // Console log for debugging
    console.log('FoodXchange initialized:', {
        hasROICalculator,
        hasRevenueCalculator,
        page: hasROICalculator ? 'buyers' : hasRevenueCalculator ? 'sellers' : 'other'
    });
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateROI,
        calculateRevenue,
        formatCurrency,
        formatNumber
    };
}