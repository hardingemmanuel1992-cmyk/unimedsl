/**
 * UNIMED Navigation & UI Controller
 * Complete modern navigation system with carousel, forms, and responsive design
 */

// ========== CAROUSEL FUNCTIONALITY ==========
let currentSlideIndex = 0;
let autoSlideInterval;

const showSlide = (index) => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
};

const moveSlide = (direction) => {
    showSlide(currentSlideIndex + direction);
    resetAutoSlide();
};

const currentSlide = (index) => {
    showSlide(index);
    resetAutoSlide();
};

const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => moveSlide(1), 5000);
};

// ========== MOBILE NAVIGATION CONTROLLER ==========
class MobileNavController {
    constructor() {
        this.navLinks = document.getElementById('navLinks');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.dropdowns = this.navLinks?.querySelectorAll('.dropdown') || [];
        this.isMenuOpen = false;
        
        if (this.navLinks && this.mobileMenu) {
            this.init();
        }
    }

    init() {
        this.attachMenuToggleListener();
        this.attachDropdownListeners();
        this.attachNavItemListeners();
        this.attachKeyboardListeners();
        this.attachWindowListeners();
        this.attachClickOutsideListener();
    }

    attachMenuToggleListener() {
        this.mobileMenu?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
    }

    toggleMenu() {
        this.isMenuOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.navLinks.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isMenuOpen = true;
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        this.closeAllDropdowns();
        this.isMenuOpen = false;
    }

    attachDropdownListeners() {
        this.dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            const content = dropdown.querySelector('.dropdown-content');
            
            if (!dropbtn || !content) return;

            dropbtn.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleDropdown(dropdown);
                }
            });
        });
    }

    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        this.closeAllDropdowns();
        
        if (!isActive) {
            dropdown.classList.add('active');
        }
    }

    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    attachNavItemListeners() {
        const navItems = this.navLinks.querySelectorAll('li:not(.dropdown) > a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        this.dropdowns.forEach(dropdown => {
            const links = dropdown.querySelectorAll('.dropdown-content a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        this.closeMenu();
                    }
                });
            });
        });
    }

    attachClickOutsideListener() {
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && this.isMenuOpen) {
                if (!e.target.closest('nav')) {
                    this.closeMenu();
                }
            }
        });
    }

    attachKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    attachWindowListeners() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        window.addEventListener('orientationchange', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
}

// ========== DONATION FUNCTIONALITY ==========
let selectedDonationAmount = 0;

const selectAmount = (amount) => {
    selectedDonationAmount = amount;
    document.getElementById('customAmount').value = '';
    
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
};

const selectCustomAmount = () => {
    const customAmount = parseFloat(document.getElementById('customAmount').value);
    if (customAmount > 0) {
        selectedDonationAmount = customAmount;
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
};

const processDonation = () => {
    if (selectedDonationAmount <= 0) {
        alert('Please select or enter a donation amount.');
        return;
    }

    const donateBtn = document.getElementById('donateButton');
    donateBtn.disabled = true;
    donateBtn.textContent = 'Processing...';

    setTimeout(() => {
        alert(`Thank you for your generous donation of $${selectedDonationAmount.toFixed(2)}! Your support helps us restore broken lives and provide critical mental health services.\n\nA confirmation email will be sent to you shortly.`);
        
        selectedDonationAmount = 0;
        document.getElementById('customAmount').value = '';
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        donateBtn.disabled = false;
        donateBtn.textContent = 'Donate Now';
    }, 2000);
};

// ========== FORM HANDLING ==========
const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for reaching out! We will contact you soon.');
    event.target.reset();
};

// ========== SMOOTH SCROLLING ==========
const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ========== HEADER SCROLL EFFECT ==========
const setupHeaderScrollEffect = () => {
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'linear-gradient(135deg, #5568d3 0%, #6a3f94 100%)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
        lastScrollY = window.scrollY;
    }, { passive: true });
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    new MobileNavController();
    
    // Start carousel auto-slide
    autoSlideInterval = setInterval(() => moveSlide(1), 5000);
    
    // Setup smooth scrolling
    setupSmoothScroll();
    
    // Setup header scroll effect
    setupHeaderScrollEffect();
});
