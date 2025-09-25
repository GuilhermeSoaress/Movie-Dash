import type { RouteObject } from 'react-router-dom';
// import FavoritesPage from './Pages/FavoritesPage';

export const favoritesRoutes: RouteObject[] = [
  {
    path: '/favorites',
    // element: <FavoritesPage />,
    element: <div>Favorites Page - Em desenvolvimento</div>,
    handle: {
      title: 'Meus Favoritos - MovieDash',
      description: 'Seus filmes salvos para assistir depois'
    }
  }
];

export default favoritesRoutes;