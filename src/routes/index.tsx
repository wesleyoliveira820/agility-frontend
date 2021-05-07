import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EmailProvider from '../contexts/email-context';

import Home from '../pages/Home';
import Register from '../pages/Register';
import EmailVerification from '../pages/EmailVerification';
import Login from '../pages/Login';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <EmailProvider>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/confirm-account" component={EmailVerification} />
          <Route path="/login" component={Login} />
        </EmailProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
