export const APP_ROUTES = {
    // === Public Routes ===
    landing: {
        path: '/',
        name: 'Landing',
        public: true,
        meta: { title: 'GrowthPad | Strategy on Easy Mode', description: 'AI-powered strategic planning.' }
    },
    login: { path: '/login', name: 'Login', public: true },
    signup: { path: '/signup', name: 'Sign Up', public: true },
    // === Platform Routes (Protected) ===
    home: { path: '/platform/home', name: 'Home' },
    dashboard: { path: '/platform/workboard', name: 'Workboard' },
    planner: { path: '/platform/planner', name: 'Strategy Map' },
    playbooks: { path: '/platform/playbooks', name: 'Playbooks' },
    analytics: { path: '/platform/analytics', name: 'Analytics' },
    settings: { path: '/platform/settings', name: 'Settings' },
};
