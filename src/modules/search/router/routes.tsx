import type { RouteObject } from 'react-router-dom';
import { SearchPage } from '../Pages/SearchPage';

export const searchRoutes: RouteObject[] = [
  {
    path: '/search',
    element: <SearchPage />,
    handle: {
      title: 'Buscar Filmes - Movie Dashboard',
      description: 'Encontre seus filmes favoritos no Movie Dashboard'
    }
  }
];

export default searchRoutes;