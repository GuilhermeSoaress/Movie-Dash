import type { RouteObject } from 'react-router-dom';
import HomePage from '../Pages/HomePage';

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
    handle: {
      title: 'Início - MovieDash',
      description: 'Descubra os filmes mais populares e bem avaliados'
    }
  }
];

export default homeRoutes;