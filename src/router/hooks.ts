import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getRoutePath } from './config';

/**
 * Hook customizado para navegação
 * Similar ao useRouter() do Vue.js
 */
export const useAppRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const push = (name: string, routeParams?: Record<string, string>) => {
    const path = getRoutePath(name, routeParams);
    navigate(path);
  };

  const replace = (name: string, routeParams?: Record<string, string>) => {
    const path = getRoutePath(name, routeParams);
    navigate(path, { replace: true });
  };

  const back = () => {
    navigate(-1);
  };

  const forward = () => {
    navigate(1);
  };

  return {
    // Navegação
    push,
    replace,
    back,
    forward,
    
    // Estado atual
    currentPath: location.pathname,
    search: location.search,
    params,
    
    // Utilitários
    isCurrentRoute: (name: string) => {
      const routePath = getRoutePath(name);
      return location.pathname === routePath;
    }
  };
};

// Exemplos de uso:
// const router = useAppRouter();
// router.push('movieDetails', { id: '123' });
// router.back();
// const isHome = router.isCurrentRoute('home');