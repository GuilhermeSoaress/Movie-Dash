import { Outlet, Link, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { ThemeToggle } from './ThemeToggle';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: '🏠' },
    { path: '/search', label: 'Buscar', icon: '🔍' },
    { path: '/favorites', label: 'Favoritos', icon: '❤️' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white min-h-screen transition-colors">
      <ScrollToTop />
      <header className="bg-white dark:bg-slate-800 shadow-lg border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-3xl font-bold text-red-500 hover:text-red-400 transition-colors">
              🎬 Movie Dashboard
            </Link>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <ThemeToggle />

              {/* Mobile menu button */}
              <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="md:hidden pb-4">
            <div className="flex space-x-4 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${location.pathname === item.path
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="min-h-screen">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 Movie Dashboard. Dados fornecidos por TMDB.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;