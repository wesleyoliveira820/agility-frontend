import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

interface IRouteProps {
  component: FC;
  path: string;
  exact?: boolean;
}

function PrivateRoute({ ...props }: IRouteProps) {
  const { isLogged } = useAuth();

  return isLogged()
    ? (<Route {...props} />)
    : (<Redirect to="/login" />);
}

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
