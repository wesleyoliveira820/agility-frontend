import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogged } = useAuth();

  return isLogged() ? children : <Navigate to="/login" />;
}

export { PrivateRoute };
