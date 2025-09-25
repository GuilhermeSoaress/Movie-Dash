import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: '🏠' },
    { path: '/search', label: 'Buscar', icon: '🔍' },
    { path: '/favorites', label: 'Favoritos', icon: '❤️' }
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <header className="bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-3xl font-bold text-red-500 hover:text-red-400 transition-colors">
              🎬 MovieDash
            </Link>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-slate-700 text-gray-300'
                    }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-slate-700 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
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
                    : 'hover:bg-slate-700 text-gray-300'
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

      <footer className="bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p>&copy; 2025 MovieDash. Dados fornecidos por TMDB.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;