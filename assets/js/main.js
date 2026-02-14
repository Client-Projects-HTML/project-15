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
        } else if (e.target.closest('#view-all-notifications')) {
            e.preventDefault();
            notifyDropdown?.classList.add('hidden');
            showNotificationsModal();
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

    // Global Notifications Modal
    const showNotificationsModal = () => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all">
                <div class="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 class="text-base font-black dark:text-white uppercase tracking-wider">All Notifications</h3>
                    <button onclick="this.closest('.fixed').remove()" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                        <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div class="max-h-[60vh] overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    ${[
                { title: 'New order received!', time: '2 mins ago', icon: 'shopping-cart', color: 'blue', desc: 'Order #ORD-9924 has been placed by Leslie Alexander.' },
                { title: 'New user registered', time: '45 mins ago', icon: 'user-plus', color: 'emerald', desc: 'A new client, Marvin McKinney, has joined the platform.' },
                { title: 'Server update completed', time: '3 hours ago', icon: 'server', color: 'amber', desc: 'System maintenance was completed successfully. All services are online.' },
                { title: 'Invoice Paid', time: '5 hours ago', icon: 'check-circle', color: 'purple', desc: 'Invoice #INV-2024-001 has been marked as paid.' },
                { title: 'New Support Ticket', time: 'Yesterday', icon: 'life-buoy', color: 'rose', desc: 'Cameron Williamson opened a new ticket regarding IT Consulting.' }
            ].map(n => `
                        <div class="p-4 rounded-2xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer group">
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-${n.color}-100 dark:bg-${n.color}-900/30 flex items-center justify-center shrink-0 shadow-sm">
                                    <i data-lucide="${n.icon}" class="w-6 h-6 text-${n.color}-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex justify-between items-start mb-1">
                                        <h4 class="font-bold text-sm dark:text-white group-hover:text-primary transition">${n.title}</h4>
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${n.time}</span>
                                    </div>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${n.desc}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="p-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                    <button onclick="this.closest('.fixed').remove()" class="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-[0.2em]">Close Notifications</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        if (window.lucide) window.lucide.createIcons();
    };

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
