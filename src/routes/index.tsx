import { BrowserRouter, Routes as Routers, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import EmailVerification from '../pages/EmailVerification';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Projects from '../pages/Projects';
import Kanban from '../pages/Kanban';
import AcceptInvite from '../pages/AcceptInvite';

import { PrivateRoute } from './private-route';
import { GuestRoute } from './auth-route';

function Routes() {
  return (
    <BrowserRouter>
      <Routers>
        <Route
          path="/"
          element={(
            <GuestRoute>
              <Home />
            </GuestRoute>
          )}
        />
        <Route
          path="/register"
          element={(
            <GuestRoute>
              <Register />
            </GuestRoute>
          )}
        />
        <Route
          path="/login"
          element={(
            <GuestRoute>
              <Login />
            </GuestRoute>
          )}
        />
        <Route
          path="/confirm-account"
          element={(
            <GuestRoute>
              <EmailVerification />
            </GuestRoute>
          )}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />
        <Route
          path="/projects"
          element={(
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          )}
        />
        <Route
          path="/project/:projectId"
          element={(
            <PrivateRoute>
              <Kanban />
            </PrivateRoute>
          )}
        />
        <Route
          path="/accept-invite"
          element={(
            <PrivateRoute>
              <AcceptInvite />
            </PrivateRoute>
          )}
        />
      </Routers>
    </BrowserRouter>
  );
}

export default Routes;
