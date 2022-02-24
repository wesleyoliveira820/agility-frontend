import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

interface GuestRouteProps {
  children: JSX.Element;
}

function GuestRoute({ children }: GuestRouteProps) {
  const { isLogged } = useAuth();

  return !isLogged() ? children : <Navigate to="/projects" />;
}

export { GuestRoute };
