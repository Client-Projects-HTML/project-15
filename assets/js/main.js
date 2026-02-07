// Stackly Template Main Logic

document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.classList.toggle('dark', savedTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }

    // Set initial dir
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Powered By Link Click Behavior
    const poweredByLink = document.querySelector('.powered-by-link');
    if (poweredByLink) {
        poweredByLink.addEventListener('click', (e) => {
            poweredByLink.classList.add('powered-by-clicked');
        });
    }

    // Remove highlight when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (poweredByLink && !poweredByLink.contains(e.target)) {
            poweredByLink.classList.remove('powered-by-clicked');
        }
    });
});

// Service Calculator Logic
function calculateService() {
    const serviceType = document.getElementById('service-type')?.value || 0;
    const hours = document.getElementById('hours')?.value || 0;
    const total = serviceType * hours;
    const resultElement = document.getElementById('calc-result');
    if (resultElement) {
        resultElement.innerText = `$${total.toFixed(2)}`;
    }
}
