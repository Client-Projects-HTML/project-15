// Stackly Template Main Logic

// 1. Immediate Theme & Dir Initialization
const initThemeAndDir = () => {
    const htmlElement = document.documentElement;

    // Theme Initial State
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    // RTL Initial State
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);
};

// Execute initialization
initThemeAndDir();

const setupGlobalListeners = () => {
    const htmlElement = document.documentElement;

    document.addEventListener('click', (e) => {
        // Theme Toggle Logic
        const themeBtn = e.target.closest('#theme-toggle');
        if (themeBtn) {
            e.preventDefault();
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (window.lucide) window.lucide.createIcons();
        }

        // RTL Toggle Logic
        const rtlBtn = e.target.closest('#rtl-toggle');
        if (rtlBtn) {
            e.preventDefault();
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        }

        // Sidebar Toggle Logic
        const sideBtn = e.target.closest('[onclick*="toggleSidebar"]');
        if (sideBtn && !sideBtn.hasAttribute('onclick')) {
            // Placeholder for if we move away from inline onclick
        }

        // Mobile Menu Logic
        const mobileBtn = e.target.closest('#mobile-menu-btn');
        if (mobileBtn) {
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.toggle('hidden');
        }

        // Navbar Dropdowns Logic (Delegated)
        const notifyBtn = e.target.closest('#notification-btn');
        const profBtn = e.target.closest('#profile-btn');
        const notifyDropdown = document.getElementById('notification-dropdown');
        const profDropdown = document.getElementById('profile-dropdown');

        if (notifyBtn) {
            e.stopPropagation();
            notifyDropdown?.classList.toggle('hidden');
            profDropdown?.classList.add('hidden');
        } else if (profBtn) {
            e.stopPropagation();
            profDropdown?.classList.toggle('hidden');
            notifyDropdown?.classList.add('hidden');
        } else {
            // Close dropdowns when clicking outside
            if (notifyDropdown && !notifyDropdown.contains(e.target)) {
                notifyDropdown.classList.add('hidden');
            }
            if (profDropdown && !profDropdown.contains(e.target)) {
                profDropdown.classList.add('hidden');
            }
        }
    });

    // Global toggleSidebar function
    window.toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (!sidebar) return;

        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const isHidden = isRTL
            ? (sidebar.classList.contains('translate-x-full') || sidebar.classList.contains('rtl:translate-x-full'))
            : (sidebar.classList.contains('-translate-x-full') || sidebar.classList.contains('ltr:-translate-x-full'));

        if (isHidden) {
            // Show sidebar
            sidebar.classList.remove('-translate-x-full', 'translate-x-full', 'ltr:-translate-x-full', 'rtl:translate-x-full');
            sidebar.classList.add('translate-x-0');
            if (backdrop) backdrop.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        } else {
            // Hide sidebar
            sidebar.classList.remove('translate-x-0');
            if (isRTL) {
                sidebar.classList.add('rtl:translate-x-full');
            } else {
                sidebar.classList.add('-translate-x-full');
            }
            if (backdrop) backdrop.classList.add('hidden');
            document.body.style.overflow = ''; // Restore body scroll
        }
    };

    // Powered By Logic
    const poweredBy = document.querySelector('.powered-by-link');
    if (poweredBy) {
        poweredBy.addEventListener('click', () => poweredBy.classList.add('powered-by-clicked'));
        document.addEventListener('click', (ev) => {
            if (!poweredBy.contains(ev.target)) poweredBy.classList.remove('powered-by-clicked');
        });
    }
};

// Initialize listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlobalListeners);
} else {
    setupGlobalListeners();
}

// Service Calculator
window.calculateService = () => {
    const serviceType = document.getElementById('service-type')?.value || 0;
    const hours = document.getElementById('hours')?.value || 0;
    const total = serviceType * hours;
    const resultElement = document.getElementById('calc-result');
    if (resultElement) {
        resultElement.innerText = `$${total.toFixed(2)}`;
    }
};
