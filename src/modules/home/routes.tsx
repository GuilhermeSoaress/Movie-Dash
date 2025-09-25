import type { RouteObject } from 'react-router-dom';
import HomePage from './Pages/HomePage';

/**
 * Rotas do módulo Home
 * Gerencia todas as rotas relacionadas à página inicial
 */
export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
    // Dados da rota para SEO e navegação
    handle: {
      title: 'Início - MovieDash',
      description: 'Descubra os filmes mais populares e bem avaliados'
    }
  }
];

export default homeRoutes;