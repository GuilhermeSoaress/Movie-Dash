import type { RouteObject } from 'react-router-dom';
import MovieDetailsPage from '../Pages/MovieDetailsPage';

export const movieDetailsRoutes: RouteObject[] = [
  {
    path: '/movie/:id',
    element: <MovieDetailsPage />,
    handle: {
      title: 'Detalhes do Filme - MovieDash',
      description: 'Informações detalhadas, elenco e trailers'
    }
  }
];

export default movieDetailsRoutes;