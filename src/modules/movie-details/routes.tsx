import type { RouteObject } from 'react-router-dom';
// import MovieDetailsPage from './Pages/MovieDetailsPage';

/**
 * Rotas do módulo Movie Details
 * Gerencia todas as rotas relacionadas aos detalhes dos filmes
 */
export const movieDetailsRoutes: RouteObject[] = [
  {
    path: '/movie/:id',
    // element: <MovieDetailsPage />,
    element: <div>Movie Details Page - Em desenvolvimento</div>,
    handle: {
      title: 'Detalhes do Filme - MovieDash',
      description: 'Informações detalhadas, elenco e trailers'
    }
  }
];

export default movieDetailsRoutes;