import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import { homeRoutes } from '../modules/home/routes';
import { movieDetailsRoutes } from '../modules/movie-details/routes';
import { searchRoutes } from '../modules/search/routes';
import { favoritesRoutes } from '../modules/favorites/routes';

/**
 * Router principal da aplicação
 * Combina todas as rotas dos módulos em uma única configuração
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Rotas do módulo Home
      ...homeRoutes,
      
      // Rotas do módulo Movie Details
      ...movieDetailsRoutes,
      
      // Rotas do módulo Search
      ...searchRoutes,
      
      // Rotas do módulo Favorites
      ...favoritesRoutes,
      
      // Rota 404 - deve ficar por último
      {
        path: '*',
        element: (
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-red-400 mb-4">404</h1>
            <p className="text-gray-300">Página não encontrada</p>
            <a href="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
              Voltar ao início
            </a>
          </div>
        ),
        handle: {
          title: '404 - Página não encontrada',
          description: 'A página que você procura não existe'
        }
      }
    ]
  }
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;