import type { RouteObject } from 'react-router-dom';
// import SearchPage from './Pages/SearchPage';

/**
 * Rotas do módulo Search
 * Gerencia todas as rotas relacionadas à busca de filmes
 */
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