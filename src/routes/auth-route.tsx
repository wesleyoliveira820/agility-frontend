import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../utils/auth-methods';

interface IRouteProps {
  component: FC;
  path: string;
  exact?: boolean;
}

function AuthRoute({ ...props }: IRouteProps) {
  return !isLogged()
    ? (<Route {...props} />)
    : (<Redirect to="/projects" />);
}

AuthRoute.defaultProps = {
  exact: false,
};

export default AuthRoute;
