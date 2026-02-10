/**
 * UNIMED Mobile Navigation Controller
 * Modern, modular navigation system for mobile responsiveness
 * Responsive design with smooth animations and accessibility features
 */

class MobileNavController {
    constructor() {
        this.navLinks = document.getElementById('navLinks');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.dropdowns = this.navLinks?.querySelectorAll('.dropdown') || [];
        this.isMenuOpen = false;
        this.activeDropdown = null;
        
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
    }

    /**
     * Toggle mobile menu open/close
     */
    toggleMenu() {
        this.isMenuOpen ? this.closeMenu() : this.openMenu();
    }

    /**
     * Open mobile menu with smooth animation
     */
    openMenu() {
        this.navLinks.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        this.isMenuOpen = true;
    }

    /**
     * Close mobile menu and all dropdowns
     */
    closeMenu() {
        this.navLinks.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        this.closeAllDropdowns();
        this.isMenuOpen = false;
    }

    /**
     * Attach click listener to hamburger menu button
     */
    attachMenuToggleListener() {
        this.mobileMenu?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
    }

    /**
     * Attach click listeners to dropdown toggle buttons
     */
    attachDropdownListeners() {
        this.dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            const content = dropdown.querySelector('.dropdown-content');
            
            if (!dropbtn || !content) return;

            // Toggle dropdown on button click (mobile only)
            dropbtn.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleDropdown(dropdown);
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
                // Don't close if clicking the menu button
                if (!e.target.closest('.mobile-menu')) {
                    this.closeAllDropdowns();
                }
            }
        });
    }

    /**
     * Attach listeners to regular navigation items
     */
    attachNavItemListeners() {
        const navItems = this.navLinks.querySelectorAll('li:not(.dropdown) > a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Close menu when clicking a regular link on mobile
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        // Close menu when clicking dropdown links
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

    /**
     * Toggle dropdown visibility
     */
    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // Close all dropdowns first
        this.closeAllDropdowns();
        
        // Open the clicked dropdown if it wasn't already open
        if (!isActive) {
            dropdown.classList.add('active');
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.classList.add('show');
            }
            this.activeDropdown = dropdown;
        }
    }

    /**
     * Close all dropdowns with smooth animation
     */
    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.classList.remove('show');
            }
        });
        this.activeDropdown = null;
    }

    /**
     * Keyboard accessibility
     */
    attachKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            // Close menu on ESC key
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    /**
     * Handle window resize - close menu on desktop breakpoint
     */
    attachWindowListeners() {
        window.addEventListener('resize', () => {
            // Close menu if resizing to desktop
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Handle orientation changes on mobile
        window.addEventListener('orientationchange', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
}

/**
 * Initialize navigation controller when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    new MobileNavController();
});
