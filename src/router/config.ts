/**
 * Configuração centralizada das rotas da aplicação
 * Similar ao router/index.js do Vue.js
 */

export interface RouteConfig {
  path: string;
  name: string;
  component?: string;
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    description?: string;
  };
}

/**
 * Definição das rotas da aplicação
 * Facilita manutenção e navegação programática
 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: 'HomePage',
    meta: {
      title: 'Início - MovieDash',
      description: 'Descubra os filmes mais populares e bem avaliados'
    }
  },
  {
    path: '/movie/:id',
    name: 'movieDetails',
    component: 'MovieDetailsPage',
    meta: {
      title: 'Detalhes do Filme - MovieDash',
      description: 'Informações detalhadas, elenco e trailers'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: 'SearchPage',
    meta: {
      title: 'Buscar Filmes - MovieDash',
      description: 'Encontre seus filmes favoritos'
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: 'FavoritesPage',
    meta: {
      title: 'Meus Favoritos - MovieDash',
      description: 'Seus filmes salvos para assistir depois'
    }
  }
];

/**
 * Helper para navegação programática
 * Similar ao $router.push() do Vue
 */
export const getRoutePath = (name: string, params?: Record<string, string>): string => {
  const route = routes.find(r => r.name === name);
  if (!route) {
    console.warn(`Route '${name}' not found`);
    return '/';
  }
  
  let path = route.path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }
  
  return path;
};

// Exemplos de uso:
// getRoutePath('home') → '/'
// getRoutePath('movieDetails', { id: '123' }) → '/movie/123'