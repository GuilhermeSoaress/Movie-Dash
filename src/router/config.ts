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
