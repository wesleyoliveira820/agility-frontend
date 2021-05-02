import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EmailProvider from '../contexts/email-context';

import Home from '../pages/Home';
import Register from '../pages/Register';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <EmailProvider>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
        </EmailProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
