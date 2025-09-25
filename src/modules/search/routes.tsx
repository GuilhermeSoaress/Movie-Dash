import type { RouteObject } from 'react-router-dom';
// import SearchPage from './Pages/SearchPage';

export const searchRoutes: RouteObject[] = [
  {
    path: '/search',
    // element: <SearchPage />,
    element: <div>Search Page - Em desenvolvimento</div>,
    handle: {
      title: 'Buscar Filmes - MovieDash',
      description: 'Encontre seus filmes favoritos'
    }
  }
];

export default searchRoutes;