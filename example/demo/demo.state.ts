export let activeTab = 'signals';
export let isSidebarOpen = window.innerWidth > 1024;

const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') as 'dark' | 'light' : null;
export let theme: 'dark' | 'light' = storedTheme || 'dark';

export function setActiveTab(tab: string) {
  activeTab = tab;
  if (window.innerWidth <= 1024) isSidebarOpen = false; // Close only on mobile
}

export function toggleSidebar() {
  isSidebarOpen = !isSidebarOpen;
}

export function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
