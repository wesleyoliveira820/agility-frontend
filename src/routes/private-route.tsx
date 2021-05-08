import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../utils/auth-methods';

interface IRouteProps {
  component: FC;
  path: string;
  exact?: boolean;
}

function PrivateRoute({ ...props }: IRouteProps) {
  return isLogged()
    ? (<Route {...props} />)
    : (<Redirect to="/login" />);
}

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
