import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import EmailVerification from '../pages/EmailVerification';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Projects from '../pages/Projects';

import PrivateRoute from './private-route';
import AuthRoute from './auth-route';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute path="/register" component={Register} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/confirm-account" component={EmailVerification} />
        <AuthRoute path="/forgot-password" component={ForgotPassword} />
        <AuthRoute path="/reset-password" component={ResetPassword} />
        <PrivateRoute path="/projects" component={Projects} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
