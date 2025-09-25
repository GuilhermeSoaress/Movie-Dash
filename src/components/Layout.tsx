import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <header className="p-4 bg-slate-800">
        <h1 className="text-3xl font-bold text-center">
          MovieDash
        </h1>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
      
      <footer className="p-4 bg-slate-800 text-center text-gray-400">
        <p>&copy; 2025 MovieDash. Powered by TMDB.</p>
      </footer>
    </div>
  );
};

export default Layout;