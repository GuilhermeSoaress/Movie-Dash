import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getRoutePath } from './config';

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
    push,
    replace,
    back,
    forward,
    
    currentPath: location.pathname,
    search: location.search,
    params,
    
    isCurrentRoute: (name: string) => {
      const routePath = getRoutePath(name);
      return location.pathname === routePath;
    }
  };
};
