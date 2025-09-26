import type { RouteObject } from 'react-router-dom';
import { FavoritesPage } from '../Pages/FavoritesPage';

export const favoritesRoutes: RouteObject[] = [
  {
    path: '/favorites',
    element: <FavoritesPage />,
    handle: {
      title: 'Meus Favoritos - Movie Dashboard',
      description: 'Seus filmes favoritos salvos para assistir depois'
    }
  }
];

export default favoritesRoutes;